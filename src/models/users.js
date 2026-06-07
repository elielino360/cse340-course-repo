import db from './db.js';
import bcrypt from 'bcrypt';

const createUser = async (name, email, password_hash) => {
    const query = `
        INSERT INTO users (name, email, password_hash)
        VALUES ($1, $2, $3)
        RETURNING user_id;  
    `;  
    const queryParams = [name, email, password_hash];
    const result = await db.query(query, queryParams);
    if (result.rows.length === 0) {
        throw new Error('Failed to create user');
    }
    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new user with ID:', result.rows[0].user_id);
    }
    return result.rows[0].user_id;
};

const findUserByEmail = async (email) => {
    const query = `
    SELECT u.user_id, u.email, u.password_hash, r.role_name 
    FROM users u
    JOIN roles r ON u.role_id = r.role_id
    WHERE u.email = $1
`;
    const queryParams = [email];
    
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        return null; // User not found
    }
    
    return result.rows[0];
};

const verifyPassword = async (password, passwordHash) => {
    return bcrypt.compare(password, passwordHash);
};

const authenticateUser = async (email, password) => {

    // Find the user by email
    const user = await findUserByEmail(email);

    // If user does not exist
    if (!user) {
        return null;
    }

    // Verify password
    const isValidPassword = await verifyPassword(
        password,
        user.password_hash
    );

    // If password is incorrect
    if (!isValidPassword) {
        return null;
    }

    // Remove password hash before returning
    delete user.password_hash;

    // Return authenticated user
    return user;
};

const getAllUsersWithRoles = async () => {

    const query = `
        SELECT
            users.name,
            users.email,
            roles.role_name
        FROM users
        JOIN roles
            ON users.role_id = roles.role_id;
    `;

    const result = await db.query(query);

    return result.rows;
};

export { createUser, authenticateUser,getAllUsersWithRoles };