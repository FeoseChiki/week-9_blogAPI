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

//router.use(requireAuth);

router.post('/articles', validateArticle, postArticle);

router.get('/articles', getAllArticles);

router.get('/articles/:id', getArticleById);

router.put('/articles/:id', validateUpdateArticle, updateArticleById);

router.delete('/articles/:id', deleteArticleById);

module.exports = router;