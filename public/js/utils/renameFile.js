export function renameFile(originalFile) {
	const nameParts = originalFile.name.split(".");
	const extension = nameParts.pop(); // gets the file extension
	const baseName = nameParts.join(""); // joins the rest of the name

	const newBaseName = baseName
		.toLowerCase()
		.replace(/\s+/g, "-") // replaces spaces with hyphens
		.replace(/[^a-z0-9_\-]+/g, ""); // removes special characters

	const newName = `${newBaseName}.${extension}`;

	return new File([originalFile], newName, {
		type: originalFile.type,
		lastModified: originalFile.lastModified,
	});
}
