const {validationResult} = require('express-validator');


const validatorMiddleware =(req,res,next)=>{ //middleware to catch errors from rules if exist
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    next() //law mafesh errors hayn2el 3ala ely ba3dha ely howa elmethod 
}

module.exports = validatorMiddleware;