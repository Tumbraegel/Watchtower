// Tutorial: https://dev.to/dipakkr/implementing-authentication-in-nodejs-with-express-and-jwt-codelab-1-j5i
// LAST ACCESSED 31/05

const jwt = require("jsonwebtoken")

module.exports = function(req, res, next) {
  const token = req.header("x-access-token")
  if (!token) return res.status(401).json({ message: "Auth Error" })

  try {
    const decoded = jwt.verify(token, "secretKey")
    req.user = decoded.user
    next()
  } catch (e) {
    console.error(e)
    res.status(500).send({ message: "Invalid Token" })
  }
}
