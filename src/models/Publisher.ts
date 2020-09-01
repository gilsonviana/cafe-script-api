import * as mysql from '../services/mysql'
import bcrypt from 'bcrypt'

export interface IPublisher {
    name: string,
    email: string,
    topic_primary_id: number,
    topic_secondary_id?: number
}

export interface IUpdateIsApproved {
    publisherId: number, 
    isApproved: boolean
}

/**
 * Save info into database for a potential publisher
 */
export const RegisterWaitList = async (publisher: IPublisher) => {
    const { name, email, topic_primary_id, topic_secondary_id = null } = publisher

    return await mysql.query(`
        INSERT INTO publishers (name, email, topic_primary_id, topic_secondary_id)
        VALUES (?, ?, ?, ?)
    `, [name, email, topic_primary_id, topic_secondary_id])
}

export const UpdateIsApproved = async ({ publisherId, isApproved }: IUpdateIsApproved) => {
    return await mysql.query(`
        update publishers
        set is_approved = ?
        where id = ?;
    `, [isApproved, publisherId])
}

// export const getByEmail = async (email: string): Promise<any> => {
//     return await mysql.query('SELECT * FROM usuario WHERE email = ? LIMIT 1;', [email])
// }

// export const saveUsuario = async (usuario: IPublisher): Promise<any> => {
//     return await mysql.query(`
//         INSERT INTO usuario (uuid, nome, sobrenome, email, senha, cpf_cnpj, telefone, cep, estado, cidade, rg, codigo_indicacao, pais, origem, tipo) VALUES
//         (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Brasil', 'APP', 'ESPECTADOR');
//     `, [...Object.values(usuario)])
// }

// export const encryptPassword = async (password: string): Promise<string> => {
//     const salt = await bcrypt.genSalt(10)
//     const hash = await bcrypt.hash(password, salt)

//     return hash
// }

// export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
//     return bcrypt.compare(password, hash)
// }