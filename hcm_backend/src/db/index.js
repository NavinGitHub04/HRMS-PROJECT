import dotenv from "dotenv"
import db from "mysql2"
import { DB_NAME } from "../constants.js"

dotenv.config({
  path: "./.env",
})

const connection = db.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: DB_NAME,
})

const connectDB = async () => {
  await connection.connect((error) => {
    if (error) {
      console.log(`database connection error: ${error}`)
      return;
    }
    console.log(`database connected successfully!`)
  })
}

export { connectDB, connection }