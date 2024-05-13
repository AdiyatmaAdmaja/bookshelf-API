const books = require('./books');
const {nanoid} = require('nanoid');

const addBookHandler = (request, h) => {
    const{
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    } = request.payload;

    if (!name){
        return h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
          }).code(400);
    }

    if (readPage > pageCount) {
        return h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
          }).code(400);
    }

    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished = pageCount === readPage ? true : false;
    const newBook = {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        insertedAt,
        updatedAt,
    };
    books.push(newBook);
    const addBooksStatus = books.filter((book) => book.id === id).length > 0;
  if (addBooksStatus) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const getAllBookHandler = (request, h) => {
    const { name, reading, finished } = request.query;
  
    let results = books;
  
    if (name !== undefined) {
      const booksNameNormalize = name.toLowerCase();
      results = results.filter((book) =>
        book.name.toLowerCase().includes(booksNameNormalize)
      );
    }
  
    if (reading !== undefined) {
      results = results.filter((book) => book.reading === !!Number(reading));
    }
    if (finished !== undefined) {
      results = results.filter((book) => book.finished === !!Number(finished));
    }
  
    results = results.map((book) => ({
      id: book.id,
      name: book.name,
      publisher: book.publisher,
    }));
  
    return h.response({
        status: "success",
        data: {
          books: results,
        },
      })
      .code(200);
};

const getBookByIdHandler = (request, h) => {
    const { bookId } = request.params;
    const book = books.filter((n) => n.id === id)[0];
    if (book !== undefined) {
        return h.response({
          status: "success",
          data: {
            book: book,
          },
        })
        .code(200);
    }

    return h.response({
        status: "fail",
        message: "Buku tidak ditemukan",
      })
      .code(404);
};

const updateBookByIdHandler = (request, h) => {
    const { bookId } = request.params;
    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    } = request.payload;
    
    const index = books.findIndex((book)=>book.id===id);
    if (index === -1) {
        return h.response({
            status: "fail",
            message: "Gagal memperbarui buku. Id tidak ditemukan",
          })
          .code(404);
    }

    if (!name) {
        return h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
        }).code(400);
    }

    if (readPage > pageCount) {
        return h.response({
          status: 'fail',
          message:
          'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        }).code(400);
    }

    const finished = pageCount === readPage ? true : false;
    const updatedAt = new Date().toISOString();

    books[index] = {
        ...books[index],
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        finished,
        updatedAt,
    };

    return h.response({
        status: 'success',
        message: "Buku berhasil diperbarui",
        book: books[index],
    }).code(200);
};

const deleteBookByIdHandler = (request, h) => {
    const { bookId } = request.params;
    const index = books.findIndex((book) => book.id === bookId);

    if (index === -1) {
        return h.response({
            status: "fail",
            message: "Buku gagal dihapus. Id tidak ditemukan",
        }).code(404);
    }

    books.splice(index, 1);
    return h.response({
        status: "success",
        message: "Buku berhasil dihapus",
    }).code(200);
};

module.exports = {
    addBookHandler,
    getAllBookHandler,
    getBookByIdHandler,
    updateBookByIdHandler,
    deleteBookByIdHandler,
};