import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import productRoutes from '../server/routes/productRoutes.js'
import connectDB from './config/db.js';
const app = express();
const port = process.env.PORT || 5000;

dotenv.config()

app.use(express.json());
app.use(cors())

connectDB();

app.get('/', (req, res) =>{
   res.send('My server is running.')
})

//routers
app.use('/api/product', productRoutes)



app.listen(port, () => console.log('My server is running ' + port))