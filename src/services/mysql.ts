import mysql, { Connection } from 'mysql'
import keys from '../config/keys'

const _createConnection = (): Connection => {
    const { host, user, password, database } = keys

    const connection: Connection = mysql.createConnection({
        host, user, password, database,
        connectTimeout: 1000000,
    })

    return connection
}

export const query = async (statement: string, params?: Array<any>): Promise<Array<any>> => {
    return new Promise((res, rej) => {
        const connection = _createConnection()

        connection.connect()
        connection.query(statement, params, (error, results) => {
            if (error) {
                rej(error)
                return
            }
            res(results)
            connection.end()
        })
    })
}