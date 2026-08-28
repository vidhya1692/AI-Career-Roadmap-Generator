require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { generateCareerRoadmap } = require("./aiService");

const app = express();

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "AI Career Roadmap API is running",
  });
});

// AI Career Roadmap
app.post("/api/roadmaps/generate", async (req, res) => {
  try {
    const data = req.body;

    console.log("Generating roadmap for:", data.targetCareer);

    const roadmap = await generateCareerRoadmap(data);

    console.log("Roadmap generated successfully");

    res.json(roadmap);
  } catch (error) {
    console.error("AI ERROR:", error);

    res.status(500).json({
      error: "Failed to generate career roadmap",
      message: error.message,
    });
  }
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
