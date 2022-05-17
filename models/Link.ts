import mongoose from 'mongoose'

const model: mongoose.Schema<LinkSchema> = new mongoose.Schema<LinkSchema>({
  userId: Number,
  link: String,
  linkName: String,
  password: String,
  shortId: Number,
  dateCreate: { type: Date, default: Date.now },
})

export interface LinkSchema {
  _id?: string
  shortId?: number
  userId: number
  link: string
  linkName: string
  password?: string
  dateCreate?: number
  save: () => Promise<any>
}

export const Link = mongoose.model<LinkSchema>('Link', model)