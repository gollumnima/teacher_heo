const express = require('express');
const router = express.Router();

const {
    getOnePost,
    getAllPosts,
    updatePost,
    createPost,
    deletePost,
    validate,
} = require('../controllers/post')
const { validationMiddleware } = require('../controllers/validator')


// 목록조회
router.get('/', validationMiddleware(
    validate.offset,
    validate.limit,
    validate.order
), getAllPosts)

// 단일조회 
router.get('/:id',validationMiddleware(
    validate.id,
), getOnePost)

// 생성
router.post('/',validationMiddleware(
    validate.body,
), createPost)

// 수정
router.put('/:id', validationMiddleware(
    validate.id,
    validate.body
), updatePost,
)

// 삭제
router.delete('/:id', validationMiddleware(
    validate.id
),deletePost)

module.exports = router