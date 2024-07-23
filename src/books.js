// Enkapsulasi: Menggunakan kelas untuk menyimpan properti dan metode terkait dengan Book
class Book {
    constructor(id, name, year, author, summary, publisher, pageCount, readPage, reading, insertedAt, updatedAt) {
      this.id = id;
      this.name = name;
      this.year = year;
      this.author = author;
      this.summary = summary;
      this.publisher = publisher;
      this.pageCount = pageCount;
      this.readPage = readPage;
      this.reading = reading;
      this.insertedAt = insertedAt;
      this.updatedAt = updatedAt;
      this.finished = pageCount === readPage;
    }
  
    // Polimorfisme: Metode update yang berfungsi untuk memperbarui properti book
    update(name, year, author, summary, publisher, pageCount, readPage, reading, updatedAt) {
      this.name = name;
      this.year = year;
      this.author = author;
      this.summary = summary;
      this.publisher = publisher;
      this.pageCount = pageCount;
      this.readPage = readPage;
      this.reading = reading;
      this.updatedAt = updatedAt;
      this.finished = pageCount === readPage;
    }
  }
  
  // Abstraksi: Menggunakan array untuk menyimpan objek book
  const books = [];
  module.exports = { Book, books };
  