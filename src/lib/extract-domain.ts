export function extractDomain(url: string) {
  const domainRegex = /^(?:https?:\/\/)?(?:www\.)?([^\/]+)/;
  const match = url.match(domainRegex);
  return match ? match[1] : null;
}
