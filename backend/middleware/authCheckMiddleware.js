const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const token = req.cookies.token;  // Ambil token dari cookie
    console.log(token);
    if (!token) return res.sendStatus(401);

    jwt.verify(token, '123', (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        res.json(user          
        );
        // next();
    });
}

module.exports = authenticateToken;
