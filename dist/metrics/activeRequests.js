import client from "prom-client";
export const activeRequestGauge = new client.Gauge({
    name: 'active_req',
    help: 'Number of active requests'
});
//# sourceMappingURL=activeRequests.js.map