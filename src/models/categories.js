import db from './db.js';

const getAllCategories = async () => {

    const query = `
        SELECT cat_name
        FROM categories;
    `;

    const result = await db.query(query);

    return result.rows;
};

export { getAllCategories };