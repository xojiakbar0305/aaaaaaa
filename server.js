const http = require('http')
const { books } = require('./data')

const app = (req, res) => {

	res.setHeader('Access-Control-Allow-Origin', '*')

	if (req.url === '/book' && req.method === 'GET') {

		res.setHeader('Content-Type', 'application/json')
		res.writeHead(200)
		res.end(JSON.stringify(books))
	}
	else if (req.url === '/book' && req.method === 'POST') {

		let newBook = {}

		req.on('data', clientQismdanKeganMalumot => {

			const klientdanKeganMalumotniObjectQilingani = JSON.parse(clientQismdanKeganMalumot.toString())

			newBook.name = klientdanKeganMalumotniObjectQilingani.name

			books.push(newBook)
		})

		req.on('end', () => {

			res.end(JSON.stringify({ error: null, message: 'created', data: newBook }))
		})
	}
	else {
		res.writeHead(404)
		res.end('Error...')
	}
}

const server = http.createServer(app)

server.listen(8087, console.log('server ishlamoqda'))
