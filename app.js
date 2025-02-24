const users = require("./mock/users");
const posts = require("./mock/posts");
const events = require("./mock/events");
const resources = require("./mock/resources");

// 初始化数据
app.locals.users = users;
app.locals.posts = posts;
app.locals.events = events;
app.locals.resources = resources;
