import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, message } = req.body;
    if (!email || !name || !message) {
      res.status(422).json({ message: "error" });
      return;
    } else {
      const nweMessage = {
        email,
        name,
        message,
      };
      let client;
      try {
        client = await MongoClient.connect(process.env.MONGODB_URL);
      } catch (err) {
        res.status(500).json({ message: "failed conneected" });
        return;
      }
      const db = client.db();

      try {
        const result = await db.collection("messages").insertOne(nweMessage);
        result.id = result.insertedId;
      } catch (err) {
        client.close();
        res.status(500).json({ message: "failed insertOne" });
        return;
      }
      client.close();
      res.status(201).json({ message: "success", insert: nweMessage });
    }
  }
}
export default handler;
