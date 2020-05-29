import Knex from 'knex'
import {DatabaseAdapter} from './Database'

export class PostgresAdapter implements DatabaseAdapter {
	client: Knex

	async getClient() {
		if (!this.client) {
			this.client = Knex({
				client: 'pg',
				connection: {
					host: 'localhost',
					user: 'root',
					password: 'adapter',
					database: 'adapter-db'
				}
			})
		}

		return this.client
	}

	async delete<T>(table: string, query: any): Promise<T | null> {
		const client = await this.getClient()
		await client(table).where(query).del()
		return null
	}

	async find<T>(table: string, query: any): Promise<T> {
		const client = await this.getClient()
		const [result] = await client(table).select('*').where(query).limit(1)
		return result
	}

	async read<T>(table: string, query: any): Promise<T[]> {
		const client = await this.getClient()
		return client(table).select('*').where(query)
	}

	async store<T>(table: string, data: T): Promise<T> {
		const client = await this.getClient()
		const [result] = await client(table).insert(data).returning('*')
		return result
	}

	async update<T>(table: string, query: any, data: Partial<T>): Promise<T> {
		const client = await this.getClient()
		const [result] = await client(table).where(query).update(data).returning('*')
		return result
	}

}