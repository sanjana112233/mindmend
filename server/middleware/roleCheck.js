module.exports = function (roles = []) {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ msg: 'Unauthorized' });
        }

        // If the user's role is NOT in the allowed list
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ msg: 'Access Forbidden: Insufficient Permissions' });
        }

        next();
    };
};