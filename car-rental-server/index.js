import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './config/Db.js';
import clerkwebhook from './controller/clerkwebhooks.js';
import "dotenv/config";

connectDB();
const app = express();

//  Enable CORS
app.use(cors());

// Clerk webhook uses raw body
app.post('/api/clerk', bodyParser.raw({ type: '*/*' }), clerkwebhook);

//  Use JSON body parser for other routes
app.use(express.json());

const PORT = process.env.PORT || 4000 ;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
