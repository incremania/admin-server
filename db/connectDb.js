const mongoose = require('mongoose')

const startDb = (db) => {
mongoose.connect(db, {
    family: 4
})
}


module.exports = startDb