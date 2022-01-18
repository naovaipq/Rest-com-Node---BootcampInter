import { Pool } from "pg";

const connectionString = 'postgres://hqbtahns:vdr1kAnzAHWkfW_V0bzm-nt8wjjF9T70@kesavan.db.elephantsql.com/hqbtahns';

const Db = new Pool({ connectionString });

export default Db;