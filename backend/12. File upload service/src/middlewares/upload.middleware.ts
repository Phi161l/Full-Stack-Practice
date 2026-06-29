import multer from "multer";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },

  filename(req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;

    cb(null, uniqueName);
  },
});

const allowedMimeTypes = ["image/jpeg", "image/png", "application/pdf"];

export const upload = multer({
  storage,

  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },

  fileFilter(req, file, cb) {
    const allowed = allowedMimeTypes.includes(file.mimetype);

    if (!allowed) {
      return cb(new Error("Only JPG, PNG and PDF files are allowed"));
    }

    cb(null, true);
  },
});
