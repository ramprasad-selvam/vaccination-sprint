let userList = {};

function auth(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).send("Unauthorized request!");
  }
  const token = authHeader.split(" ")[1];
  if (!userList[token]) {
    return res.status(401).send("Unauthorized request!");
  }
  const diff = Date.now() - userList[token].t;
  const fiveHoursInMs = 5 * 60 * 60 * 1000;

  if (diff < fiveHoursInMs) {
    next();
  } else {
    return res.status(401).send("Token expired!");
  }
}

function setAuth(token, user) {
  userList[token] = { ...user, t: Date.now() };
}

module.exports = { auth, setAuth };
