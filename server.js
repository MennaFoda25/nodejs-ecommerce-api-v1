const express = require("express");
const dotenv = require('dotenv');
const morgan = require("morgan");

dotenv.config({ path : 'config.env'});
const ApiError = require("./utils/apiError");
const dbConnection =require("./config/database")

const categoryRoute = require('./Routes/categoryRoutes')


dbConnection()
// express app
const app = express();

//Middlewares
app.use(express.json()); //parsing leljson file  l javasript object 
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
    console.log(`mode: ${process.env.NODE_ENV}`);

}

//Mount Routes

app.use('/api/v1/categories', categoryRoute);

app.all('*', (req,res,next)=>{
   // const err = new Error(`Can't find this route ${req.originalUrl}`)
   // next(err.message)

   next(new ApiError(`Can't find this route ${req.originalUrl}`, 400));
})

//middleware to handle errors and return them in json 
app.use((err, req, res, next)=>{
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    })
})
const PORT = process.env.PORT || 8000;
app.listen(PORT, ()=>{
    console.log(`App runing on port ${PORT}`);
})