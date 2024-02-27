import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

const destinationFolder = './public/images/';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, destinationFolder);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, uuidv4() + '-' + fileName);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only images are allowed.'), false);
    }
  }
});

const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    res.status(400).json({
      resultMessage: {
        en: err.message,
        ur: err.message,
      },
      resultCode: "",
    });
  } else {
    res.status(500).json({
      resultMessage: {
        en: err.message,
        ur: err.message,
      },
      resultCode: "",
    });
  }
};

export default async (req, res) => {
  upload.single("file")(req, res, (err) => {
    if (err) {
      return handleUploadError(err, req, res);
    }

    const url = req.protocol + "://" + req.get("host");

    return res.json({
      resultMessage: {
        en: "File uploaded successfully!",
        ur: "File uploaded successfully!"
      },
      resultCode: "",
      result: {
        image_url: url + "/images/" + req.file.filename,
      },
    });
  });
}
