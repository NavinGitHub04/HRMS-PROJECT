import dotenv from "dotenv"
import { connectDB } from "./db/index.js"
import { app } from "./app.js"

dotenv.config({
  path: "./.env",
})

connectDB()
app.listen(process.env.PORT || 8000, () => {
  console.log(`server is running at http://localhost:${process.env.PORT}`);
})