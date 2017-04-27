
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
// going to do the FORMS part of the tutorial here.
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

// routes, port and listen - keeping this at the end
app.use(router.routes())
var port = process.argv[2]
app.listen(port, function() {
  console.log(`serving on port ${port}`)
})
