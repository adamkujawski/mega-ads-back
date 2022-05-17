import express = require("express");
import cors = require("cors");
import 'express-async-errors'
import {json} from "express";
import {handleError} from "./utils/errors";
import rateLimit from "express-rate-limit";

const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(json());
app.use(rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 100,
}));


// Routes
// Sprawdzenie czy walidacja bledow dziala
// app.get('/', async (req,res)=> {
//     throw new Error('Damn');
// })
app.use(handleError)

app.listen(3001, '0.0.0.0', () => {
    console.log("Server litening on http://localhost:3001")
})