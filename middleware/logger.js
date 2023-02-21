//@desc    Logs request to console
/*
    We will use a third party middleware(logger) called "morgan"
    npm i morgan -> install morgan
    npm run dev -> run code in enviroment setup
    npm i mongoose -> run code that will install mongoose
*/
const logger = (req, res, next) => {
    req.hello = "Hello World";
    console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
}
                                                                                            
module.exports = logger;
