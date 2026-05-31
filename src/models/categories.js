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

const assignCategoryToProject = async(categoryId, projectId) => {
    const query = `
        INSERT INTO project_categories (category_id, project_id)
        VALUES ($1, $2);
    `;

    await db.query(query, [categoryId, projectId]);
}

const updateCategoryAssignments = async(projectId, categoryIds) => {
    // First, remove existing category assignments for the project
    const deleteQuery = `
        DELETE FROM project_categories
        WHERE project_id = $1;
    `;
    await db.query(deleteQuery, [projectId]);

    // Next, add the new category assignments
    for (const categoryId of categoryIds) {
        await assignCategoryToProject(categoryId, projectId);
    }
}


const createCategory = async (catName) => {

    const query = `
        INSERT INTO categories (cat_name)
        VALUES ($1)
        RETURNING category_id;
    `;

    const queryParams = [catName];

    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Failed to create category');
    }

    return result.rows[0].category_id;
};


const updateCategory = async (
    categoryId,
    catName
) => {

    const query = `
        UPDATE categories
        SET cat_name = $1
        WHERE category_id = $2
        RETURNING category_id;
    `;

    const queryParams = [
        catName,
        categoryId
    ];

    const result = await db.query(
        query,
        queryParams
    );

    if (result.rows.length === 0) {
        throw new Error(
            'Failed to update category'
        );
    }

    return result.rows[0].category_id;
};



export {
    getAllCategories,
    getCategoryById,
    getCategoriesByProjectId,
    getProjectsByCategoryId,
    updateCategoryAssignments,
    createCategory,
    updateCategory
};
