import express from 'express'
import "dotenv/config";
import cors from 'cors';
import connectDB from './config/Db.js';
import { clerkMiddleware } from '@clerk/express'
import clerkwebhook from './controller/clerkwebhooks.js';
import bodyParser from 'body-parser';

connectDB()

const app=express()
app.use(cors())


// Apply middleware *before* JSON parsing// api to listen webhook
// app.post('/api/clerk', bodyParser.raw({ type: '*/*' }), clerkwebhook);


// middlewares

app.use(clerkMiddleware())

app.post("/api/clerk", bodyParser.raw({ type: "*/*" }), clerkwebhook);


app.get('/',(req,res) =>{
    res.send("<h1 style=color:red>App server start running successfully</h1>")
}) 

const PORT=process.env.PORT || 4000;
app.listen(PORT,() =>console.log(`Server running on port ${PORT} successfully`));

