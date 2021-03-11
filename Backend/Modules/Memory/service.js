const MemoryItemDB = require('./db');
const { AppError, AppErrors } = require('../../Helpers/error');
const util = require('util');

const addMemoryItem = async (memoryItem) => {
    try {
        const memoryItemObj = await MemoryItemDB.createMemoryItem(memoryItem);
        console.log(`Memory Obj DB : ${memoryItemObj}`);
        return { memoryItem: memoryItem };
    } catch (e) {
        console.log('Error :', e);
        return { error: e };
    }
};

const getMemoryItems = async (userId) => {
    try {
        console.log(userId);
        const memoryItems = await MemoryItemDB.getAllMemoryItemsGroupedByCategory(userId);
        return { memoryItems };
    } catch (e) {
        console.log('Error :', e);
        return { error: e };
    }
};

const getMemoryItemsForCategory = async (userId, categoryName) => {
    try {
        console.log(userId);
        const memoryItems = await MemoryItemDB.getMemoryItemsForCategory(userId, categoryName);
        return { memoryItems };
    } catch (e) {
        console.log('Error :', e);
        return { error: e };
    }
};

module.exports = { 
    addMemoryItem,
    getMemoryItems,
    getMemoryItemsForCategory
};