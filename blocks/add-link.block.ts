import { Block, I18n } from 'degreet-telegram'
import { IMyContext } from '../core/types'

const block: Block = new Block()

block.on('text', I18n.listen('add_link_btn'), async (ctx: IMyContext): Promise<any> => {
  try {
    return ctx.scene.enter('add_link')
  } catch (e: any) {
    console.error(e)
  }
})

export const addLinkBlock = block