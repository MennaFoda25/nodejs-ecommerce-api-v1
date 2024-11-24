const express = require("express");
const dotenv = require('dotenv');
const morgan = require("morgan");

dotenv.config({ path : 'config.env'});
const ApiError = require("./utils/apiError");
const globalError = require("./middleWares/errorMiddleware");
const dbConnection =require("./config/database")

const categoryRoute = require('./Routes/categoryRoutes');


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

//middleware to handle errors and return them in json in express only
app.use(globalError);

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, ()=>{
    console.log(`App runing on port ${PORT}`);
})

//when i have error not coming from express i want to catch it globaly
//Events (lama y7sal rejection aw error fy event by7sal 3ando emit fa ba3ml listen 3ala elevent dah w ba3mel callback function 3ashan yrga3ly elerror )
//handle rejections outside the express
process.on('unhandeledRejection', (err)=>{
        console.error(`UnhandledRejection  Errorrr: ${err.name} | ${err.message}`);
        server.close(()=>{ //ba2olo e3mel shut down lama t5las elreq ely gaya 3ala elserver
           console.log("Shutting down ...... bye!!!")
            process.exit(1); //shut down app
        });
})