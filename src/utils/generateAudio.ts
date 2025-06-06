import { exec } from "child_process";
import { v2 as cloudinary } from "cloudinary";
import path from "path";
import fs from "fs";
import { promisify } from "util";
import { convertToCamelCase } from "./convertToCamelCase";

const execAsync = promisify(exec);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export const generateAudio = async (text: string, type: string = "word") => {
  const fileName = `${type === "word" ? text : convertToCamelCase(text)}.wav`;
  const filePath = path.join(process.cwd(), "public", fileName);

  try {
    await execAsync(`espeak-ng -w "${filePath}" "${text}"`);

    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "video",
      public_id: `audio/${text}`,
      format: "mp3",
    });

    const audioUrl = result.secure_url;

    return audioUrl;
  } catch (error) {
    console.error("Error generating or uploading audio:", error);
  } finally {
    // Clean up the local file if it exists
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
};
