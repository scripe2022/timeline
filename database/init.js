var config = require('~/config/config.js');
var mysql = require('mysql');
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
