const http = require("node:http");
const mongoose = require("mongoose");

const hostname = "127.0.0.1";
const port = 3001;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.setHeader("Access-Control-Allow-Origin", "*");
});
const resdata = {
  htmlData: "<h1>Hello World</h1>",
};

server.on("request", (req, res) => {
  res.end(JSON.stringify(resdata));
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
/**建议使用 127.0.0.1 而不是 localhost。
 * 这是因为 Node.js 18 及更高版本更喜欢 IPv6 地址，
 * 这意味着，在许多计算机上，Node.js 会将 localhost 解析为 IPv6 地址 ::1，
 * 并且 Mongoose 将无法连接，除非 mongodb 实例在启用 ipv6 的情况下运行。 */
mongoose
  .connect("mongodb://127.0.0.1:27017/") //
  .then(() => console.log("数据库连接成功"))
  .catch((err) => console.log("数据库连接失败", err));

// 设定集合规则
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  isPublished: Boolean,
});
// 创建集合并应用规则
const Course = mongoose.model("Course", courseSchema); // courses
// 创建集合实例
const course = new Course({
  name: "Node.js course",
  author: "VanZhang",
  tags: ["node", "backend"],
  isPublished: true,
});
// 将数据保存到数据库中
course.save();
Course.create({ name: "mongoDb", author: "aaaashui", isPublish: true })
  .then((doc) => console.log(doc))
  .catch((err) => console.log(err));

//  根据条件查找文档（条件为空则查找所有文档）
Course.find().then((result) => console.log(result));
