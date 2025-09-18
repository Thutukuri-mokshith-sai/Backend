// controllers/soilController.js
const axios = require('axios');

const getSoilData = async (req, res) => {
  try {
    console.log('/api called');
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({ error: "Latitude and Longitude are required." });
    }

    // Build API URL
    const apiUrl = `https://rest-sisindia.isric.org/sisindia/v1.0/properties/query/gridded?lon=${lon}&lat=${lat}`;

    // Fetch data from ISRIC API
    const response = await axios.get(apiUrl);
    console.log(response.data);

    // Send back success with data
    return res.status(200).json({
      success: true,
      data: response.data
    });

  } catch (error) {
    console.error("Error fetching soil data:", error.message);
    return res.status(500).json({ error: `Failed to fetch soil data: ${error.message}` });
  }
};

module.exports = { getSoilData };
