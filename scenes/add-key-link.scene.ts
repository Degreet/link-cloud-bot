import { StepScene } from 'degreet-telegram'
import { IMyContext } from '../core/types'
import { Link, LinkSchema } from '../models/Link'
import * as bcrypt from 'bcryptjs'

const scene: StepScene = new StepScene(
  'add_key_link',
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
      const linkPassword: string | undefined = ctx.msg.text
      if (!linkPassword) return ctx.scene.leave()

      const linkId: string | undefined = ctx.session.linkId
      if (!linkId) return ctx.scene.leave()

      const link: LinkSchema | null | undefined = await Link.findOne({ _id: linkId })
      if (!link) return ctx.scene.leave()

      link.password = await bcrypt.hash(linkPassword, 10)
      await link.save()

      await ctx.scene.leave()
      return ctx.callLayout('menu')
    } catch (e: any) {
      console.error(e)
    }
  }
)

export const addKeyLinkScene = scene