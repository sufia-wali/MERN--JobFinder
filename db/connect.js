const mongoose = require('mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/22-JOBIFY", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

