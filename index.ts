import express = require("express");
import cors = require("cors");
import 'express-async-errors'
import {json, Router} from "express";
import {handleError} from "./utils/errors";
import rateLimit from "express-rate-limit";
import {adRouter} from "./routers/ad.router";
import {config} from "./config/config";

const app = express();

app.use(cors({
    origin: config.corsOrigin,

}));
app.use(json());

const router = Router();

router.use('/ad', adRouter);

app.use('/api', router);

app.use(rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 100,
}));

// app.get('/', async (req,res)=> {
//     throw new Error('Damn');
// })
app.use(handleError)



app.listen(3001, '0.0.0.0', () => {
    console.log("Server litening on http://localhost:3001")
})