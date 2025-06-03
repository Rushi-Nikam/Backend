const { pool } = require('../Config/db');
const bcrypt = require('bcryptjs');
// const { sendVerificationEmail } = require('../mailer');
// const jwt = require('jsonwebtoken');

const salt = 10;
// const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Ensure you set a secret key in your .env file

// Register
const Registeruser = async (name, mobile_number, email, password) => {
    const sqlCheckEmail = 'SELECT * FROM users WHERE email = ?';
    const sqlCheckMobile = 'SELECT * FROM users WHERE mobile_number = ?';
    const sqlInsertUser = 'INSERT INTO users (name, mobile_number, email, password, is_verified) VALUES (?, ?, ?, ?, ?)';

    return new Promise((resolve, reject) => {
        // Check if the email already exists
        pool.query(sqlCheckEmail, [email], async (err, emailResults) => {
            if (err) return reject(err);

            if (emailResults.length > 0) {
                // Email already exists
                return resolve({ success: false, message: 'Email already registered' });
            }

            // Check if the mobile number already exists
            pool.query(sqlCheckMobile, [mobile_number], async (err, mobileResults) => {
                if (err) return reject(err);

                if (mobileResults.length > 0) {
                    // Mobile number already exists
                    return resolve({ success: false, message: 'Mobile number already registered' });
                }

                // Email and mobile number do not exist, proceed to insert the new user
                try {
                    const hashpassword = await bcrypt.hash(password, salt);
                    // const verificationToken = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1d' }); // Token expires in 1 day
                    // const verificationLink = `http://localhost:8000/users/verify/${verificationToken}`;
                   pool.query(sqlInsertUser, [name, mobile_number, email, hashpassword, false], (err, result) => {
                        if (err) return reject(err);
                        return resolve({ success: true, message: 'User registered successfully. Please verify your email.' });
                    });
                } catch (error) {
                    reject(error);
                }
            });
        });
    });
};

// Find user by email
const findUserByEmail = (email) => {
    const sql = 'SELECT * FROM users WHERE email = ?';
    return new Promise((resolve, reject) => {
        pool.query(sql, [email], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]);
        });
    });
};

// Find user by ID
const findUserById = (userId) => {
    const sql = 'SELECT * FROM users WHERE user_id = ?';
    return new Promise((resolve, reject) => {
        pool.query(sql, [userId], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]);
        });
    });
};

// Get all users
const getAllUsers = () => {
    const sql = 'SELECT * FROM users';
    return new Promise((resolve, reject) => {
        pool.query(sql, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

// Update user
const updateuser = (userId, name, mobile_number, email, password) => {
    const sql = 'UPDATE users SET name = ?, mobile_number = ?, email = ?, password = ? WHERE user_id = ?';
    const hashedPassword = password ? bcrypt.hashSync(password, salt) : undefined;
    return new Promise((resolve, reject) => {
        pool.query(sql, [name, mobile_number, email, hashedPassword, userId], (err, result) => {
            if (err) return reject(err);
            resolve(result.affectedRows);
        });
    });
};

// Delete user
const deleteuser = (userId) => {
    const sql = 'DELETE FROM users WHERE user_id = ?';
    return new Promise((resolve, reject) => {
        pool.query(sql, [userId], (err, result) => {
            if (err) return reject(err);
            resolve(result.affectedRows);
        });
    });
};
module.exports = {
    Registeruser, findUserByEmail, findUserById, getAllUsers, updateuser, deleteuser
};
