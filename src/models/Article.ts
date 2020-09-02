import * as mysql from '../services/mysql'

export interface ICreateArticle {
    title: string,
    content: string,
    publisher_id: number,
    topic_id: number,
    tags?: string
}

export const CreateArticle = async ({ title, content, publisher_id, topic_id, tags = undefined}: ICreateArticle) => {
    return await mysql.query(`
        insert into articles (title, content, tags, publisher_id, topic_id)
        values (?, ?, ?, ?, ?)
    `, [title, content, tags, publisher_id, topic_id])
}

export const GetArticle = async (article_id: number) => {
    return await mysql.query(`
        SELECT * FROM articles
        WHERE id = ?
    `, [article_id])
}