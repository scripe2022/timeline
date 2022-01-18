import express from 'express';
const router = express.Router();
import config from '~/config/config.js';

import oss from 'ali-oss';
const { STS } = oss;

router.get('/gettoken', async(req, res) => {
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    
    const ip = "timeline";

    let sts = new STS({
        accessKeyId: config.oss.accessKeyId,
        accessKeySecret: config.oss.accessKeySecret, 
    });
    sts.assumeRole(config.oss.arn, '', 900, ip)
        .then((result) => {
            res.set('Access-Control-Allow-Origin', '*');
            res.set('Access-Control-Allow-METHOD', 'GET');
            res.json({
                AccessKeyId: result.credentials.AccessKeyId,
                AccessKeySecret: result.credentials.AccessKeySecret,
                SecurityToken: result.credentials.SecurityToken,
                Expiration: result.credentials.Expiration
            });
        }).catch((error) => {
            console.log(error);
            res.status(400).json(error.message);
        })
});

export default router;