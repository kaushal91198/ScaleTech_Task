const express = require('express');
const app = express();
const cors = require('cors')
const env = require('dotenv')
const connectToMongo = require('./config/config');
const operation = require('./seeder')
const voteRoutes = require('./routes/voteRoutes')

env.config();
const port = process.env.PORT || 6000;
//Connecting to mongoDb Database
connectToMongo(process.env.MONGO_URL);

app.use(cors());
app.use(express.json());


//To enter the sample data in database.
// operation.importData()
// To delete the data
// operation.destroyData()

app.use('/api/vote', voteRoutes)


app.listen(process.env.PORT || port, () => {
    console.log(`Server running on port ${port}`.blue)
})