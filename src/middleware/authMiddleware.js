import jwt from "jsonwebtoken";

export const AuthGuard = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if Authorization header exists and starts with "Bearer"
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1]; // Extract token after "Bearer"

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Validate token
    req.user = decoded; // Attach user info to the request
    next(); // Continue to next middleware or route
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};
