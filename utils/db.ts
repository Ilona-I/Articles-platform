import mysql from 'mysql2/promise'

export interface IDBSettings {
  host: string

  port: number

  user: string

  password: string

  database: string
}

export const GetDBSettings = (): IDBSettings => {
  return {
    host: process.env.MYSQL_HOST!,
    port: parseInt(process.env.MYSQL_PORT!),
    user: process.env.MYSQL_USER!,
    password: process.env.MYSQL_PASSWORD!,
    database: process.env.MYSQL_DATABASE!,
  };


}

export const dbConnect = async () => {

  return await mysql.createConnection(GetDBSettings())
}