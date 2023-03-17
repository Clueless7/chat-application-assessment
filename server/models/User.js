const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { isEmail } = require('validator')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please include a name'],
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Please include an email'],
      validate: [isEmail, 'Invalid email'],
    },
    password: {
      type: String,
      required: [true, 'Please include a password'],
    },
    status: {
      type: String,
      default: 'online',
    },
    newMessages: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true, minimize: false }
)

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()

  try {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    return next()
  } catch (error) {
    return next(error)
  }
})

userSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()
  delete userObject.password
  return userObject
}

userSchema.statics.findByCredentials = async function (email, password) {
  const user = await User.findOne({ email })
  if (!user) throw new Error('Incorrect email or password')

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) throw new Error('Incorrect email or password')

  return user
}

const User = mongoose.model('User', userSchema)

module.exports = User
