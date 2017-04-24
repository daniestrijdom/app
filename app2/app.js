// middleware file?

var Koa = require('koa')
var Router = require('koa-router')
var Pug = require('koa-pug')

var app = new Koa()
var router = new Router()
var pug = new Pug({
  basedir: './views',
  viewPath: './views',
  app: app
})

//
var mod1 = require('./module1')
router.get('/index', async function(ctx){
  ctx.render('index', {teams: mod1.teams})
})


// going to do the FORMS part of the tutorial here.
var bodyParser = require('koa-body')

app.use(bodyParser({
  formidable:{unploadDir:'./uploads'},
  multipart: true,
  urlencoded: true
}))

router.get('/form', async function renderForm(ctx) {
  ctx.render('form')
})
router.post('/form', async function handleForm(ctx) {
  ctx.body = ctx.request.body

})


// routes, port and listen - keeping this at the end
app.use(router.routes())
var port = process.argv[2]
app.listen(port, function() {
  console.log(`serving on port ${port}`)
})
