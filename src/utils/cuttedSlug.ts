/**
 * Returns the subject slug without the language suffix.
 * Slug is split by '-', the last segment (lang) is removed, then joined again.
 * e.g. "mathematics-en" -> "mathematics", "algebra-geometry-ro" -> "algebra-geometry"
 * Exception: "french-frbill" is returned as-is (not unified with other french-* subjects).
 */
const UNIFIED_EXCEPTION_SLUG = "french-frbill";

export function getCuttedSlug(slug: string): string {
  if (slug === UNIFIED_EXCEPTION_SLUG) return slug;
  const parts = slug.split("-");
  if (parts.length <= 1) return slug;
  parts.pop();
  return parts.join("-");
}
