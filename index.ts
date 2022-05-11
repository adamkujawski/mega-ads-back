import express = require("express");
import cors = require("cors");
import 'express-async-errors'
import { json } from "express";

const app = express();

app.use(cors({
    origin:'http://localhost:3000'
}));

app.use(json());

app.listen(3001,'0.0.0.0',()=>{
    console.log("Server litening on http://localhost:3001")
})