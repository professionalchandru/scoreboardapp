const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        // console.log(verified)
        next();
    } catch (err) {
        if (err) return res.status(400).send(err + '\nInvalid token or token expired...! Please Login again')
    }
}