// server.js文件

const express = require('express');
const path = require('path');
const query = require('../db/index');
const movieSchema = require('../models/movieSchema')
const app = express();


// 设置模板引擎
app.set('view engine', 'ejs');
app.set('views', '../views');
// app.engine('html', require('ejs').__express);

// 首页路由
app.get('/', async (req, res) => {
    // 通过SQL查询语句拿到库里的movies表数据
    // const movies = await query('SELECT * FROM movies');

    const movies = await movieSchema.find()
    // console.log(movies);
    // 渲染首页模板并把movies数据传过去
    res.render('index.ejs', { movies });
});
// 监听localhost:3000端口

app.listen(3000, (err) => {
    if (!err) console.log('服务器启动成功了~')
    else console.log(err)
})
