require('dotenv').config()
const express = require('express');
const app = express();
const connectDb = require('./db/connectDb')
const userRoute = require('./routes/userRoute')


// middlewares
app.use(express.json())


app.use(userRoute)


app.get('/', (req, res) => {
    res.send('hello admin, ----MANIA CODER')
})

const startDb = () => {
    try {
        connectDb(process.env.MONGO_URI)
        console.log('db connected')
    } catch (error) {
        console.log(error)
    }
}



const PORT = 6080 || process.env.PORT

app.listen(PORT, () => console.log(`listening on port ${PORT}`))



startDb()




