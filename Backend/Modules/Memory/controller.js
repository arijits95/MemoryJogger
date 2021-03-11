const MemoryItemService = require('./service');
const { server_response } = require('../../Helpers/server_response');
const util = require('util');

const addMemoryItem = async (req, res) => {
    console.log('Add Memory Item controller called');
    const { error, memoryItem } = await MemoryItemService.addMemoryItem(req.body);
    res.send(server_response(error == null, memoryItem, error ?? null));
};

const getMemoryItems = async (req, res) => {
    console.log('Get all Memory Items controller called');
    console.log(util.inspect(req.query, {showHidden: false, depth: null}))
    if (req.query.categoryName) {
        const { error, memoryItems } = await MemoryItemService.getMemoryItemsForCategory(req.userId, req.query.categoryName);
        res.send(server_response(error == null, memoryItems, error ?? null));
    } else {
        const { error, memoryItems } = await MemoryItemService.getMemoryItems(req.userId);
        res.send(server_response(error == null, memoryItems, error ?? null));
    }  
};

module.exports = { 
    addMemoryItem,
    getMemoryItems
};
