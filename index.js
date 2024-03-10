const express = require("express");
var cors = require("cors");
const serverless = require("serverless-http");

const app = express();

// Middleware for parsing JSON requests
app.use(express.json());
app.use(cors())

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  const apiDocumentation = {
    message: "Welcome to the API!",
    endpoints: {
      "/recommend": "POST - Get recommendations based on cart data",
    },
  };
  res.json(apiDocumentation);
});

// Import your recommendation engine
const recommendationEngine = require("./recommendationEngine");

app.post("/recommend", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  // res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader("Access-Control-Allow-Credentials", "true");
  // Get the user data or product information from the request body
  const { cart_data } = req.body;

  // Use our recommendation engine to generate recommendations
  const recommendations = recommendationEngine.getRecommendations(cart_data);

  // Send the recommendations as the response
  res.status(200).json(recommendations);
});

module.exports.handler = serverless(app);
