import { createConnection, Connection } from 'typeorm';

export default async (): Promise<Connection> => createConnection();
