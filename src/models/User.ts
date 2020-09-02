import * as mysql from '../services/mysql'
import bcrypt from 'bcrypt'

export interface ISignUp {
    email: string,
    password: string
    publisher_id: number,
}

export const SignUp = async ({ email, password, publisher_id }: ISignUp) => {
    return await mysql.query(`
        INSERT INTO users (email, password, publisher_id)
        VALUES (?, ?, ?)
    `, [email, password, publisher_id])
}

export const GetByEmail = async (email: string): Promise<any> => {
    return await mysql.query(`
        SELECT * FROM users 
        WHERE email = ? LIMIT 1;
    `, [email])
}

export const ComparePassword = async (password: string, hash: string): Promise<boolean> => {
    return bcrypt.compare(password, hash)
}

export const EncryptPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    return hash
}