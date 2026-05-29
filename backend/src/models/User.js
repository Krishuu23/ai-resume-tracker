import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
    validator: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message: 'Please enter a valid email address'
  }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
}, {
  timestamps: true
})

const User = mongoose.model('User', userSchema)

export default User