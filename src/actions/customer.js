import {Like} from 'typeorm'
import orm from '../orm.js'

export const read = async (request, response) => {
  const result = request.query.name
    ? await orm.getRepository('Customer').findBy({name: Like(`%${request.query.name}%`)})
    : await orm.getRepository('Customer').find()

  response.status(200).json(result)
}

export const create = async (request, response) => {
  await orm.getRepository('Customer').save(request.body)

  response.status(201).end()
}

export const update = async (request, response) => {
  await orm.getRepository('Customer').update(request.params.id, request.body)

  response.status(204).end()
}

export const remove = async (request, response) => {
  await orm.getRepository('Customer').delete(request.params.id)

  response.status(204).end()
}
