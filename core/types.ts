import { IContext } from 'degreet-telegram/src/types'
import { UserSchema } from '../models/User'

export interface IProps {
  user?: UserSchema
}

export interface IMyContext extends IContext {
  props: IProps
}