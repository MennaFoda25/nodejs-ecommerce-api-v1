const express = require("express");
const dotenv = require('dotenv');
const morgan = require("morgan");

dotenv.config({ path : 'config.env'});
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
    const err = new Error (`Can't find this route ${req.originalUrl}`)
    next(err.message)
})

//middleware to handle errors and return them in json 
app.use((err, req, res, next)=>{
    res.status(400).json({err})
})
const PORT = process.env.PORT || 8000;
app.listen(PORT, ()=>{
    console.log(`App runing on port ${PORT}`);
})