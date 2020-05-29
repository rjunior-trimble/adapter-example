import {MongoClient} from 'mongodb'
import {DatabaseAdapter} from "./Database";

export class MongoAdapter implements DatabaseAdapter {
	client: MongoClient

	async getClient(): MongoClient {
		if (!this.client) {
			this.client = await new Promise((resolve, reject) => {
				MongoClient.connect('mongodb://root:adapter@localhost:27017?authSource=admin', {
					useNewUrlParser: true
				}, (err, client) => {
					if (err) {
						return reject(err)
					}

					resolve(client.db('users'))
				})
			})
		}

		return this.client
	}

	async delete<T>(table: string, query: any): Promise<T | null> {
		const client = await this.getClient()
		return client.collection(table).deleteOne(query)
	}

	async find<T>(table: string, query: any): Promise<T> {
		const client = await this.getClient()
		return client.collection(table).findOne(query)
	}

	async read<T>(table: string, query: any): Promise<T[]> {
		const client = await this.getClient()
		return client.collection(table).find(query).toArray()
	}

	async store<T>(table: string, data: T): Promise<T> {
		const client = await this.getClient()
		return client.collection(table).insertOne(data)
	}

	async update<T>(table: string, query: any, data: Partial<T>): Promise<T> {
		const client = await this.getClient()
		return await client.collection(table).updateOne(query, {
			$set: data
		})
	}

}