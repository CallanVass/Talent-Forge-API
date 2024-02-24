import express from 'express'
import cors from 'cors'
import userRoutes from './routes/user_search.js'
import listingRoutes from './routes/listing.js'

// Defining app instance
const app = express()

// Middleware

// Open CORS for development (CHANGE BEFORE DEPLOYMENT)
app.use(cors())

// Parse JSON requests for req.body
app.use(express.json())

// Middleware for user-search routes
app.use('/users', userRoutes)

// Middleware for listings routes
app.use('/listings', listingRoutes)

// Default route i.e. login page - is this necessary?
app.get('/', (req, res) => res.send({info: "Talent Forge API"}))


export default app