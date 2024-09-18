import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
}).promise()

// QUERY ITEMS

export async function getItems() {

    const result = await pool.query("SELECT * FROM items")
    return result[0];
}

export async function getItem(id) {
    const result = await pool.query(`
        SELECT *
        FROM items
        WHERE id = ?
        `, [id])

    const rows = result[0]
    return rows
}

export async function searchItem(word) {
    const result = await pool.query(`
        SELECT 'categories' AS type, id AS identifier, name AS name
        FROM categories
        WHERE name LIKE CONCAT('%', ? , '%')

        UNION ALL

        SELECT 'items' AS type, id AS identifier, name AS name
        FROM items
        WHERE name LIKE CONCAT('%', ? , '%');
        `, [word, word])

    const rows = result[0]
    return rows
}


export async function createItem(name, category_id){
    const result = await pool.query(`
        INSERT INTO items (name, category_id)
        VALUES (?, ?)
        ON DUPLICATE KEY UPDATE name= VALUES(name), category_id= VALUES(category_id)
        `, [name, category_id])
    const id = result.insertId // increments ID
    return getItems(id)
}

// QUERY CATEGORIES

export async function getCategories() {
    const result = await pool.query("SELECT * FROM categories")
    return result;
}

export async function getCategory(id) {
    const result = await pool.query(`
        SELECT *
        FROM categories
        WHERE id = ?
        `, [id])

    const rows = result[0]
    return rows
}

export async function getCategoryItem(category_id) {
    const result = await pool.query(`
        SELECT *
        FROM items
        WHERE category_id = ?
        `, [category_id])

    const rows = result[0]
    return rows
}

export async function createCategory(name){
    const result = await pool.query(`
        INSERT INTO categories (name)
        VALUES (?)
        `, [name])
    const id = result.insertId // increments ID
    return getCategories(id)
}

// QUERY VOLUME

export async function getVolume(item_id) {
    const result = await pool.query(`
        SELECT *
        FROM item_volumes
        WHERE item_id = ?
        `, [item_id])

    const rows = result[0]
    return rows
}

// const result = await createItem('Harry Potter 2', 3)
// console.log(result)

//const items = await getItems(12)
//console.log(items)

//const categories = await getCategories(1)
