import  express  from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/pageRoutes";
import dbConnect from "./config/db";
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true}))
dotenv.config();
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true
}));
app.use(cookieParser());
dbConnect();

app.use("/api/v1",router);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
