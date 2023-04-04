
const { MongoClient } = require('mongodb');

main().catch(console.error);

async function main() {

    const url = "mongodb://127.0.0.1:27017";
    const client = new MongoClient(url, {useUnifiedTopology: true});

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        const database = client.db("fruitsDB");
        const dbCollection = database.collection("fruit");
        const doc = {
            name: "Record of a Shriveled Datum",
            content: "No bytes, no problem. Just insert a document, in MongoDB",
        }
        const result = await dbCollection.insertOne(doc);

        console.log(`A document was inserted with the _id: ${result.insertedId}`);

        await listDatabases(client);
        await listCollections(client, "fruitsDB");
        await listCollectionItems(dbCollection);

    } catch (e) {
        console.error(e);
    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}

async function listDatabases(client) {

    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
    console.log(databasesList); 
};

async function listCollections(client, database){

    const collectionList = await client.db(database).listCollections().toArray();
    console.log(collectionList);

}

async function listCollectionItems(dbCollection){

    const allFruits = dbCollection.find();
    await allFruits.forEach(console.dir);

}