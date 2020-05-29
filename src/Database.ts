export interface DatabaseAdapter {
	store<T>(table: string, data: T): Promise<T>
	read<T>(table: string, query: any): Promise<T[]>
	find<T>(table: string, query: any): Promise<T>
	update<T>(table: string, query: any, data: Partial<T>): Promise<T>
	delete<T>(table: string, query: any): Promise<T | null>
}

export class Database {
	adapter: DatabaseAdapter

	constructor(adapter: DatabaseAdapter) {
		this.adapter = adapter
	}

	async store<T>(table: string, data: T): Promise<T> {
		return await this.adapter.store<T>(table, data)
	}

	async read<T>(table: string, query: any): Promise<T[]> {
		return this.adapter.read<T>(table, query)
	}

	async find<T>(table: string, query: any): Promise<T> {
		return this.adapter.find<T>(table, query)
	}

	async update<T>(table: string, query: any, data: Partial<T>): Promise<T> {
		return this.adapter.update<T>(table, query, data)
	}

	async delete<T>(table: string, query: any): Promise<T | null> {
		return this.adapter.delete<T>(table, query)
	}
}