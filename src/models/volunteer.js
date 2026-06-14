import db from './db.js';

const addVolunteer = async (userId, projectId) => {
    
    const query = 'INSERT INTO volunteers(user_id, project_id) VALUES ($1, $2)';

    const queryParams = [userId, projectId];     

    await db.query(query, queryParams);
    
}

const removeVolunteer = async (userId, projectId) => {
    
    const query = 'DELETE FROM volunteers WHERE user_id = $1 AND project_id = $2';

    const queryParams = [userId, projectId];

    await db.query(query, queryParams);
}

const getVolunteerProjects = async (userId) => {
    const query = `
        SELECT project.project_id,
          project.title,
          project.description,
          project.location,
          project.date
         FROM volunteers
        JOIN project
            ON volunteers.project_id = project.project_id
        WHERE volunteers.user_id = $1
        ORDER BY project.date;
    `;

    const queryParams = [userId];

    const result = await db.query(query, queryParams);
    return result.rows;
};

export {addVolunteer, removeVolunteer, getVolunteerProjects};