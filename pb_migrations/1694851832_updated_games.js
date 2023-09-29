/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("c9ofwz9wbc7l8m1")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cjmnfdyn",
    "name": "totalVotes",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("c9ofwz9wbc7l8m1")

  // remove
  collection.schema.removeField("cjmnfdyn")

  return dao.saveCollection(collection)
})
