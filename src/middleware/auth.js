const jwt = require("jsonwebtoken");


exports.userAuthMiddlware = (request, response, next) => {
  console.log("useAuthMiddlware");
  next();
};

exports.adminAuthMiddleware = (request, response, next) => {
  console.log(request.headers);
  const token = request.headers.x-api-key;
  const result = isAdmin(token);
  if (result) {
    console.log(result);
    request.user = result.payload;
    next();
  }

  response.status(401).send();
};

const JWT_SECRET = "secret@#";


const validateUserToken = (token = "") => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

exports.isAdmin = (token) => {
  const payload = validateUserToken(token);
  if (payload && payload.role == "admin_user") {
    return {
      payload,
    };
  }
  return false;
};