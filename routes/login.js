import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UserModel } from '../db.js'

const router = express.Router()

// Refactored method to follow truthy path and error if either email or password are not found/incorrect
router.post('/', async (req, res) => {
  // Extract email and password from request body
  const { email, password } = req.body

  try {
    // Find the user by email and compare submitted password with the user's hashed password
    const user = await UserModel.findOne({ email })
    if (user && await bcrypt.compare(password, user.password)) {

        // Generate a JWT
        const token = jwt.sign(
            { _id: user._id.toString() },
            process.env.SECRET_KEY,
            { expiresIn: '7 days' } // Token expiration time - ** UPDATE to 1 hour for production **
          )

        // Send the JWT to the client
        res.send({ token })
      // }
      } else {
        res.status(401).send({message: 'Invalid credentials'})

    }

  } catch (error) {
      res.status(500).send({message: error.message})
  }
})

// PLEASE NOTE: In order to use this route, you must first hash a password from the seeded users.
// This routes compares a hashed password (Updating a user will hash the password)

export default router