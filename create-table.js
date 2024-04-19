import { sql } from './db.js';

sql`
CREATE TABLE videos (
    id text primary key,
    title TEXT,
    description TEXT,
    duration INTEGER
);`.then(() => {console.log('Tabela Criada');})