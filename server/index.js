const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const { MongoClient, ServerApiVersion } = require("mongodb")
dotenv.config()

// Express app
const app = express()

// Middlewares
app.use(express.json())
app.use(cors())

// Connect to DB
const uri = process.env.DB_URI

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

async function run() {
  try {
    await client.connect()
    const postCollection = client.db("database").collection("posts") // this is post collection
    const userCollection = client.db("database").collection("users") // this is user collection

    // get posts
    app.get("/post", async (req, res) => {
      const post = await (await postCollection.find().toArray()).reverse()
      res.send(post)
    })

    // get user specific posts
    app.get("/userposts", async (req, res) => {
      const email = req.query.email
      const post = await (
        await postCollection.find({ email: email }).toArray()
      ).reverse()
      res.send(post)
    })

    // get user
    app.get("/user", async (req, res) => {
      const users = await userCollection.find().toArray()
      res.send(users)
    })

    // get logged in user
    app.get("/loggedinuser", async (req, res) => {
      const email = req.query.email
      const user = await userCollection.find({ email: email }).toArray()
      res.send(user)
    })

    // post tweet
    app.post("/post", async (req, res) => {
      const post = req.body
      const result = await postCollection.insertOne(post)
      res.send(result)
    })

    // register a user
    app.post("/register", async (req, res) => {
      const user = req.body
      const result = await userCollection.insertOne(user)
      res.send(result)
    })

    // patch
    app.patch("/userupdates/:email", async (req, res) => {
      const filter = req.params
      const profile = req.body
      const options = { upsert: true }
      const updateDoc = { $set: profile }
      const result = await userCollection.updateOne(filter, updateDoc, options)
      res.send(result)
    })

    console.log("Connected to MongoDB!")
  } catch (error) {
    console.log(error)
  }
}
run().catch(console.dir)

// Routes
app.get("/", (req, res) => {
  res.json("Hello World!")
})

// Listen to server
const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Twitter clone is listening on http://localhost:${port}`)
})
