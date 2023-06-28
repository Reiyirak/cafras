const CustomErr = require("../errors");
const { isTokenValid } = require("../utils");

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;

  if (!token) {
    req.isLoggedIn = false;
    next();
    return;
  }

  try {
    const { name, userId, role } = isTokenValid({ token });
    req.user = { name, userId, role };
    req.isLoggedIn = true;
    next();
  } catch (error) {
    req.isLoggedIn = false;
    next();
  }
};

// const authenticateUser = async (req, res, next) => {
//   const token = req.signedCookies.token;
//
//   if (!token) {
//     throw new CustomErr.UnauthenticatedError("Authentication Invalid");
//   }
//
//   try {
//     const { name, userId, role } = isTokenValid({ token });
//     req.user = { name, userId, role };
//     next();
//   } catch (error) {
//     throw new CustomErr.UnauthenticatedError("Authentication Invalid");
//   }
// };

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      // throw new CustomErr.UnauthorizedError("Unauthorized to access this route");
      req.isAdmin = false;
      next();
    } else {
      req.isAdmin = true;
      next();
    }
  }
};

module.exports = {
  authenticateUser,
  authorizePermissions,
};
