const express = require("express");
const cors = require("cors");
const { auth } = require("./libs/auth");
const { getUser, setUser, updateUser, getDashboard,setDashboard } = require("./src/user");
const port = 3000;
const app = express();
app.use(cors());
app.use(express.json());

app
  .route("/user/:id?")
  .get((req, res) => {
    getUser(req, res);
  })
  .post((req, res) => {
    setUser(req, res);
  })
  .put(auth, (req, res) => {
    updateUser(req, res);
  });

app.route("/login").post((req, res) => {
  checkUser(req, res);
});

app
  .route("/dashboard/:id?")
  .get((req, res) => {
    getDashboard(req, res);
  })
  .post((req, res) => {
    setDashboard(req, res);
  })
  .put(auth, (req, res) => {
    // updateUser(req, res);
  });

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
