require('dotenv').config({path: '.env'});

// Middleware Function
// Verify API Details
const verifyApiSecret = async (req, res, next) => {
  const apiKey = req.header('x-api-key');
  const apiSecret = req.header('x-api-secret');

  if (!apiKey || !apiSecret) {
    return res.status(401).json({ message: 'Missing API credentials!' });
  } else if (apiKey === process.env.API_KEY && apiSecret === process.env.API_SECRET) {
    next();
  } else {
    return res.status(403).json({ message: 'Unauthorized API Access!' });
  }
};

module.exports = {
    verifyApiSecret
};
