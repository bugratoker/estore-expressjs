const http = require('http')

const host = '127.0.0.1'
const port = 1212
const server = http.createServer((req,res) =>{

    console.log(req.url)
    res.end('FIRST LOOK TO NODEJS')
}
)

server.listen(port,host,()=>{

    console.log("server listening")
})