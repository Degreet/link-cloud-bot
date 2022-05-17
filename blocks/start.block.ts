import { Block, Keyboard } from 'degreet-telegram'
import { Link, LinkSchema } from '../models/Link'
import { IMyContext } from '../core/types'
import * as bcrypt from 'bcryptjs'

const block: Block = new Block()

block.command('start', async (ctx: IMyContext): Promise<any> => {
  try {
    const user = ctx.props.user
    if (!user || user.password) return

    let linkShortId: number = +ctx.params[0]
    if (Number.isNaN(linkShortId)) return ctx.callLayout('menu')

    const link: LinkSchema | null | undefined = await Link.findOne({ shortId: linkShortId })
    if (!link) return

    await ctx.answer.send(
      ctx.i18n?.get('link_info', { link: link.link }),
      new Keyboard('under_the_message')
        .btn('cb', ctx.i18n?.get('my_links_btn')!, 'menu').row()
    )
  } catch (e: any) {
    console.error(e)
  }
})

block.on('text', async (ctx: IMyContext): Promise<any> => {
  try {
    const password: string | undefined = ctx.msg.text
    if (!password) return

    const user = ctx.props.user
    if (!user || !user.password) return

    const compare: boolean = await bcrypt.compare(password, user.password)
    if (!compare) return ctx.answer.send(ctx.i18n?.get('incorrect_password_err'))

    return ctx.callLayout('menu')
  } catch (e: any) {
    console.error(e)
  }
})

block.onClick('set_global_key', async (ctx: IMyContext): Promise<any> => {
  try {
    try {
      await ctx.answer.delete()
    } catch {}

    return ctx.scene.enter('set_global_key')
  } catch (e: any) {
    console.error(e)
  }
})

export const startBlock = block