export function escapeHtmlTags(input) {
  const regex = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;
  return input.replace(regex, "");
}
