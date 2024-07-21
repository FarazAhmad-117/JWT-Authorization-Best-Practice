import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import args from  process.argv;
import logger from 'morgan';
import connectDb from './db/connectDb';

config();

const port = process.env.PORT || args[2] || 8001;
const app = express();


app.use(express.static('public'));
app.use(express.json({
    limit:process.env.JSON_LIMIT
}));
app.use(express.urlencoded());
app.use(cors({
    origin:process.env.CORS_ORIGIN
}))
app.use(logger());


app.get('/',(req,res)=>{
    res.status(200).send('Hello World');
})

app.get('/api',(req,res)=>{
    res.status(200).json({message:'Api is working'})
});

app.get('*',(req,res)=>{
    res.status(404).json({message:'Path not found'})
})

connectDb().then(()=>{
    app.listen(port,()=>{
        console.log(`Server is running at http://localhost:${port}`);
    })
})
.catch((err)=>{
    console.log('Error conecting db',err);
    process.env(1);
})



