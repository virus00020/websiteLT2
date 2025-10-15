const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

app.use(express.static("public"));

// Home
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "home.html"));
});

// Dashboard
app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// About
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "about.html"));
}); 

// Login
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// Admin Dashboard
app.get("/admin-dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});

// Example team API (like your old one)
app.get("/team", (req, res) => {
  fs.readFile("team.json", "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Failed to load team data" });
    res.json(JSON.parse(data));
  });
});


const PORT = 3000;
app.listen(PORT, () =>
  console.log(`✅ Server running at http://localhost:${PORT}`)
);

