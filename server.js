const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// connecting to mongo
mongoose.connect(process.env.MONGO_URI)

// password - FZlXQGgyHv1Oyoxu
// username - mfm222

mongoose
    .connect(uri, {
        userNerUrlParser: true,
        useUnifiedTopology, tlsInsecure,
    })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("MongoDB connection error: ", err);
    });

// routing
const apiRoutes = require('./routes');
app.use('/api', apiRoutes);

// start server
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});