var MemoryCollection;

const createSchema = (DB) => {
    MemoryCollection = DB.collection('memory');
    if (MemoryCollection) {
        console.log('memory collection already exists');
    } else {
        console.log('Creating memory collection');
        DB.createCollection('memory', {
            validator: { $jsonSchema: {
                bsonType: 'object',
                required: ['title', 'description', 'userId', 'categoryName', 'learningStatus'],
                properties: {
                    title: {
                        bsonType: 'string',
                        description: 'must be a string and is required'
                    },
                    description: {
                        bsonType: 'string',
                        description: 'must be a string and is required'
                    },
                    note: {
                        bsonType: 'string',
                        required: false,
                        description: 'must be a string and is required'
                    },
                    userId: {
                        bsonType: 'objectId',
                        description: 'must be a string and is required'
                    },
                    categoryName: {
                        bsonType: 'string',
                        description: 'must be a string and is required'
                    },
                    learningStatus: {
                        enum: ['new', 'learning', 'mastered', 'forgot'],
                        description: 'must be a enum value and is required'
                    }
                }
            }}
        });
        MemoryCollection = DB.collection('memory');
    }
};

const createMemoryItem = async (memoryItem) => {
    return await MemoryCollection.insertOne(memoryItem);
};

const getMemoryItemsForCategory = async (userId, categoryName) => {
    return await MemoryCollection.find({ 'userId': userId, 'categoryName': categoryName }).toArray();
};

const getAllMemoryItemsGroupedByCategory = async (userId) => {
    return await MemoryCollection.aggregate([
        { 
            '$match': { 'userId': userId } 
        },
        { 
            '$group': {
                '_id': '$categoryName',
                'items': { '$push': '$$ROOT' }
            }
        },
        {
            '$project': {
                '_id': 0,
                'categoryName': '$_id',
                'items': '$items'
            }
        }
    ]).toArray();
};

module.exports = {
    createSchema,
    createMemoryItem,
    getMemoryItemsForCategory,
    getAllMemoryItemsGroupedByCategory
};

