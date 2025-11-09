import express from 'express';
import { body } from 'express-validator';
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  getPostsByCategory
} from '../controllers/postController.js';
import { protect } from './middleware/auth.js';

const router = express.Router();

// Validation rules
const postValidation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('content').notEmpty().withMessage('Content is required'),
  body('excerpt').notEmpty().withMessage('Excerpt is required'),
  body('category').isMongoId().withMessage('Valid category ID is required')
];

router.route('/')
  .get(getPosts)
  .post(protect, postValidation, createPost);

router.route('/category/:categoryId')
  .get(getPostsByCategory);

router.route('/:id')
  .get(getPost)
  .put(protect, postValidation, updatePost)
  .delete(protect, deletePost);

export default router;