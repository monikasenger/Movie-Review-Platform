import multer from "multer";

// Multer config
const storage = multer.diskStorage({});
export const upload = multer({ storage });
