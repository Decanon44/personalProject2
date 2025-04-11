import express, { response } from "express";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const port = 3001;

app.get("/", (req, res) => {
  res.send("Hello World Diego!");
});

app.post("/login", (req, res) => {
  console.log(req);
  if (req.body.email == "admin" && req.body.password == "admin") {
    res.status(200).send("solo mensaje");
  } else {
    res.status(401).send("error autenticación");
  }
});

app.post("/venderProducto", (req, res) => {});

app.post("/modificarProducto", (req, res) => {});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
