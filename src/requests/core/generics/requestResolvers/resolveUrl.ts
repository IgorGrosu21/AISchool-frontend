import type { ResolveUrlFn, ValidateRouteDefinitionFn } from '../types';

/**
 * Resolves a URL by replacing placeholders in a template with provided keyword arguments.
 * 
 * @param kwargs - Object with key-value pairs for template replacement, or undefined (returns template as-is)
 * @param urlTemplate - The URL template with placeholders in the format `<key>`
 * @returns The resolved URL string with all placeholders replaced
 * @throws {Error} If there are unresolved placeholders in the template
 * 
 */
const resolveUrl: ResolveUrlFn = (urlTemplate, kwargs?) => {
  if (kwargs === undefined) {
    return urlTemplate;
  }
  
  let resolvedUrl = urlTemplate;
  for (const [key, value] of Object.entries(kwargs)) {
    resolvedUrl = resolvedUrl.replace(`<${key}>`, value)
  }

  const unresolvedPlaceholders = resolvedUrl.match(/<[^>]+>/g);
  if (unresolvedPlaceholders && unresolvedPlaceholders.length > 0) {
    throw new Error(`Unresolved URL placeholders: ${unresolvedPlaceholders.join(', ')}`);
  }
  return resolvedUrl;
}

export const validateRouteDefinition: ValidateRouteDefinitionFn = (routes, name) => {
  const routeDef = routes[name];
  if (!routeDef) {
    throw new Error(`Route '${String(name)}' not found in registry`);
  }
  const urlTemplate = routeDef;
  return kwargs => resolveUrl(urlTemplate, kwargs);
}