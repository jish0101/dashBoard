// PACKAGES IMPORTS
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'

// ROUTES IMPORTS
import clientRoutes from './routes/client.js'
import generalRoutes from './routes/general.js'
import managementRoutes from './routes/management.js'
import salesRoutes from './routes/sales.js'
import connectDB from './config/dbConn.js'

//data imports
import User from './models/User.js'
import Product from './models/Product.js'
import ProductStat from './models/ProductStats.js'
import {dataUser, dataProduct, dataProductStat} from './data/index.js'

// CONFIGURATION
dotenv.config();
const app = express()
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}))
app.use(morgan("common"));
app.use(express.urlencoded({extended:false}))
app.use(cors());

// ROUTES
app.use('/client', clientRoutes)
app.use('/general', generalRoutes)
app.use('/management', managementRoutes)
app.use('/sales', salesRoutes)

// MONGO SETUP AND LISTENING TO PORT 
const PORT = process.env.PORT || 9000;
connectDB();
mongoose.connection.once("open", () => {
    console.log("DB connected..");
    app.listen(PORT, () => {
        console.log(`Server running on port: ${PORT}`);

        // Only add data one time
        // Product.insertMany(dataProduct);
        // ProductStat.insertMany(dataProductStat)
        // User.insertMany(dataUser);
    })
})
