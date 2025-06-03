const { pool } = require("../Config/db");

const contactus = (name, email, mobile_number, message) => {
    const sql = 'INSERT INTO contactus (name, email, mobile_number, message) VALUES (?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
        pool.query(sql, [name, email, mobile_number, message], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

module.exports = contactus;
