const express = require("express")
const routes = require('../api/routes')
const app = express();
const port =8000;
const cors=require("cors");
cookieParser = require('cookie-parser');
const db= require('./config/mongoose')
const redisClient=require("../api/redisConnect");




app.use(cors({
    origin: ['http://localhost:3000'],
    method : ["get" , "get"],
    credentials:true
}))

app.get('/' ,async (req , res) => {
    let keyName = 'keyName';
    let getCacheData= await redisClient.get(keyName);
    let result = {
        id : 12,
        name : " test demo"
    }
    let responseArray = '';
    if(getCacheData){
        responseArray = JSON.parse(getCacheData)
        console.log("GET CACHE");
    }
    else{
        console.log("SET CACHE");
        redisClient.set(keyName , JSON.stringify(result))
        responseArray=result;
    }
    console.log(getCacheData);
    res.status(200).json(responseArray)
})

app.use(express.json());
app.use(cookieParser());
app.use('/api' ,routes );
app.listen( port ,  () => console.log(`app is runnning on port ${port}`))