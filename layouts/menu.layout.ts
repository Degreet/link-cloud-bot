import { Layout, Keyboard } from 'degreet-telegram'
import { IMyContext } from '../core/types'
import { Link, LinkSchema } from '../models/Link'

export const menuLayout: Layout = new Layout('menu', async (ctx: IMyContext): Promise<any> => {
  try {
    const userId: number | undefined = ctx.sender?.id
    if (!userId) return

    const user = ctx.props.user
    if (!user) return

    const links: LinkSchema[] = await Link.find({ userId })
    let text: string | undefined
    let keyboard: Keyboard

    if (links && links.length) {
      keyboard = new Keyboard('under_the_message')

      links.forEach((link: LinkSchema): void => {
        keyboard.btn('cb', link.linkName, `link_info_${link._id}`)
      })

      text = ctx.i18n?.get('menu_have_links', { count: links.length })
      keyboard.row(2)
      keyboard.btn('cb', ctx.i18n?.get('add_link_btn')!, 'add_link').row()

      if (user.password) {
        keyboard.btn('cb', ctx.i18n?.get('end_session_btn')!, 'end_session').row()
      } else {
        keyboard.btn('cb', ctx.i18n?.get('set_global_key_btn')!, 'set_global_key').row()
      }
    } else {
      text = ctx.i18n?.get('menu_havent_links')
      keyboard = new Keyboard('under_the_message')
        .btn('cb', ctx.i18n?.get('add_link_btn')!, 'add_link').row()
    }

    try {
      await ctx.answer.edit(text, keyboard)
    } catch {
      await ctx.answer.send(text, keyboard)
    }
  } catch (e: any) {
    console.error(e)
  }
})