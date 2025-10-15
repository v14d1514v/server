import express from 'express'
import orm from './orm.js'
import * as customer from './actions/customer.js'
import * as order from './actions/order.js'
import * as waypoint from './actions/waypoint.js'

await orm.initialize()

express()
  .use(express.json())
  .get('/customers', customer.read)
  .post('/customers', customer.create)
  .put('/customers/:id', customer.update)
  .delete('/customers/:id', customer.remove)
  .get('/orders', order.read)
  .post('/orders', order.create)
  .put('/orders/:id', order.update)
  .delete('/orders/:id', order.remove)
  .get('/waypoints', waypoint.read)
  .listen(3000, console.log('API UP, PORT 3000'))
