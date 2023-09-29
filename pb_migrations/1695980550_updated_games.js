/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("c9ofwz9wbc7l8m1")

  collection.indexes = [
    "CREATE INDEX `idx_kBZpNuo` ON `games` (`votesTotal`)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("c9ofwz9wbc7l8m1")

  collection.indexes = []

  return dao.saveCollection(collection)
})
