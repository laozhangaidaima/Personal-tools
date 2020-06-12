// hostry模式必须这样配置后台

const http = require('http')
const fs = require('fs')
const httpPort = 8080

http.createServer((req, res) => {
    fs.readFile('vue-router玩耍.html', 'utf-8', (err, content) => {//vue-router玩耍.html 文件名
        if (err) {
            console.log('We cannot open "index.htm" file.')
        }

        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8'
        })

        res.end(content)
    })
}).listen(httpPort, () => {
    console.log('Server listening on: http://localhost:%s', httpPort)
})
// 路径正确下
// 启动 npm vue-routerHostory模式.js  