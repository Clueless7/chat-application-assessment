const User = require('../models/User')

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body
    const user = await User.create({ name, email, password })
    res.status(201).json(user)
  } catch (error) {
    let message

    if (error.code == 11000) {
      message = 'User already exists'
    } else {
      message = error.message
    }

    res.status(400).json(message)
  }
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findByCredentials(email, password)
    user.status = 'online'
    await user.save()
    res.status(200).json(user)
  } catch (error) {
    res.status(400).json(error.message)
  }
}

module.exports = {
  createUser,
  loginUser,
}
