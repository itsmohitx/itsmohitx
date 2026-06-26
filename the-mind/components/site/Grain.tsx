/**
 * A subtle, static grain overlay — the "beautifully printed essay" texture.
 * It is static (not animated), so it stays even under prefers-reduced-motion.
 * Opacity is driven by --grain-opacity, which differs per theme.
 */
export function Grain() {
  return <div aria-hidden className="grain" />;
}
