export function middleware(req, res, next) {
    const startTime = Date.now();
    next();
    const endTime = Date.now();
    console.log(`Request took ${endTime - startTime} ms`);
}
//# sourceMappingURL=middleware.js.map