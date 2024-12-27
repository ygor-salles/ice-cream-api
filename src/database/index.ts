import { createConnection, Connection } from 'typeorm';
import { connectionConfig } from './utils';

export default async (): Promise<Connection> => createConnection(connectionConfig() as any);
