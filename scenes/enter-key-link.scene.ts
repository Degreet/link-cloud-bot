import { StepScene } from 'degreet-telegram'
import { IMyContext } from '../core/types'
import { Link, LinkSchema } from '../models/Link'
import * as bcrypt from 'bcryptjs'

const scene: StepScene = new StepScene(
  'enter_key_link',
  async (ctx: IMyContext): Promise<any> => {
    try {
      try {
        await ctx.answer.edit(ctx.i18n?.get('enter_link_key'))
      } catch {
        await ctx.answer.send(ctx.i18n?.get('enter_link_key'))
      }

      return ctx.scene.next()
    } catch (e: any) {
      console.error(e)
    }
  },
  async (ctx: IMyContext): Promise<any> => {
    try {
      const password: string | undefined = ctx.msg.text
      if (!password) return ctx.scene.leave()

      const linkId: string | undefined = ctx.scene.params
      if (!linkId) return ctx.scene.leave()

      const link: LinkSchema | null | undefined = await Link.findOne({ _id: linkId })
      if (!link || !link.password) return ctx.scene.leave()

      const compare: boolean = await bcrypt.compare(password, link.password)
      await ctx.scene.leave()

      try {
        await ctx.answer.delete()
      } catch (e: any) {}

      if (compare) {
        return ctx.callLayout('link', linkId)
      } else {
        await ctx.answer.send(ctx.i18n?.get('incorrect_password_err'))
        return ctx.callLayout('menu')
      }
    } catch (e: any) {
      console.error(e)
    }
  }
)

export const enterKeyLink = scene