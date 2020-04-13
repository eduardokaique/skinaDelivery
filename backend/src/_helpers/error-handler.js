module.exports = errorHandler;

function errorHandler(error, request, response, next) {
    if (typeof (or) === 'string') {
        // custom application oror
        return response.status(400).json({ message: error });
    }

    if (error.name === 'UnauthorizedError') {
        // jwt authentication error
        return response.status(401).json({ message: 'Invalid Token' });
    }

    // default to 500 server error
    return res.status(500).json({ message: error.message });
}