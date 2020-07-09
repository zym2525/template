var express = require('express');
var bodyParser = require("body-parser");
var app = express();
let apiRoutes = express.Router()
var courseData = require('./course')

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

// 启动mock
Mock(apiRoutes)
app.use(bodyParser.json())
app.use('/api', apiRoutes)

app.listen(3000);


function Mock(app) {
    app.get('/getList', function (req, res) {
        res.json({
            status: 200,
            message: '数据请求成功，请查看data字段',
            data: {
                list: [1, 2, 3, 4, 5],
            }
        })
    })
    app.post('/LiveCourse/ApiGetLiveCourseList', function (req, res) {
        var list = [];
        var TotalCount = 11;
        var PageSize = req.body.PageSize;
        var PageIndex = req.body.PageIndex;
        var length = PageSize * PageIndex < TotalCount ? PageSize : PageSize - (PageSize * PageIndex - TotalCount)
        for (let i = 0; i < length; i++) {
            list.push(courseData.list[(PageSize * (PageIndex - 1) + i) % 7])
        }
        res.json({
            status: 200,
            result: {
                "PageSize": PageSize,
                "PageIndex": PageIndex,
                "TotalCount": TotalCount,
                "List": list
            }
        })
    })
}
