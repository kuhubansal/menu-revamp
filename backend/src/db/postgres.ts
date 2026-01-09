import { Pool } from 'pg';

let pool: any;

export const initDB = () => {
    try{
        pool = new Pool ({
        connectionString : process.env.DATABASE_URL,
        ssl:{
            rejectUnauthorized: false
        }
        });
    }
    catch (error) {
        console.error("Database initialization error:", error);
    }
    return pool;
}

export const runQuery = async (query: string, values?: any) => {
    let result: any;
    try{
       result = await pool.query(query , values ? values : []);
    }
    catch (error) {
        console.error("Query error:", error);
    }
    return result;
}

export const checkDBHealth = async () => {
    let result: any;
    try{
        result = await runQuery('SELECT ');
    }
    catch (error) {
        console.error("Query error:", error);
    }
    return result;
}



