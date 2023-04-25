const express = require('express');
const app = express();
require('dotenv').config({path : '../.env'});

const PORT = process.env.PORT;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))