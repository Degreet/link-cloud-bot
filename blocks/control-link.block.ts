import { Block } from 'degreet-telegram'
import { IMyContext } from '../core/types'
import { Link, LinkSchema } from '../models/Link'

const block: Block = new Block()

block.onClick(/link_key_(.*)/, async (ctx: IMyContext): Promise<any> => {
  try {
    let linkId: string = ctx.matchParams[1]
    if (!linkId) return

    linkId = linkId.replace('key_', '')

    const link: LinkSchema | null | undefined = await Link.findOne({ _id: linkId })
    if (!link) return

    ctx.session.linkId = linkId
    return ctx.scene.enter('add_key_link')
  } catch (e: any) {
    console.error(e)
  }
})

block.onClick(/link_info_(.*)/, async (ctx: IMyContext): Promise<any> => {
  try {
    let linkId: string = ctx.matchParams[1]
    if (!linkId) return

    const link: LinkSchema | null | undefined = await Link.findOne({ _id: linkId })
    if (!link) return

    if (link.password) {
      ctx.session.linkId = linkId
      return ctx.scene.enter('enter_key_link')
    } else {
      return ctx.callLayout('link', linkId)
    }
  } catch (e: any) {
    console.error(e)
  }
})

export const controlLinkBlock = block