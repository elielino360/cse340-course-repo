import db from './db.js';


const getAllCategories = async () => {

    const query = `
        SELECT
            category_id,
            cat_name
        FROM categories;
    `;

    const result = await db.query(query);

    return result.rows;
};



const getCategoryById = async (categoryId) => {

    const query = `
        SELECT
            category_id,
            cat_name
        FROM categories
        WHERE category_id = $1;
    `;

    const queryParams = [categoryId];

    const result = await db.query(query, queryParams);

    return result.rows.length > 0 ? result.rows[0] : null;
};

const getCategoriesByProjectId = async (projectId) => {

    const query = `
        SELECT
            categories.category_id,
            categories.cat_name
        FROM project_categories

        JOIN categories
            ON categories.category_id = project_categories.category_id

        WHERE project_categories.project_id = $1;
    `;

    const queryParams = [projectId];

    const result = await db.query(query, queryParams);

    return result.rows;
};

const getProjectsByCategoryId = async (categoryId) => {

    const query = `
        SELECT
            project.project_id,
            project.title,
            project.description,
            project.location,
            project.date,
            project.organization_id
        FROM project_categories

        JOIN project
            ON project.project_id = project_categories.project_id

        WHERE project_categories.category_id = $1

        ORDER BY project.date;
    `;

    const queryParams = [categoryId];

    const result = await db.query(query, queryParams);

    return result.rows;
};

export {
    getAllCategories,
    getCategoryById,
    getCategoriesByProjectId,
    getProjectsByCategoryId
};