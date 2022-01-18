var mysql = require('mysql');

var config = require('~/config/config.js');
const pool = mysql.createPool(config.mysql);

let query = function( sql, values ) {
    return new Promise( (resolve, reject) => {
        pool.getConnection(function(error, connection) {
            if (error) reject(error)
            else {
                connection.query(sql, values, ( error, rows ) => {
                    if (error) reject(error)
                    else resolve(rows);
                    connection.release();
                })
            }
        })
    })
}

module.exports = query;