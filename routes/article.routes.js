const express = require('express');

const { 
    postArticle, 
    getAllArticles, 
    getArticleById, 
    updateArticleById, 
    deleteArticleById 
} = require('../controllers/article.controller.js');

const {
    validateArticle,
    validateUpdateArticle,
} = require('../validations/post.validation.js');

const requireAuth = require('../middlewares/requireAuth.js');
const requireOwnership = require('../middlewares/requireOwnership.js');

const router = express.Router();

router.post('/articles', validateArticle, requireAuth, postArticle);

router.get('/articles', requireAuth, getAllArticles);

router.get('/articles/:id', requireAuth, getArticleById);

router.put('/articles/:id', validateUpdateArticle, requireAuth, updateArticleById);

router.delete('/articles/:id', requireAuth, deleteArticleById);

module.exports = router;