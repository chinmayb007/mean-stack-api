import express from "express";
import cors from "cors";
import { sample_foods, sample_tags } from "./data";

const app = express();
const PORT = 5000;
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);

app.get("/api/foods", (req, res) => {
  res.send(sample_foods);
});

app.get("/api/foods/tags", (req, res) => {
  res.send(sample_tags);
});

app.get("/api/foods/search/:searchTerm", (req, res) => {
  const searchTerm = req.params.searchTerm;
  const foods = sample_foods.filter((food) =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  res.send(foods);
});

app.get("/api/foods/tag/:tagName", (req, res) => {
  const tagName = req.params.tagName.toLowerCase();
  const foods = sample_foods.filter((food) =>
    food.tags.map((v: string) => v.toLowerCase()).includes(tagName)
  );
  res.send(foods);
});

app.get("/api/foods/:foodId", (req, res) => {
  const foodId = req.params.foodId.toLowerCase();
  const food = sample_foods.find((food) => food.id === foodId);
  res.send(food);
});

app.listen(PORT, () => {
  console.log(`Server hosted on http://localhost:${PORT}`);
});
