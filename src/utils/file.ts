// Utility for file handling if needed
// Currently empty as mostly handled by Elysia multipart and services
export const getFileExtension = (filename: string): string => {
  return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
};
