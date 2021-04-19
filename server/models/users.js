import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
  {
    favEvents: Array,
    favProperties: Array,
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
    },
    resetPasswordToken: String,
    resetPasswordExpires: Number,
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 3,
    },
    image: String,
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model('User', userSchema)

export default User
