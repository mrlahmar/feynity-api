const express = require('express')
const neo4j = require('neo4j-driver')
const app = express()
const port = 5000
const uri = "bolt://localhost:7687"
const user = "neo4j"
const password = "test"
const driver = neo4j.driver(uri, neo4j.auth.basic(user, password))
const session = driver.session()
const learnerName = 'Adam'

// const neode = require('neode')
// to test later

const connectToNeo4j = async (req,res) => {
  try {
    const result = await session.run(
      'CREATE (a:Learner {name: $name}) RETURN a',
      { name: learnerName }
    )
  
    const singleRecord = result.records[0]
    const node = singleRecord.get(0)
  
    res.send(node.properties.name)
  } finally {
    await session.close()
  }

  
  // on application exit:
  await driver.close()
}


app.get('/', (req, res) => {
  connectToNeo4j(req,res);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

