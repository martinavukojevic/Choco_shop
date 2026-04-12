import express from 'express';
import multer from 'multer';
import {
  addManufacturer,
  listManufacturers,
  removeManufacturer,
  singleManufacturer,
  updateManufacturer
} from '../controllers/manufacturerController.js';
import adminAuth from '../middleware/adminAuth.js';

const manufacturerRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage });

manufacturerRouter.post('/add', adminAuth, upload.single('logo'), addManufacturer);

manufacturerRouter.get('/list', listManufacturers);
manufacturerRouter.post('/remove', adminAuth, removeManufacturer);
manufacturerRouter.post('/single', singleManufacturer);
manufacturerRouter.post('/update/:id', adminAuth, upload.single('logo'), updateManufacturer);

export default manufacturerRouter;
