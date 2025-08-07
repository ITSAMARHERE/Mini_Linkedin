import express from "express";
import dotenv from "dotenv";
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';
import postRoutes from './routes/post.route.js';
import notificationRoutes from './routes/notification.route.js';
import connectionRoutes from './routes/connection.route.js';
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// CORS configuration
if (process.env.NODE_ENV !== "production") {
	app.use(
		cors({
			origin: "http://localhost:5173",
			credentials: true,
		})
	);
}

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());

// API Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/notifications", notificationRoutes);
app.use("/api/v1/connections", connectionRoutes);

// Production setup
if (process.env.NODE_ENV === "production") {
	// Serve static files from frontend dist folder
	const frontendDistPath = path.join(__dirname, "frontend", "dist");
	
	app.use(express.static(frontendDistPath));

	// Handle React routing, return all requests to React app
	app.get("*", (req, res) => {
		const indexPath = path.resolve(frontendDistPath, "index.html");
		res.sendFile(indexPath);
	});
} else {
	// Development route
	app.get("/", (req, res) => {
		res.send("API is running in development mode");
	});
}

// Error handling middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({ message: "Something went wrong!" });
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}....`);
    connectDB();
});