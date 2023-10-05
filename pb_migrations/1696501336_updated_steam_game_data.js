/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gnv4jhiu3plzpy5")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ur3ag8hk",
    "name": "screenshots",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gnv4jhiu3plzpy5")

  // remove
  collection.schema.removeField("ur3ag8hk")

  return dao.saveCollection(collection)
})
