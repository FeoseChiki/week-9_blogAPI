

const requireOwnership = (model) => async (req, res, next) => {
    
    const item = await model.findById(req.params.id);
    
    if (!item) 
        return res.status(404).json({error: 'Not found'});

    if (item.userId.toString() !== req.user.userId)
        return res.status(403).json({ error: 'Not authorised to perform this function'});
    
    req.item = item;
    next();
}

module.exports = requireOwnership;