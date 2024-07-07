import express from "express";
import path from "path";
import { fileURLToPath } from 'url';
import { router } from "./routes/natas.js";
const app = express();
const port = process.env.PORT || 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, '../public')));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, '../views'));
app.use("/public/natas/", router);
app.get("/", (req, res) => {
    res.render('home');
});
app.get("/public", (req, res) => {
    res.render('blogs/menu');
});
app.listen(port, () => {
    console.log(`server running on port ${port}`);
});
//# sourceMappingURL=app.js.map