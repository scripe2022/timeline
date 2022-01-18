import query from '~/database/mysqlQuery.js';
import express from 'express';
import config from '~/config/config';
const router = express.Router();

router.get('/getpost', async(req, res) => {
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    
    const params = req.query;

    const queryBegin = parseInt(params.from);
    const queryLength = parseInt(params.length);

    let postRows = await query(`SELECT * FROM ${config.mysql.table} ORDER BY id DESC LIMIT ${queryBegin}, ${queryLength}`);
    let dataArray = [];
    for (let i = 0; i < postRows.length; ++i) {
        dataArray.push({
            id: postRows[i].id,
            content: postRows[i].content,
            date: postRows[i].date.toString(),
            links: JSON.parse(postRows[i].links),
        });
    }
    res.json({
        code: 200,
        posts: dataArray,
    });
});

export default router;