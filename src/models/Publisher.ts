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

export const VerifyIsApproved = async (publisher_id: number) => {
    return await mysql.query(`
        SELECT p.is_approved
        FROM publishers AS p
        WHERE id = ?
    `, [publisher_id])
}

export const UpdateIsApproved = async ({ publisherId, isApproved }: IUpdateIsApproved) => {
    return await mysql.query(`
        update publishers
        set is_approved = ?
        where id = ?;
    `, [isApproved, publisherId])
}

export const UpdateLastActivity = async (publisherId: number) => {
    return await mysql.query(`
        update publishers
        set last_activity = ?
        where id = ?
    `, [new Date(), publisherId])
}