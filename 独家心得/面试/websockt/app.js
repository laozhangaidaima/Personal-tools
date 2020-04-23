var ws = require("nodejs-websocket");
var server = ws
  .createServer(function (conn) {
    //conn 传过来的对象

    conn.on("text", function (str) {
      //on 客户端发消息 服务端就会触发这个事件
      //conn.sendText(str + "123321"); //sendText 给客户端发信息
      boardcast(str);
    });

    conn.on("error", function (error) {
      //on 客户端发消息 服务端就会触发这个事件
      console.log(error); //不处理error 就会抛出到调试面板
    });
  })
  .listen(2333);

function boardcast(str) {//分发给每一个人
  server.connections.forEach(function (conn) {
    //server.connections 每一个链接的人 都给他发一次
    conn.sendText(str);
  });
}
