/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gnv4jhiu3plzpy5")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gagszejn",
    "name": "developers",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nccvv8xz",
    "name": "publishers",
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
  collection.schema.removeField("gagszejn")

  // remove
  collection.schema.removeField("nccvv8xz")

  return dao.saveCollection(collection)
})
