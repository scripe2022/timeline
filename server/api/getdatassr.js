import query from '~/database/mysqlQuery.js';
import config from '~/config/config';

export default async(req, res) => {
    const params = req.body;

    const queryBegin = parseInt(params.from);
    const queryLength = parseInt(params.length);

    let postRows = await query(`SELECT * FROM ${config.mysql.table} ORDER BY id DESC LIMIT ${queryBegin}, ${queryLength}`);
    let ssrArray = [];
    for (let i = 0; i < postRows.length; ++i) {
        ssrArray.push({
            id: postRows[i].id,
            content: postRows[i].content,
            date: postRows[i].date.toString(),
            links: JSON.parse(postRows[i].links),
        });
    }
    return {
        data: ssrArray,
    }
}