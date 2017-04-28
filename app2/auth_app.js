// Added koa-mount which will essiantially log me in

var Koa = require('koa')
var Router = require('koa-router')
var auth = require('koa-basic-auth')
var mount = require('koa-mount')

var app = new Koa()
var router = new Router()

var credentials = {
  name:'Danie',
  pass: 'Strijdom'
}

// Left this out initially but this.set possibly required for it all to work
// not happy with this since I have been trying to avoid generator functions
// but not sure how to make it work without them

app.use(function *handleError(next) {
  try {
    yield next
  } catch (err) {
    if (401 === err.status) {
      this.status = 401
      this.set('WWW-Authenticate', 'Basic')
      this.body = 'get out intruder!'
    } else {
      throw err
    }
  }
})

app.use(mount('/loggedin',auth(credentials)))

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
