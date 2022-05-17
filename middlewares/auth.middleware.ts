import { nextMiddleware } from 'degreet-telegram/src/types'
import { User, UserSchema } from '../models/User'
import { IMyContext } from '../core/types'

export async function authMiddleware(ctx: IMyContext, next: nextMiddleware): Promise<any> {
  const userId: number | undefined = ctx.sender?.id
  const firstName: string | undefined = ctx.sender?.first_name
  const lastName: string | undefined = ctx.sender?.last_name
  const username: string | undefined = ctx.sender?.username
  if (!userId || !firstName) return

  let user: UserSchema | null | undefined = await User.findOne({ userId })

  if (!user) {
    user = new User({
      userId,
      firstName,
      lastName,
      username,
      lastPing: Date.now(),
    })
  }

  user.username = username
  user.firstName = firstName
  user.lastName = lastName
  user.lastPing = Date.now()

  ctx.props.user = user
  await user.save()

  return next()
}