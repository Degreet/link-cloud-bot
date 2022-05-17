import { Block, Keyboard } from 'degreet-telegram'
import { IMyContext } from '../core/types'
import { Link, LinkSchema } from '../models/Link'

const block: Block = new Block()

block.command('start', async (ctx: IMyContext): Promise<any> => {
  try {
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

export const startBlock = block