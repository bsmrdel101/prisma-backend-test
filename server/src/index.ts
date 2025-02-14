import express from "express";
import { attachMiddlewares } from "./core/attach-middlewares";
import { attachRoutes } from "./core/attach-routes";

const app = express();
attachMiddlewares(app);
attachRoutes(app);


const PORT = process.env.PORT || 8090;
app.listen(PORT, () => {
  console.log(`Server is up on http://localhost:${PORT}`);
});
