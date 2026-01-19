import express from "express";
import worker from "./worker.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.get("/api/all", async (req, res) => {
  const url = new URL(req.protocol + "://" + req.get("host") + req.originalUrl);
  const request = new Request(url.toString());
  const response = await worker.fetch(request);
  const text = await response.text();
  res.status(response.status).send(text);
});

app.listen(PORT, ()=>console.log("Running on "+PORT));
