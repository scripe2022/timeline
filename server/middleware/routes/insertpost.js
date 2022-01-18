import query from '~/database/mysqlQuery.js';
import express from 'express';
import config from '~/config/config';
const router = express.Router();

router.post('/insertpost', async(req, res) => {
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    const params = req.body;

    let columns = '(date, content, links)';
    let insertData = `( ${params.date}, '${params.content}', '${JSON.stringify(params.links)}' )`;
    let sql = `INSERT INTO ${config.mysql.table} ${columns} VALUES ${insertData}`;
    let postRows = await query(sql);

    res.json({code: 200});
});

export default router;