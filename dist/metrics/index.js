import { requestCounter } from "./requestCount.js";
import { activeRequestGauge } from "./activeRequests.js";
import { httpRequestDurationMicroseconds } from "./requestTime.js";
export function metricsMiddleware(req, res, next) {
    activeRequestGauge.inc();
    const startTime = Date.now();
    res.on('finish', () => {
        const endTime = Date.now();
        const duration = endTime - startTime;
        console.log(`Request took ${endTime - startTime}ms`);
        // Increment request counter
        requestCounter.inc({
            method: req.method,
            route: req.route ? req.route.path : req.path,
            status_code: res.statusCode
        });
        httpRequestDurationMicroseconds.observe({
            method: req.method,
            route: req.route ? req.route.path : req.path,
            code: res.statusCode
        }, duration);
        activeRequestGauge.dec();
    });
    next();
}
;
//# sourceMappingURL=index.js.map