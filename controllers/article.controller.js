const Joi = require('joi'); 
const ArticleModel = require('../models/article.model.js');


const postArticle = async (req, res, next) => {
    
    try {
    
        const newArticle = new ArticleModel({
            
            title: req.body.title,
            content: req.body.content,
            author: req.user._id,
        });
        await newArticle.save();

        return res.status(200).json({
            message: 'Article has been uploaded',
            data: newArticle
        })

    } catch (error) {
        console.error(error);
        next(error);
    }
};
const getAllArticles = async (req, res, next) => {
    try {
        console.log(req.user);
        const articles = await ArticleModel.find().populate(
            "author", 
            "name _id email"
        );

        return res.status(200).json({
            message: "Articles successfully retrieved",
            data: articles
        });

    } catch (error) {
        console.error(error)
        next(error);
    }
};

const getArticleById = async (req, res, next) => {
    try {
        const article = await ArticleModel.findById(req.params.id);

        if(!article) {
            return res.status(404).json({
                message: `Article with ${req.params.id} not found`
            })
        }

        return res.staus(200).json({
            message: 'Article retrieved successfully',
            data: article
        })
        
    } catch (error) {
        console.error(error);
        next(error);
    }
};

const updateArticleById = async (req, res, next) => {
    try {
        const updatedArticle = await ArticleModel.findOneAndUpdate(
            { _id: req.params.id, author: req.user._id },
            { ...req.body },
            { 
                new: true, 
                runValidators: true, 
            }
        );

        if (!updatedArticle) {             
            return res.status(404).json({error:' Article Not found'});
            res.json(article);
        }

        return res.status(200).json({
            message: 'Article updated successfully'
        });

    } catch (error) {
        next(error);
    }
};

const deleteArticleById = async (req, res, next) => {
    try {
        const article = await ArticleModel.findOneAndDelete({
            _id: req.params._id,
            author: req.user._id,
        });
        
        if(!article) {
            return res.status(404).json({
                message: 'Article not found'
            });
        }

        return res.send(200).json({
            message: 'Article successfully deleted'
        });
        
    } catch (error) {
        next(NativeError);
    }
};

module.exports = {
    postArticle,
    getAllArticles,
    getArticleById,
    updateArticleById,
    deleteArticleById
};