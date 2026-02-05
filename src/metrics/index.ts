import type { Request,Response, NextFunction } from "express";
import { requestCounter } from "./requestCount.js";

export function metricsMiddleware(req: Request, res: Response, next: NextFunction){
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
};