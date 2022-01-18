const config = {
    "mysql": {
        "host": "rm-uf619jbd60010s6n9qo.mysql.rds.aliyuncs.com",
        "user": "timeline_user",
        "password": "Scripter20",
        "database": "timeline",
        "charset" : "utf8mb4"
    },
}
var mysql = require('mysql');
var connection = mysql.createConnection(config.mysql);

connection.connect();

let columns = '(date, content, links)';
let date = Math.floor((new Date().valueOf()) / 1000);
let links = [
    '/_nuxt/assets/images/test1.jpg',
    '/_nuxt/assets/images/test2.jpg',
];

for (let i = 0; i < 200; ++i) {
    if (i == 199) {
        links = [
            '/_nuxt/assets/images/test1.jpg',
            '/_nuxt/assets/images/test2.jpg',
            '/_nuxt/assets/images/test1.jpg',
            '/_nuxt/assets/images/test2.jpg',
            '/_nuxt/assets/images/test1.jpg',
            '/_nuxt/assets/images/test2.jpg',
            '/_nuxt/assets/images/test1.jpg',
            '/_nuxt/assets/images/test2.jpg',
            '/_nuxt/assets/images/test1.jpg',
            '/_nuxt/assets/images/test2.jpg',
            '/_nuxt/assets/images/test1.jpg',
            '/_nuxt/assets/images/test2.jpg',
            '/_nuxt/assets/images/test1.jpg',
            '/_nuxt/assets/images/test2.jpg',
        ]
    }
    let content = i.toString();
    let insertData = `( ${date}, '${content}', '${JSON.stringify(links)}' )`;
    let sql = `INSERT INTO posts ${columns} VALUES ${insertData}`;
    connection.query(sql, function (error, results) {
        if (error) throw error;
        console.log(`${i}th record inserted`);
    });
}

connection.end();
