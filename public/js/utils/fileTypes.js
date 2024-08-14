const FILE_TYPES = {
	image: [
		"image/avif",
		"image/jpeg",
		"image/png",
		"image/svg+xml",
		"image/webp",
	],
	video: [
		"video/x-msvideo",
		"video/mp4",
		"video/mpeg",
		"video/ogg",
		"video/mp2t",
		"video/webm",
		"video/3gpp",
		"video/3gpp2",
	],
};

const MAX_UPLOAD_SIZE_BYTES = 15 * 1e6; // 15MB

export { FILE_TYPES, MAX_UPLOAD_SIZE_BYTES };
