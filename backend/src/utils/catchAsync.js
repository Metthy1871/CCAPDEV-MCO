// Source: https://medium.com/@santoshgiri2345/simplifying-error-handling-in-express-js-with-catchasync-8a0a561ada8f
// to be used for wrapping async functions to reduce manual try-catch blocks

const catchAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch((err) => next(err));
    };
};

export default catchAsync;