import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { uploadRoutes } from "./routes/upload";
import { generateRoutes } from "./routes/generate";
import swagger from "@elysiajs/swagger";

const app = new Elysia()
  .use(cors())
  .use(uploadRoutes)
  .use(generateRoutes)
  .use(
    swagger({
      path: "/docs",
      version: "1.0.0",
    })
  )
  .get("/", () => Bun.file("public/index.html"))
  .listen(process.env.PORT || 3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
