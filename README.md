# Timeline

Personal timeline demo developed with Nuxt3

- [x] nuxt3
- [x] express
- [x] ssr
- [x] database
- [x] ali-oss

### demo

[online demo](https://timeline.demo.jyh.sb/edit){target="_blank"}

### pages

- `/`: timeline preview - [demo/](https://timeline.demo.jyh.sb/){target="_blank"}
- `/edit`: timeline with editor - [demo/edit](https://timeline.demo.jyh.sb/edit){target="_blank"}
- `/0-n`: pagination preview - [demo/0](https://timeline.demo.jyh.sb/0){target="_blank"}
- `/page`: redirect to page route - [demo/page](https://timeline.demo.jyh.sb/page){target="_blank"}

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
PORT=3000 node ./output/server/index.mjs
```
