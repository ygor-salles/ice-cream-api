"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureHostLifeasier = void 0;
require("dotenv/config");
const ApiError_1 = require("../validators/Exceptions/ApiError");
function ensureHostLifeasier(request, response, next) {
    const urlCompare = process.env.NODE_ENV === 'development'
        ? process.env.URL_HOST_LIFEASIER_DEV
        : process.env.URL_HOST_LIFEASIER_PROD;
    const allowedHosts = urlCompare ? urlCompare.split(',').map(host => host.trim()) : [];
    const headerRequestUrl = request.headers.origin;
    console.log('urlCompare', urlCompare);
    console.log('allowedHosts', allowedHosts);
    console.log('headerRequestUrl', headerRequestUrl);
    if (!headerRequestUrl || !allowedHosts.some(host => headerRequestUrl.includes(host))) {
        console.log('Barrado!!!');
        throw new ApiError_1.ApiError(401, 'Host unauthorized');
    }
    request.hostLifeasierOrigin = true;
    return next();
}
exports.ensureHostLifeasier = ensureHostLifeasier;
