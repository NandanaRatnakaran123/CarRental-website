import express from 'express'
import "dotenv/config";
import cors from 'cors';
import connectDB from './config/Db.js';
import { clerkMiddleware } from '@clerk/express'
import clerkwebhook from './controller/clerkwebhooks.js';

connectDB()

const app=express()
app.use(cors())

// middlewares
app.use(express.json())
app.use(clerkMiddleware())

// api to listen webhook
app.use('/api/clerk',clerkwebhook)

const PORT=3000;
app.listen(PORT,() =>console.log(`Server running on port ${PORT} successfully`));


app.get('/',(req,res) =>{
    res.send("<h1 style=color:red>App server start running successfully</h1>")
})