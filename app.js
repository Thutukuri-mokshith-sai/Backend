const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
app.use(cors());
const db = require('./models');

app.use(bodyParser.json());
const auth=require('./routes/auth');
app.use('/auth',auth);
const soilRoutes = require('./routes/soilRoutes');
app.use('/api',soilRoutes);
// Start server
const PORT = 3000;
db.sequelize.sync({force:true}).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
