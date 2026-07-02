/**
 * The essay compiler. Essays are authored as MDX-flavoured Markdown and compiled
 * to an HTML string with a remark/rehype pipeline. Producing a string (rather than
 * a React tree) is deliberate: the same compiled output renders the canonical
 * server page AND the trail panes (fetched as fragments), so the two can never
 * drift apart.
 *
 * Custom inline directives (remark-directive):
 *   :sidenote[The note text]            → a Tufte-style numbered sidenote
 *   :trail[Label]{slug=other-essay}     → a trail link (opens beside, on desktop)
 *   :region[Label]{slug=longevity}      → a link into a region
 *
 * It also extracts the heading outline (h2/h3) used by the "Map" reading depth.
 */
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkDirective from "remark-directive";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import { visit } from "unist-util-visit";
import { toString as mdastToString } from "mdast-util-to-string";

export interface OutlineItem {
  id: string;
  text: string;
  depth: 2 | 3;
}

/* eslint-disable @typescript-eslint/no-explicit-any */

function hastText(node: any): string {
  if (node.type === "text") return node.value ?? "";
  if (Array.isArray(node.children)) return node.children.map(hastText).join("");
  return "";
}

/** Turn our custom directives into concrete HTML, and mark the opening lede. */
function remarkCustomDirectives() {
  return (tree: any) => {
    let sidenoteN = 0;

    // The first top-level paragraph becomes the lede (larger opening line).
    const firstPara = tree.children?.find((c: any) => c.type === "paragraph");
    if (firstPara) {
      firstPara.data = firstPara.data || {};
      firstPara.data.hProperties = {
        ...(firstPara.data.hProperties || {}),
        className: ["lede"],
      };
    }

    visit(tree, (node: any) => {
      if (
        node.type !== "textDirective" &&
        node.type !== "leafDirective" &&
        node.type !== "containerDirective"
      ) {
        return;
      }

      if (node.name === "sidenote") {
        sidenoteN += 1;
        const id = `sn-${sidenoteN}`;
        const text = mdastToString(node);
        node.data = node.data || {};
        node.data.hName = "span";
        node.data.hProperties = { className: ["sidenote-wrap"] };
        node.data.hChildren = [
          {
            type: "element",
            tagName: "label",
            properties: { className: ["sidenote-number"], htmlFor: id },
            children: [],
          },
          {
            type: "element",
            tagName: "input",
            properties: { className: ["sidenote-input"], type: "checkbox", id },
            children: [],
          },
          {
            type: "element",
            tagName: "span",
            properties: { className: ["sidenote"] },
            children: [{ type: "text", value: text }],
          },
        ];
        return;
      }

      if (node.name === "trail") {
        const slug = node.attributes?.slug;
        if (!slug) return;
        node.data = node.data || {};
        node.data.hName = "a";
        node.data.hProperties = {
          className: ["trail-link"],
          href: `/writing/${slug}`,
          dataTrailSlug: slug,
        };
        return;
      }

      if (node.name === "region") {
        const slug = node.attributes?.slug;
        if (!slug) return;
        node.data = node.data || {};
        node.data.hName = "a";
        node.data.hProperties = {
          className: ["trail-link"],
          href: `/regions/${slug}`,
          dataTrailRegion: slug,
        };
      }
    });
  };
}

/** Collect h2/h3 (with the ids rehype-slug assigned) into the Map outline. */
function rehypeCollectOutline(opts: { outline: OutlineItem[] }) {
  return (tree: any) => {
    visit(tree, "element", (node: any) => {
      if (node.tagName === "h2" || node.tagName === "h3") {
        const id = node.properties?.id;
        if (!id) return;
        opts.outline.push({
          id,
          text: hastText(node),
          depth: node.tagName === "h2" ? 2 : 3,
        });
      }
    });
  };
}

export async function compileEssay(markdown: string): Promise<{
  html: string;
  outline: OutlineItem[];
}> {
  const outline: OutlineItem[] = [];

  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkDirective)
    .use(remarkCustomDirectives)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeCollectOutline, { outline })
    .use(rehypeStringify)
    .process(markdown);

  return { html: String(file), outline };
}
