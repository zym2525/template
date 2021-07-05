
const Mock = require('mockjs')
const { ajaxResponse } = require('./utils')

module.exports = [
    // user login
    {
        url: '/api/login',
        type: 'post',
        response: config => {
            return ajaxResponse(Mock.mock({
                "data": {
                    "accessToken|16": /[a-z][A-Z]/,
                    "username": '你好啊',
                    "userId": 1,
                    "avatar": 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
                },
            }))
        },
    },
    {
        url: '/api/Account/authenticate',
        type: 'post',
        response: config => {
            return ajaxResponse(Mock.mock({
                'items|3': [{
                    id: '@id',
                    title: '@sentence(10, 20)',
                    'status|1': ['published', 'draft', 'deleted'],
                    author: 'name',
                    display_time: '@datetime',
                    pageviews: '@integer(300, 5000)'
                }]
            }))
        }
    },
    {
        url: '/api/getInfo',
        type: 'get',
        response: config => {
            return ajaxResponse({
                data: Mock.mock({
                    'items|10': [{
                        id: '@id',
                        title: '@sentence(10, 20)',
                        'status|1': ['published', 'draft', 'deleted'],
                        author: 'name',
                        display_time: '@datetime',
                        pageviews: '@integer(300, 5000)'
                    }]
                })
            })
        }
    },
]