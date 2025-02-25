const jwt = require("jsonwebtoken");
require("dotenv").config(); // Load environment variables

module.exports = function (roles = []) { // Accept roles as an array
    return (req, res, next) => {
        // Get token from the request header
        const token = req.header("Authorization");

        // Check if token exists
        if (!token) {
            return res.status(401).json({ msg: "No token, authorization denied" });
        }

        try {
            // Verify token after removing "Bearer " prefix
            const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
            req.user = decoded; // Add user data to request

            // Check if user has the required role
            if (roles.length > 0 && !roles.includes(req.user.role)) {
                return res.status(403).json({ msg: "Access denied" });
            }

            next(); // Proceed to the next middleware or route
        } catch (err) {
            res.status(401).json({ msg: "Token is not valid" });
        }
    };
};
