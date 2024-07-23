const { nanoid } = require('nanoid');
const { Book, books } = require('./books');

const addBookHandler = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

  if (!name) {
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

  // Enkapsulasi: Membuat instance dari kelas Book
  const newBook = new Book(id, name, year, author, summary, publisher, pageCount, readPage, reading, insertedAt, updatedAt);
  books.push(newBook);

  const response = h.response({
    status: 'success',
    message: 'Buku berhasil ditambahkan',
    data: { bookId: id },
  });
  response.code(201);
  return response;
};

const getAllBooksHandler = (request, h) => {
  const { name, reading, finished } = request.query;
  let results = books;

  if (name !== undefined) {
    const nameNormalize = name.toLowerCase();
    results = results.filter((book) => book.name.toLowerCase().includes(nameNormalize));
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
    status: 'success',
    data: { books: results },
  }).code(200);
};

const getBookByIdHandler = (request, h) => {
  const { id } = request.params;
  const book = books.find((book) => book.id === id);

  if (book) {
    return {
      status: 'success',
      data: { book },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

const updateBookByIdHandler = (request, h) => {
  const { id } = request.params;
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

  if (!name) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    }).code(400);
  }

  if (readPage > pageCount) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    }).code(400);
  }

  const updatedAt = new Date().toISOString();
  const book = books.find((book) => book.id === id);

  if (book) {
    // Polimorfisme: Memanggil metode update dari objek Book
    book.update(name, year, author, summary, publisher, pageCount, readPage, reading, updatedAt);
    return h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    }).code(200);
  }

  return h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  }).code(404);
};

const deleteBookByIdHandler = (request, h) => {
  const { id } = request.params;
  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books.splice(index, 1);
    return h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    }).code(200);
  }

  return h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  }).code(404);
};

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  updateBookByIdHandler,
  deleteBookByIdHandler,
};
