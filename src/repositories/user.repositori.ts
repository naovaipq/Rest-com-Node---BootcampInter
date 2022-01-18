
import DatabaseError from "../models/errors/database.error.model";
import Db from "../db";
import User from "../models/user.model";


class UserRopositori {

    async findAllUsers(): Promise<User[]> {
        const query = `
            SELECT uuid, username 
            FROM application_user
        `;

        const { rows } = await Db.query<User>(query);
        
        return rows || [];
    }

    async findById(uuid: string): Promise<User> {

        try {
            const query = `
                SELECT uuid, username 
                FROM application_user 
                WHERE uuid = $1
            `;
    
            const values = [uuid];
    
            const { rows } = await Db.query<User>(query, values);
            const [ user ] = rows
    
            return user;
            
        } catch (error) {
            console.log(error);
            throw new DatabaseError('Erro na consulta por Id', error);
        }
    }

    async create(user: User): Promise<string> {

            const script = `
                INSERT INTO application_user (username, password) 
                VALUES ($1, crypt($2, 'my_salt'))
                RETURNING uuid
            `;
    
            const values = [user.userName, user.password];
    
            const { rows } = await Db.query<{ uuid: string }>(script, values);
    
            const [newUser] = rows;
    
            return newUser.uuid;
    }
    

    async update(user: User): Promise<void> {
        const script = `
            UPDATE application_user 
            SET username = $1, password = crypt($2, 'my_salt')
            WHERE uuid = $3
        `;

        const values = [user.userName, user.password, user.uuid];
        
        await Db.query(script, values);
    }
    
    async removeUser(uuid: string): Promise<void> {
        const script = `
            DELETE FROM application_user 
            WHERE uuid = $1
        `;

        const values = [uuid];
        
        await Db.query(script, values);
    }

}

export default new UserRopositori();

