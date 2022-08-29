const express = require('express')
const app = express()
app.use(express.json())
const cors = require('cors')
const port = process.env.PORT || 5000
const dotenv = require('dotenv')
dotenv.config()
require('express-async-errors')
const morgan = require('morgan')
const authenticateUser = require('./middleware/auth.js')

//db and authentication User
require('./db/connect');

//Routers
const authRouter = require('./routers/authRoutes.js')
const jobsRouter = require('./routers/jobsRoutes.js')

//middleware
const notFoundMiddleware = require('./middleware/not-found.js')
const errorHandlerMiddleware = require('./middleware/error-handler.js')
if(process.env.NODE_ENV !== 'production'){
  app.use(morgan('dev'))
}



app.get("/", (req,res)=>{
  res.send('Welcome')
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authenticateUser, jobsRouter)
app.use(cors())

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)



app.listen(port, ()=>{
  console.log(`server running at ${port}`);

})


