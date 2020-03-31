const _ = require('koa-route');
const Koa = require('koa');
const app = new Koa();


app.use(_.get('/hello', (ctx) => {
  ctx.body = "Hello world!"
}));

app.listen(3000);
