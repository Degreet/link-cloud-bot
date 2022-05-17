import { Layout, Keyboard } from 'degreet-telegram'
import { IMyContext } from '../core/types'
import { Link, LinkSchema } from '../models/Link'

export const linkLayout: Layout = new Layout('link', async (ctx: IMyContext, _id: string): Promise<any> => {
  try {
    const userId: number | undefined = ctx.sender?.id
    if (!userId) return

    const link: LinkSchema | null | undefined = await Link.findOne({ _id })
    if (!link) return

    const text: string | undefined = ctx.i18n?.get('link_info', { link: link.link })
    const keyboard: Keyboard = new Keyboard('under_the_message')
      .btn('cb', ctx.i18n?.get('set_password_btn')!, `link_key_${_id}`).row()
      .btn('cb', ctx.i18n?.get('share_link_btn')!, `link_share_${_id}`).row()
      .useLayout('menu_btn')

    try {
      await ctx.answer.edit(text, keyboard)
    } catch (e: any) {
      await ctx.answer.send(text, keyboard)
    }
  } catch (e: any) {
    console.error(e)
  }
})