import orm from '../orm.js'

export const read = async (request, response) => {
  let customerCond = [1]
  let dateCond = [1]

  if (request.query.customer) {
    customerCond = ['o.customerId = :customer', {customer: request.query.customer}]
  }

  if (request.query.date) {
    dateCond = ['o.date = :date', {date: request.query.date}]
  }

  const result = await orm
    .getRepository('Order')
    .createQueryBuilder('o')
    .select('o.id', 'order')
    .addSelect('o.date', 'date')
    .addSelect('c.name', 'customer')
    .addSelect('COUNT(w.orderId)', 'waypoints')
    .innerJoin('Customer', 'c', 'o.customerId = c.id')
    .innerJoin('Waypoint', 'w', 'o.id = w.orderId')
    .where(...customerCond)
    .andWhere(...dateCond)
    .groupBy('w.orderId')
    .limit(request?.query?.limit ?? -1)
    .offset(request?.query?.offset ?? 0)
    .getRawMany()

  response.status(200).json(result)
}

export const create = async (request, response) => {
  await orm.manager.transaction(async (entityManager) => {
    const order = await entityManager.getRepository('Order').save(request.body.order)

    await entityManager.getRepository('Waypoint').save(
      request.body.waypoints.map(waypoint => {
        waypoint.orderId = order.id
        return waypoint
      })
    )
  })

  response.status(201).end()
}

export const update = async (request, response) => {
  await orm.manager.transaction(async (entityManager) => {
    await entityManager.getRepository('Order').update(request.params.id, request.body.order)
    await entityManager.getRepository('Waypoint').delete({orderId: request.params.id})
    await entityManager.getRepository('Waypoint').save(request.body.waypoints.map(waypoint => {
      waypoint.orderId = request.params.id
      return waypoint
    }))
  })

  response.status(204).end()
}

export const remove = async (request, response) => {
  await orm.manager.transaction(async (entityManager) => {
    await entityManager.getRepository('Order').delete(request.params.id)
    await entityManager.getRepository('Waypoint').delete({orderId: request.params.id})
  })

  response.status(204).end()
}
