import mongoose from 'mongoose'

const model: mongoose.Schema<UserSchema> = new mongoose.Schema<UserSchema>({
  userId: Number,
  firstName: String,
  lastName: String,
  username: String,
  lastPing: Date,
  dateReg: { type: Date, default: Date.now },
})

export interface UserSchema {
  _id?: string
  userId: number
  firstName: string
  lastName?: string
  username?: string
  lastPing?: number
  dateReg?: number
  save: () => Promise<any>
}

export const User = mongoose.model<UserSchema>('User', model)