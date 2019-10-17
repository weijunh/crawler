// read.js文件

// request-promise是让request支持了promise的语法，可以说是request的小弟
const rp = require('request-promise');
// 将抓取页面的html代码转为DOM，可以称之为是node版的jq
const cheerio = require('cheerio');
// 这个是为了在调试时查看日志
const debug = require('debug')('movie:read');

// 读取页面的方法，重点来了
const read = async (url) => {
    debug('开始读取最近上映的电影');

    const opts = {
        url,    // 目标页面
        transform: body => {
            // body为目标页面抓取到的html代码
            // 通过cheerio.load方法可以把html代码转换成可以操作的DOM结构
            return cheerio.load(body);
        }
    };

    return rp(opts).then($ => {
        let result = [];    // 结果数组
        // 遍历这些热映电影的li
        $('#screening li.ui-slide-item').each((index, item) => {
            let ele = $(item);
            let name = ele.data('title');
            let score = ele.data('rate') || '暂无评分';
            let href = ele.find('.poster a').attr('href');
            let image = ele.find('img').attr('src');
            // 影片id可以从影片href中获取到
            let id = href && href.match(/(\d+)/)[1];
            // 为了防止豆瓣防盗链导致裂图，换成webp格式加载图片
            image = image && image.replace(/jpg$/, 'webp');

            if (!name || !image || !href) {
                return;
            }

            result.push({
                name,
                score,
                href,
                image,
                id
            });
            debug(`正在读取电影：${name}`);
        });
        // 返回结果数组
        return result;
    });
};
console.log('导出read');
// 导出方法
module.exports = read;


