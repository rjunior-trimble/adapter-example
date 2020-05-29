import express from 'express'
import {MongoAdapter} from "./MongoAdapter";
import {Database} from './Database'
import {PostgresAdapter} from "./PostgresAdapter";

const app = express()

app.use(express.json())

const database = new Database(process.env.NODE_ENV === 'mongo' ? new MongoAdapter() : new PostgresAdapter())

app.get('/users', async (req, res) => {
	const results = await database.read('users', {})
	res.json(results)
})

app.get('/user/:id', async (req, res) => {
	const result = await database.find('users', {
		id: Number(req.params.id)
	})

	res.json(result)
})

app.post('/user', async (req, res) => {
	console.log(req.body)
	const record = await database.store('users', req.body)
	res.json(record)
})

app.put('/user/:id', async (req, res) => {
	const updatedRecord = await database.update('users', {
		id: Number(req.params.id)
	}, req.body)

	const record = await database.find('users', {
		id: Number(req.params.id)
	})

	res.json(record)
})

app.delete('/user/:id', async (req, res) => {
	await database.delete('users', {
		id: Number(req.params.id)
	})

	res.json({
		message: 'record deleted'
	})
})

app.listen(8000, () => {
	console.log('running on localhost:8000')
})