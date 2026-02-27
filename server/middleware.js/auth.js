const protect = (req, res, next) => {
    if (!req.session || !req.session.isLoggedIn || !req.session.userId) {
        return res.status(401).json({
            message: "You are not logged in"
        });
    }

    next();
};

module.exports = { protect };