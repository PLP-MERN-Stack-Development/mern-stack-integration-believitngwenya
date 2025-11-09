import express from 'express';
import { body } from 'express-validator';
import {
  getCategories,
  createCategory
} from '../controllers/categoryController.js';
import { protect } from './middleware/auth.js';

const router = express.Router();

const categoryValidation = [
  body('name').notEmpty().withMessage('Category name is required'),
  body('description').notEmpty().withMessage('Description is required')
];

router.route('/')
  .get(getCategories)
  .post(protect, categoryValidation, createCategory);

export default router;