// var config = require('../config/config.js');
var mysql = require('mysql');

const config = {
    "mysql": {
        "host": "rm-uf619jbd60010s6n9qo.mysql.rds.aliyuncs.com",
        "user": "timeline_user",
        "password": "Scripter20",
        "database": "timeline",
        "charset" : "utf8mb4",
        "table": "posts_demo"
    }
}
var connection = mysql.createConnection(config.mysql);

connection.connect();

let columns = '(date, content, links)';
let date = Math.floor((new Date().valueOf()) / 1000);
let links = [
    'https://kyeremal-shanghai.oss-cn-shanghai.aliyuncs.com/timeline/images/2022/1/23641c8496d101499d5aeda547bd5589.jpg',
];

for (let i = 0; i < 200; ++i) {
    let content = i.toString();
    let insertData = `( ${date}, '${content}', '${JSON.stringify(links)}' )`;
    let sql = `INSERT INTO posts_demo ${columns} VALUES ${insertData}`;
    connection.query(sql, function (error, results) {
        if (error) throw error;
        console.log(`${i}th record inserted`);
    });
}

connection.end();
