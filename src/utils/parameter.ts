/**
 * Adds new parameters to the current URL's search string
 * without modifying existing ones.
 * @param newParams Key-value pairs to add if they don't already exist
 */
export function addSearchParams(newParams: Record<string, string>) {
  const url = new URL(window.location.href);
  const searchParams = url.searchParams;

  // Only add keys that don't already exist
  Object.entries(newParams).forEach(([key, value]) => {
    if (!searchParams.has(key)) {
      searchParams.set(key, value);
    }
  });

  // Push updated URL to the browser without reloading the page
  window.history.pushState({}, '', `${url.pathname}?${searchParams.toString()}`);
}
