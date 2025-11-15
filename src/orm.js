import('reflect-metadata')
import {DataSource, EntitySchema} from 'typeorm'

export default new DataSource({
  type: 'better-sqlite3',
  nativeBinding: 'node_modules/better-sqlite3/build/Release/better_sqlite3.node',
  database: './data/data.sqlite',
  synchronize: true,
  entities: [
    new EntitySchema({
      name: 'Customer',
      columns: {
        id: {type: 'int', unsigned: true, nullable: false, generated: true, primary: true},
        name: {type: 'varchar', length: 80, nullable: false}
      }
    }),
    new EntitySchema({
      name: 'Order',
      columns: {
        id: {type: 'int', unsigned: true, nullable: false, generated: true, primary: true},
        date: {type: 'date', nullable: false},
        customerId: {type: 'int', unsigned: true, nullable: false}
      }
    }),
    new EntitySchema({
      name: 'Waypoint',
      columns: {
        id: {type: 'int', unsigned: true, nullable: false, generated: true, primary: true},
        address: {type: 'varchar', length: 255, nullable: false},
        type: {type: 'varchar', length: 8, nullable: false},
        orderId: {type: 'int', unsigned: true, nullable: false}
      }
    })
  ]
})
