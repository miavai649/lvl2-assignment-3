import { Schema, model } from 'mongoose'
import { TSignup } from './auth.interface'
import bcrypt from 'bcryptjs'
import config from '../../config'

const signupSchema = new Schema<TSignup>(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      select: 0
    },
    phone: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      required: true
    },
    address: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        // transforming the data structure by deleting the password field before its return
        delete ret.password
        return ret
      }
    }
  }
)

// hashing the password before its save to the database
signupSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  )
  next()
})

export const Auth = model<TSignup>('Auth', signupSchema)
