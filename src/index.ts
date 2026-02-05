import express from "express"
import client from "prom-client";
import { middleware } from "./middleware.js";
import { metricsMiddleware } from "./metrics/index.js";


const app = express();
app.use(middleware);
app.use(metricsMiddleware);

app.get("/cpu", (req,res) => {
    for(let i = 0; i<100000000; i++) {
        Math.random();
    }
    res.json({
        message: "cpu intensive task"
    })
})

app.get("/users", (req,res) => {
    res.json({
        message: "users"
    })
})

app.get("/metrics", async(req,res) => {
    const metrics = await client.register.metrics();
    res.set('Content-Type', client.register.contentType);
    res.end(metrics);
})

app.listen(3000);