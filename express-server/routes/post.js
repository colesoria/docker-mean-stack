const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();
const postController = require('./../controllers/post');
/* GET api listing. */
router.get('/', postController.getPosts);
router.get('/:id', postController.getPost);
router.get('/:id/comments', postController.getComments);
router.post('/', postController.createPost);
router.put('/:id', postController.updatePost);
router.patch('/:id', postController.patchPostData);
router.delete('/:id', postController.deletePost);

module.exports = router;