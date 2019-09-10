const { validationResult} = require('express-validator/check');

const responseFormat = (req, res, next) => {
    const result = validationResult(req);
    
    if (result.isEmpty()) {
        return next();
    }

    res.status(422).json({ errors: result.array() });
} ;
module.exports = {responseFormat};