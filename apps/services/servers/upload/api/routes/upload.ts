import { Router } from 'express';
import uploadMedia from '../../controller/upload';
import multer from "multer";
import path from "path"
import fs from "fs";

const authRouter = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// the route created with this would be /upload
export default (baseRouter: Router) => {
  authRouter.post('/upload', upload.single('media'), uploadMedia);
};
