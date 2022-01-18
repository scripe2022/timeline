# Timeline

Personal timeline demo developed with Nuxt3

- [x] nuxt3
- [x] express
- [x] ssr
- [x] database
- [x] ali-oss

### demo

<a href="https://timeline.demo.jyh.sb/edit" target="_blank">online demo</a>

### pages

- `/`: timeline preview - <a href="https://timeline.demo.jyh.sb/" target="_blank">demo/</a>
- `/edit`: timeline with editor - <a href="https://timeline.demo.jyh.sb/edit" target="_blank">demo/edit</a>
- `/0-n`: pagination preview - <a href="https://timeline.demo.jyh.sb/0" target="_blank">demo/0</a>
- `/page`: redirect to page route - <a href="https://timeline.demo.jyh.sb/page" target="_blank">demo/page</a>

### Installation

```shell
git clone https://github.com/scripe2022/timeline.git
cd timeline
npm install
```

Edit the database and oss info in `config/configDemo.json`, or create a new json and import it in `config/config.js`

```json
{
    "mysql": {
    	"host": "<mysql-host>",
    	"user": "<mysql-username>",
    	"password": "<mysql-password>",
    	"database": "<mysql-database>",
    	"charset" : "utf8mb4",
    	"table": "<mysql-table>"
	},
    "oss": {
    	"region": "<oss-region>",
    	"accessKeyId": "<oss-accessKeyId>",
    	"accessKeySecret": "<oss-accessKeySecret>",
    	"bucket": "<oss-bucket>",
    	"arn": "<oss-arn>"
    },
    "baseurl": "http://127.0.0.1:3000",
    "bucketPrefix": "<oss-bucket-prefix>"
}
```

#### run

```shell
npm run dev
```

#### build

```shell
npm run build
PORT=3000 node .output/server/index.mjs
```
