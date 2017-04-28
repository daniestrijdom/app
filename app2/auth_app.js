// NB: I have ommitted the error-handling middleware for now
// Added koa-mount which will essiantially log me in

var Koa = require('koa')
var Router = require('koa-router')
var auth = require('koa-basic-auth')

var app = new Koa()
var router = new Router()

var credentials = {
  name:'Danie',
  pass: 'Strijdom'
}

app.use(auth(credentials))

router.get('/loggedin', auth(credentials), async function secureAccess(ctx){
  ctx.body = `User ${credentials.name} is authorised`
})

router.get('/openaccess', async function openAccess(ctx){
  ctx.body = `public page`
})

// PORT
app.use(router.routes())
var port = process.argv[2]
app.listen(port, function() {
    console.log(`now serving on port ${port}`)
})
