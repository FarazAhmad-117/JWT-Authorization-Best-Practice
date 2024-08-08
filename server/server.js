import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import logger from 'morgan';
import connectDb from './db/connectDb.js';
import path from 'path';
import { fileURLToPath } from 'url';

config();

const port = process.env.PORT || process.args[2] || 8089;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.static('public'));
app.use(express.json({
    limit:process.env.JSON_LIMIT
}));
app.use(express.urlencoded({extended:false}));
app.use(cors({
    origin:process.env.CORS_ORIGIN
}))
app.use(logger('dev'));


app.get('/',(req,res)=>{
    res.status(200).send('Hello World');
})

app.get('/api',(req,res)=>{
    res.status(200).json({message:'Api is working'})
});

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});


connectDb().then(()=>{
    app.listen(port,()=>{
        console.log(`Server is running at http://localhost:${port}`);
    })
})
.catch((err)=>{
    console.log('Error conecting db',err);
    process.env(1);
})



