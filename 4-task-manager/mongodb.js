const { MongoClient, ObjectID} = require('mongodb')

const connectionUrl = 'mongodb://127.0.0.1:27017'
const databaseName = 'users'
const ObjectId = new ObjectID()

MongoClient.connect(
  connectionUrl,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      console.error('Unable to connect to database')
    }

    const DB = client.db(databaseName)

    // // INSERT ONE DOCUMENT
    // DB.collection(databaseName).insertOne(
    //   {
    //     name: 'Mauricio',
    //     lastName: 'Gomez',
    //     age: 29
    //   },
    //   (error, { ops }) => mongoResponse(error, ops)
    // )

    // // INSERT MORE THAN ONE DOCUMENT
    // DB.collection(databaseName).insertMany(
    //   [{
    //     name: 'Test',
    //     lastName: '1',
    //     age: 26
    //   }, {
    //     name: 'Test',
    //     lastName: '2',
    //     age: 26
    //   }, {
    //     name: 'Test',
    //     lastName: '3',
    //     age: 26
    //   }],
    //   (error, { ops }) => mongoResponse(error, ops)
    // )

    // // FIND A SPECIFIC DOCUMENT
    // DB.collection(databaseName).findOne(
    //   { _id: new ObjectID("5e6640ff2a42c63fe0704eba") },
    //   (error, user) => mongoResponse(error, user)
    // )

    // // FIND SEVERAL DOCUMENTS USING A POINTER TO CONVERT THEM INTO AN ARRAY AFTER GETTING THE RESULT
    // DB.collection(databaseName).find(
    //   { age: 26 }
    // ).toArray(
    //   (error, users) => mongoResponse(error, user)
    // )

    // // UPDATE A DOCUMENTS USING PROMISE SINTAX
    // DB.collection(databaseName)
    //   .updateOne(
    //     { _id: new ObjectID("5e6640ff2a42c63fe0704eba") },
    //     {
    //       $set: {
    //         name: 'TEST'
    //       }
    //     }
    //   )
    //   .then(
    //     result => console.warn('OK'),
    //     reject => console.error('BAD')
    //   )
    //   .catch(
    //     reject => console.error('BAD')
    //   )

    // // DELETE ONE DOCUMENT
    // DB.collection(databaseName)
    //   .deleteOne(
    //     { _id: new ObjectID("5e6640ff2a42c63fe0704eba") }
    //   )
    //   .then(
    //     result => console.warn('OK'),
    //     reject => console.error('BAD')
    //   )
    //   .catch(
    //     reject => console.error('BAD')
    //   )

    // // DELETE SEVERAL DOCUMENTS
    // DB.collection(databaseName)
    //   .deleteMany(
    //     { age: 26 }
    //   )
    //   .then(
    //     result => console.warn('OK'),
    //     reject => console.error('BAD')
    //   )
    //   .catch(
    //     reject => console.error('BAD')
    //   )
  }
)

const mongoResponse = (error, ops) => {
  error && console.warn('Unable to insert user', error.message)
  console.warn(ops)
}