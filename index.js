import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  host: "localhost",
  user: "postgres",
  password: "postgres",
  port: "5432",
  database: "Secrets",
});

db.connect();

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", async (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const query = await db.query("INSERT INTO new_users (email, password) VALUES ($1, $2)", [email, password]);
  } catch (error) {
    console.error(error);
  }
});

app.post("/login", async (req, res) => {
  console.log(req.body.username);
  console.log(req.body.password);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

