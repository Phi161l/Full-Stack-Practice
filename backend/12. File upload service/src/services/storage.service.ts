import cloudinary from "../config/cloudinary.js";

export interface UploadResult {
  url: string;
  publicId: string;
}

export const uploadToCloudinary = async (filePath: string): Promise<UploadResult> => {
  const result = await cloudinary.uploader.upload(filePath, {
    resource_type: "auto",
  });

  return {
    url: result.secure_url,
    publicId: result.public_id,
  };
};
