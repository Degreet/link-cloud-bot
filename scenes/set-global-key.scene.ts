import { StepScene } from 'degreet-telegram'
import { IMyContext } from '../core/types'
import { UserSchema } from '../models/User'
import * as bcrypt from 'bcryptjs'

const scene: StepScene = new StepScene(
  'set_global_key',
  async (ctx: IMyContext): Promise<any> => {
    try {
      try {
        await ctx.answer.edit(ctx.i18n?.get('enter_global_key'))
      } catch {
        await ctx.answer.send(ctx.i18n?.get('enter_global_key'))
      }

      return ctx.scene.next()
    } catch (e: any) {
      console.error(e)
    }
  },
  async (ctx: IMyContext): Promise<any> => {
    try {
      const password: string | undefined = ctx.msg.text
      if (!password) return

      const user: UserSchema | null | undefined = ctx.props.user
      if (!user) return

      user.password = await bcrypt.hash(password, 10)
      await user.save()

      try {
        await ctx.answer.delete()
      } catch {}

      await ctx.scene.leave()
      return ctx.answer.send(ctx.i18n?.get('enter_your_global_key'))
    } catch (e: any) {
      console.error(e)
    }
  }
)

export const setGlobalKeyScene = scene