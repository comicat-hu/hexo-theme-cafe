var path = require('path');
var fs = require('fs');
var filePath = path.join(__dirname, '../source/js/');

function dateFormat(dateString) {
    var date = new Date(dateString);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = month < 10 ? '0' + month : month;
    var day = date.getDate();
    day = day < 10 ? '0' + day : day;

    return year + '.' + month + '.' + day;
}
/**
 * 生成随机文章
 */
hexo.extend.generator.register('random_post', function (locals) {
    var posts = locals.posts;
    var SitePosts = [];
    posts.each(function (item) {
        // console.log(item.excerpt);
        SitePosts.push({
            title: item.title,
            date: dateFormat(item.date),
            uri: item.path,
            excerpt: getExcerpt(item.excerpt)
        });
    });
    var postsJson = JSON.stringify(SitePosts);
    fs.writeFile(filePath + 'posts.js', postsJson, function (err) {
        if (err) {
            console.error(err);
            console.log('random_post failed！');
        }
    });

    return {
        path: 'js/posts.js',
        data: postsJson
    };
});
function getExcerpt(excerpt) {
    /*    excerpt = excerpt.replace(/<h2 /g, '').replace(/<\/h2>/g, '')
            .replace(/<img/g, '').replace(/<\/img>/g, '')
        return excerpt.substring(0, 80);*/
    return "";
}
hexo.on('generateBefore', function (locals) {
})
hexo.on('generateAfter', function (locals) {
})
