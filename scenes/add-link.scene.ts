import { StepScene } from 'degreet-telegram'
import { IMyContext } from '../core/types'
import { Link, LinkSchema } from '../models/Link'

const scene: StepScene = new StepScene(
  'add_link',
  async (ctx: IMyContext): Promise<any> => {
    try {
      await ctx.answer.send(ctx.i18n?.get('enter_link_name'))
      return ctx.scene.next()
    } catch (e: any) {
      console.error(e)
    }
  },
  async (ctx: IMyContext): Promise<any> => {
    try {
      const linkName: string | undefined = ctx.msg.text
      if (!linkName) return

      await ctx.answer.send(ctx.i18n?.get('enter_link'))
      return ctx.scene.next()
    } catch (e: any) {
      console.error(e)
    }
  },
  async (ctx: IMyContext): Promise<any> => {
    try {
      const data: string[] | void = ctx.scene.data
      if (!data) return

      const link: LinkSchema = new Link({
        userId: ctx.sender?.id,
        linkName: data[0],
        link: data[1],
      })

      await link.save()
      await ctx.scene.leave()

      return ctx.callLayout('link', link._id)
    } catch (e: any) {
      console.error(e)
    }
  }
)

export const addLinkScene = scene