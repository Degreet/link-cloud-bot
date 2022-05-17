import { DegreetTelegram, I18n, Keyboard, Layout, Session } from 'degreet-telegram'
import { IMyContext, ISession } from './core/types'

import config from 'config'
import * as db from './core/db'
import path from 'path'

import { authMiddleware } from './middlewares/auth.middleware'
import { menuLayout } from './layouts/menu.layout'
import { addLinkScene } from './scenes/add-link.scene'
import { addLinkBlock } from './blocks/add-link.block'
import { linkLayout } from './layouts/link.layout'
import { addKeyLinkScene } from './scenes/add-key-link.scene'
import { controlLinkBlock } from './blocks/control-link.block'
import { enterKeyLink } from './scenes/enter-key-link.scene'

const token: string = config.get<string>('botToken')
const bot: DegreetTelegram<IMyContext> = new DegreetTelegram<IMyContext>(token)

void (async (): Promise<any> => {
  // connect db
  await db.connect()

  // init i18n
  const i18n: I18n = new I18n(
    path.resolve(__dirname, 'locales'),
    ['en']
  )

  // setup middlewares
  bot.use(authMiddleware)
  bot.use(i18n.middleware())

  // setup session
  bot.use(new Session<ISession>().middleware())

  // setup keyboard layouts
  new Keyboard('under_the_message', true)
    .btn('cb', 'menu_btn', 'menu').row()
    .saveLayout('menu_btn')

  // setup menu callers
  bot.command('start', Layout.layoutCaller('menu'))
  bot.onClick('menu', Layout.layoutCaller('menu'))

  // setup layouts and blocks
  bot.use(menuLayout)
  bot.use(linkLayout)
  bot.use(addLinkScene)
  bot.use(addLinkBlock)
  bot.use(enterKeyLink)
  bot.use(addKeyLinkScene)
  bot.use(controlLinkBlock)
})()

bot.start().then((username: string): void => {
  console.log(`Started on @${username}`)
})