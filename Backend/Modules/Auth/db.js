var UserCollection;

const createSchema = (DB) => {
    UserCollection = DB.collection('users');
    if (UserCollection) {
        console.log('users collection already exists');
    } else {
        console.log('Creating users collection');
        DB.createCollection('users', {
            validator: { $jsonSchema: {
                bsonType: 'object',
                required: ['name', 'email', 'password'],
                properties: {
                    name: {
                        bsonType: 'string',
                        description: 'must be a string and is required'
                    },
                    email: {
                        bsonType: 'string',
                        description: 'must be a string and is required'
                    },
                    passowrd: {
                        bsonType: 'string',
                        description: 'must be a string and is required'
                    }
                }
            }}
        });
        UserCollection = DB.collection('users');
    }
};

const createUser = async (user) => {
    return await UserCollection.insertOne(user);
};

const getUserByEmail = async (email) => {
    return await UserCollection.findOne({ 'email' : email });
};

module.exports = {
    createSchema,
    createUser,
    getUserByEmail
}

