// - `auth.js`: Update the auth middleware function to work with the GraphQL API.

// bringing jwt from jsonwebtoken library - checks validation of the token using a secret and expiration
const jwt = require("jsonwebtoken");

// set token secret and expiration date
const secret = "mysecretsshhhhh"; //private key that signs the token and enables the serverify if the token is valid
const expiration = "2h"; // length of time the token remains valid before expiring 15/20 minutes is a better experiation time

module.exports = {
  // function for our authenticated routes
  authMiddleware: function (req, res, next) {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;
    // let token =  req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    // We split the token string into an array and return actual token
    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    if (!token) {
      return res.status(400).json({ message: "You have no token!" });
    }

    // verify token and get user data out of it
    // if token can be verified, add the decoded user's data to the request so it can be accessed in the resolver
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log("Invalid token");
      // return the request object so it can be passed to the resolver as `context`
      return res.status(400).json({ message: "invalid token!" });
    }

    // send to next endpoint
    next();
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
