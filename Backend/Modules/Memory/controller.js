const MemoryItemService = require('./service');
const { server_response } = require('../../Helpers/server_response');
const util = require('util');

const addMemoryItem = async (req, res) => {
    console.log('Memory controller called');
    const { error, memoryItem } = await MemoryItemService.addMemoryItem(req.body);
    res.send(server_response(error == null, memoryItem, error ?? null));
};

const getMemoryItems = async (req, res) => {
    console.log('Memory controller called');
    console.log(util.inspect(req.userId, {showHidden: false, depth: null}))
    const { error, memoryItems } = await MemoryItemService.getMemoryItems(req.userId);
    res.send(server_response(error == null, memoryItems, error ?? null));
};

module.exports = { 
    addMemoryItem,
    getMemoryItems
};
