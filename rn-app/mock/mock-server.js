const chokidar = require('chokidar')
const bodyParser = require('body-parser')
const chalk = require('chalk')
const path = require('path')
const Mock = require('mockjs')
const express = require('express');

const mockDir = path.join(process.cwd(), 'mock')

function registerRoutes(app) {
    let mockLastIndex
    const { mocks } = require('./index.js')
    const mocksForServer = mocks.map(route => {
        return responseFake(route.url, route.type, route.response, route.delay)
    })
    for (const mock of mocksForServer) {
        app[mock.type](mock.url, mock.response)
        mockLastIndex = app._router.stack.length
    }
    const mockRoutesLength = Object.keys(mocksForServer).length
    return {
        mockRoutesLength: mockRoutesLength,
        mockStartIndex: mockLastIndex - mockRoutesLength
    }
}

function unregisterRoutes() {
    Object.keys(require.cache).forEach(i => {
        if (i.includes(mockDir)) {
            delete require.cache[require.resolve(i)]
        }
    })
}

// for mock server
const responseFake = (url, type, respond, delayTime = 1000) => {
    return {
        url: new RegExp(`${url}`),
        type: type || 'get',
        response(req, res) {
            console.log('request invoke:' + req.path)
            setTimeout(() => {
                res.json(Mock.mock(respond instanceof Function ? respond(req, res) : respond))
            }, delayTime)
        }
    }
}

function startServer() {
    var app = express();
    // parse app.body
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({
        extended: true
    }))

    const mockRoutes = registerRoutes(app)
    var mockRoutesLength = mockRoutes.mockRoutesLength
    var mockStartIndex = mockRoutes.mockStartIndex

    // watch files, hot reload mock server
    chokidar.watch(mockDir, {
        ignored: /mock-server/,
        ignoreInitial: true
    }).on('all', (event, path) => {
        if (event === 'change' || event === 'add') {
            try {
                // remove mock routes stack
                app._router.stack.splice(mockStartIndex, mockRoutesLength)

                // clear routes cache
                unregisterRoutes()

                const mockRoutes = registerRoutes(app)
                mockRoutesLength = mockRoutes.mockRoutesLength
                mockStartIndex = mockRoutes.mockStartIndex

                console.log(chalk.magentaBright(`\n > Mock Server hot reload success! changed  ${path}`))
            } catch (error) {
                console.log(chalk.redBright(error))
            }
        }
    })
    app.all('*', function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "*");
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", ' 3.2.1')
        res.header("Content-Type", "application/json;charset=utf-8");
        next();
    });
    app.listen(3000);
}

startServer();
