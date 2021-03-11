const server_response = (success, data, error) => {
    return {
        success,
        data,
        error: error//.json()
    }
};

module.exports = { server_response };