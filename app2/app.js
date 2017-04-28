
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

// INDEX PAGE
var mod1 = require('./modules/epl_teams')
router.get('/index', async function(ctx){
  ctx.render('index', {teams: mod1.teams})
})


// FORM PAGE
var bodyParser = require('koa-body')

app.use(bodyParser({
  formidable:{uploadDir:'./uploads'},
  multipart: true,
  urlencoded: true,
}))

router.get('/form', async function renderForm(ctx) {
  ctx.render('form')
})

router.post('/form', async function handleForm(ctx) {
  ctx.body = ctx.request.body
})

// UPLOAD PAGE
router.get('/upload', async function renderUpload(ctx) {
  ctx.render('upload')
})

router.post('/upload', async function handleUpload(ctx) {
  console.log(ctx.request.body.fields)
  console.log(ctx.request.body.files)
  ctx.body = ctx.request.body.files
})

//STATIC DATA - IMAGES
var serve = require('koa-static')
app.use(serve('./static/images'))

// COOKIES & SESSIONS
router.get('/addcookie', async function setCookie(ctx){
  ctx.cookies.set('im','watchingyou', {
    httpOnly:false,
    expires: new Date(Date.now() + 250000)
  })
  ctx.body = `cookie has been set`
})
//
// var session = require('koa-session')
// // what is this doing?
// app.keys = [`secret key for user`]
// app.use(session(app))
// app.use(async function sessionHandler(ctx, next){
//   var n = ctx.session.views || 0
//   // ++n yields value for n after it has been incremented
//   ctx.session.views = ++n
//   console.log(`page has been viewed ${n} times`)
// })

// routes, port and listen - keeping this at the end
app.use(router.routes())
var port = process.argv[2]
app.listen(port, function() {
  console.log(`serving on port ${port}`)
})
