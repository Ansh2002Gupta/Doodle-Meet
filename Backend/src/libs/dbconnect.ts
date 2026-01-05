
import {MongoClient, ServerApiVersion} from 'mongodb';
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGODB_HOSTNAME}.mongodb.net/?appName=${process.env.MONGODB_APPNAME}`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectToDB() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    console.error("Error in dbconnect.ts: ", error);
    process.exit(1);
  } finally {
    await client.close();
  }
}
connectToDB().catch(console.dir);

export default connectToDB;
