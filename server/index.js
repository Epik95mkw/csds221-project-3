import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './router.js';

const app = express();
dotenv.config({path : './.env'});
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors()); 
app.use('/api', router);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));