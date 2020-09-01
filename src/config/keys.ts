import { DEV } from './dev'
import { PROD } from './prod'
import { config } from 'dotenv'

interface IKeys {
    host?: string,
    user?: string,
    password?: string,
    database?: string
    secret_key: string
}

config()

let KEYS: IKeys

if (process.env.NODE_ENV === 'development') {
    KEYS = DEV
} else {
    KEYS = PROD
}

export default KEYS