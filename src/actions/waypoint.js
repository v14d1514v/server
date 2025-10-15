import orm from '../orm.js'

export const read = async (_, response) => {
  const result = await orm.getRepository('Waypoint').find()

  response.status(200).json(result)
}
