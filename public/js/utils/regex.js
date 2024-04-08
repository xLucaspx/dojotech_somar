export function escapeHtmlTags(input) {
  const regex = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;
	input = input.replace(regex, ""); 
  
	return input ? input : null;
}
