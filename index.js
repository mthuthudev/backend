const { response, request } = require('express')
const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

let notes = [
    {
        id: 0,
        content: 'llleakjlf',
        important: true
    },
    {
        id: 1,
        content: 'yeakjdlf',
        important: true
    },
    {
        id: 2,
        content: 'fgjklfg',
        important: false
    },
    {
        id: 3,
        content: 'ajfoe',
        important: false
    },
    {
        id: 4,
        content: 'alkjlkdf',
        important: true
    },
]

app.get('/', (request, response) => {
    response.send('<h1>Hellow Orld</h1>')
})

app.get('/api/notes', (request, response) =>{
    response.json(notes)
})

app.get('/api/notes/:id', (request,response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)
    if (note) response.json(note)
    else response.status(404).end()
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
    response.status(204).end()
})

const generateId = () => {
    const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0
    return maxId + 1
}

app.post('/api/notes', (request, response) => {
    const body = request.body
    
    if (!body.content){
        return response.status(400).json({
            error: 'content missing'
        })
    }
    const note = {
        content: body.content,
        important: body.important || false,
        date: new Date(),
        id: generateId()

    }

    notes = notes.concat(note)
    response.json(note)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`) 
})
