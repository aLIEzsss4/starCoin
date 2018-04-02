## 前端
* 使用react构建
* 前端请求使用fetch
* 前端ui使用fabric
## 后端
* 解析fetchbody使用koa-parse
* 跨域使用koa-cors
* 后端请求使用superagent
* 后端数据库使用mongoose

## 全局
* 统一使用date-fn来做时间处理
* 使用lodash来做数据处理
* 独立mongodb各种schema,统一抽离到mongodb.js
## 产品逻辑
* coinmarketData 前端呈现当前进入资金量，15分，2小时，6小时，一天。
后端通过coinmarketapirestapi获取数据。2018.4.1.
监控流入资金量，占所有资金量的百分比。数据库逻辑：一天24小时，一共1440分钟，每十五分钟取一条，一共取288条，为了保险加一条。

## 18.4.01晚22.39 C:\Users\Josex\Desktop\starCoin\my-app\src\content\index.js 文件中this绑定问题，need keep in mind
## 巨坑，一定分清koa-router和koa-route。koa-router会莫名其妙多出一个类型为text/plain的请求。
## C:\Users\Josex\Desktop\starCoin\my-app\route\coinmarketData\getCoinMarketData.js 文件中promise的resolve和reject的顺序不能颠倒，否则报错。