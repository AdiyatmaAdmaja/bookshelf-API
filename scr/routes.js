const {
    addBookHandler,
    getAllBookHandler,
    getBookByIdHandler,
    updateBookByIdHandler,
    deleteBookByIdHandler
} = require('./handler');

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBookHandler,
    },
    {
        method: 'GET',
        path: '/books',
        handler: getAllBookHandler,
    },
    {
        method: 'GET',
        path: '/books{id}',
        handler: getBookByIdHandler,
    },
    {
        method: 'PUT',
        path: '/books{id}',
        handler: updateBookByIdHandler,
    },
    {
        method: 'DELET',
        path: '/books{id}',
        handler: deleteBookByIdHandler,
    },
];

module.exports = routes;