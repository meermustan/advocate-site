import multer, { memoryStorage } from "multer";
import { v4 as uuidv4 } from "uuid";

const DIR = "./public/files/";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuidv4() + "-" + fileName);
  },
});

const fileFilter = (_req, file, cb) => {
  cb(null, true);
};

export default multer({
  storage: storage,
  limits: { fileSize: 4000000 },
  fileFilter: fileFilter,
}).single("caseFile");
