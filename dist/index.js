import express from "express";
import client from "prom-client";
const requestCounter = new client.Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'route', 'status_code']
});
function middleware(req, res, next) {
    const startTime = Date.now();
    res.on('finish', () => {
        const endTime = Date.now();
        console.log(`Request took ${endTime - startTime}ms`);
        // Increment request counter
        requestCounter.inc({
            method: req.method,
            route: req.route ? req.route.path : req.path,
            status_code: res.statusCode
        });
    });
    next();
}
;
const app = express();
app.use(middleware);
app.get("/cpu", (req, res) => {
    for (let i = 0; i < 100000000; i++) {
        Math.random();
    }
    res.json({
        message: "cpu intensive task"
    });
});
app.get("/users", (req, res) => {
    res.json({
        message: "users"
    });
});
app.get("/metrics", async (req, res) => {
    const metrics = await client.register.metrics();
    res.set('Content-Type', client.register.contentType);
    res.end(metrics);
});
app.listen(3000);
//# sourceMappingURL=index.js.map