
const express = require('express')
const app = express()
const port = 3000
const data = require('./data')
const logger = require('./logger')
// module.exports
// When get request to --> localhost:3000/
// order is matter When using 'use' function 
// if there are more then one middleWare usage of use -> app.use([logger,authorize])
// req -> middlevare -> res
//const data = require('../data') .. -> bulunduğun konumdan 1 önceki dosyaya gider
app.use(logger)
/*

route keyvord provide us to chain same root parameters 
app.route("/things/cars")
  .get((req,res)=>{})
  .post((req,res)=>{});



*/
app.get('/first', (req, res) => {
  res.send('Hello World!')
  
})
app.get('/albums',(req,res)=>{

  res.status(200).json(data)



})
//not has to be 'query' important thing is '?' ->http://localhost:3000/albums/alp?search=q&lim=2
//NaN -> not a number
app.get('/albums/query',(req,res)=>{

  const{search,lim}=req.query
  let albums = [...data]
  albums=albums.filter((p)=> {return p.title.startsWith(search)})

  if(lim && !isNaN(lim)){
    albums=albums.slice(0,Number(lim))
  }
  
  res.status(200).json(albums)


})
//it should be replaced at the bottom of get methods 
app.all('*',(req,res)=>{

  res.status(404).send('<h1>resource not found</h1>')

})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

