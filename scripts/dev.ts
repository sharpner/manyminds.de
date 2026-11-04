import express from "express";
import type { ApiRequest, ApiResponse } from "../api/http";
import slots from "../api/slots";
import book from "../api/book";

const app = express();
app.disable("x-powered-by");
app.use(express.json({ limit: "8kb" }));
app.all("/api/slots", (req, res) =>
  slots(req as unknown as ApiRequest, res as unknown as ApiResponse),
);
app.all("/api/book", (req, res) =>
  book(req as unknown as ApiRequest, res as unknown as ApiResponse),
);
app.use("/assets", express.static("assets"));
for (const file of [
  "index.html",
  "impressum.html",
  "styles.css",
  "script.js",
  "favicon.ico",
  "robots.txt",
  "sitemap.xml",
  "llms.txt",
  "llms-en.txt",
]) {
  app.get("/" + file, (_req, res) =>
    res.sendFile(file, { root: process.cwd() }),
  );
}
app.get("/", (_req, res) =>
  res.sendFile("index.html", { root: process.cwd() }),
);
app.listen(5173, "127.0.0.1", (error) => {
  if (error) throw error;
  console.log(
    "Local: http://localhost:5173 — real API handlers; sending requires RESEND_API_KEY.",
  );
});
