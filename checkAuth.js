import jwt from "jsonwebtoken";

const checkAuth = (req, res, next) => {
    const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

    if (!token) {
        return res.status(403).json({
            message: "Нет доступа",
        });
    }
    try {
        const { admin } = jwt.verify(token, "secret1337");
        req.admin = admin;
        next();
    } catch (err) {
        return res.status(403).json({
            message: "Нет доступа",
        });
    }
};
export default checkAuth;