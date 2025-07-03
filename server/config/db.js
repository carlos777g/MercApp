import pg from "pg";
import 'dotenv/config'

// dotenv es un paquete de nodejs, (>> npm i dotenv)
// para usarlo se importa y se usa la sintaxís process.env.variable
// En donde variable debe coincidir con el archivo .env
// en .env sólo se pone así (p.e): DB_PORT=5432
const pool = new pg.Pool({
  user: process.env.DB_USER, // Usuario de postgre dueño de la base de datos
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

export default pool;
