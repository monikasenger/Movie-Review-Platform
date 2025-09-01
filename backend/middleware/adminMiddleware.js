import jwt from "jsonwebtoken";


const authAdmin = (req, res, next) => {
  try {
    let atoken = req.headers["authorization"];

    if (!atoken) {
      return res.status(401).json({ success: false, message: "No admin token provided" });
    }

    if (atoken.startsWith("Bearer ")) {
      atoken = atoken.split(" ")[1];
    }

    const decoded = jwt.verify(atoken, process.env.JWT_SECRET_ADMIN);

    if (decoded.role !== "admin") {
      return res.status(403).json({ success: false, message: "Not authorized as admin" });
    }

    req.admin = decoded;
    next();
  } catch (error) {
    console.error("Admin auth error:", error);
    return res.status(401).json({ success: false, message: "Invalid or expired admin token" });
  }
};

export default authAdmin;
