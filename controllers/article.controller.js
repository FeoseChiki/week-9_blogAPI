const Joi = require('joi'); 
const ArticleModel = require('../models/article.model.js');


const postArticle = async (req, res, next) => {
    const articleSchema = Joi.object({
            title: Joi.string().min(5).required,
            content: Joi.string().min(20).required,
            author: Joi.string().min(5).optional().default('Guest')
        });

        const {error, value} = articleSchema.validate(req.body);

        if(error) {
            return res.status(400).json({
                error,
            });
        }

    try {
    const {title, content} = value
        const newArticle = new ArticleModel({
            title,
            content
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
const getAllArticle = async (req, res, next) => {
    const {limit = 10, page = 1 } = req.query;

    const skip = (page - 1)* limit;

    try {
        const articles = await ArticleModel.find({})
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(skip);

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
    const articleSchema = Joi.object({
            title: Joi.string().min(5).optional(),
            content: Joi.string().min(20).optional(),
            author: Joi.string().min(5).optional()
        });

        const {error, value} = articleSchema.validate(req.body);
        if(error) {
            return res.status(400).json('Please provide article title and content')
        }


    try {
        const updatedArticle = await ArticleModel.findByIdAndUpdate(
            req.params.id,
            { ...req.body, updatedAt: new Date() },
            { new: true, runValidators: true }
        );

        if (!updatedArticle) {             
            return res.status(404).json({error:'Not found'});
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
        const article = await ArticleModel.findByIdAndDelete(req.params.id);

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
    getAllArticle,
    getArticleById,
    updateArticleById,
    deleteArticleById
};