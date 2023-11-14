const express = require('express');
const connection = require('./config/db');
const app = express();
const cors = require('cors');
const userRouter = require('./routes/userRoute');
const doubtRouter = require('./routes/doubtRoute');
require('dotenv').config();

app.use(express.json());
app.use(cors({
    origin : ['http://localhost:3000', 'https://doubt-share.vercel.app'],
    credentials : true
}))
app.use('/api/auth', userRouter);
app.use('/api/doubt', doubtRouter);

app.get('/', async (req, res) => {
    try {
        res.status(200).send('Homepage');
    } catch (error) {
        res.status(400).send({ msg: error.message });
    }
})

app.listen(process.env.port, async () => {
    try {
        await connection;
        console.log('Server is connected to the DB');
    } catch (error) {
        console.log(error.message);
    }
    console.log(`Server is listening at port ${process.env.port}`);
})