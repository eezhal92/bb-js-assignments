;(function (root, factory) {
  if (typeof require === 'function') {
    module.exports = factory();
  } else {
    root.perpus = factory();
  }
})(this, function () {
  'use strict';

  // Available book title
  var title1 = { id: 1, title: "You Don't know JS" };
  var title2 = { id: 2, title: 'The Effective Engineer' };
  var title3 = { id: 3, title: 'Clean Code' };

  var titles = [title1, title2, title3];
  
  /**
   * Books mean copies of book.
   *
   * @type {Array}
   */
  var books = [
    { sku: 'A1', title: title1 },
    { sku: 'A2', title: title1 },
    { sku: 'A3', title: title1 },
    
    { sku: 'B1', title: title2 },
    { sku: 'B2', title: title2 },
    
    { sku: 'C1', title: title3 },
    { sku: 'C2', title: title3 },
  ];

  /**
   * Borrowed books (copies of book).
   * Contains SKU strings.
   *
   * @type {String[]}
   */
  var borrowed = ['C2'];

  function runningInBrowser() {
    return typeof window !== 'undefined';
  }

  function findBook(sku) {
    var foundBook = books.find(function (book) {
      return book.sku === sku;
    });

    if (!foundBook) {
      throw new Error('Buku dengan SKU: %s tidak tersedia', sku);
    }

    return foundBook;
  }

  function addBookToBorrowedList(sku) {
    if (borrowed.indexOf(sku) > -1) {
      throw new Error('Buku dengan SKU %s telah terpinjam', sku);
    }

    borrowed.push(sku);
  }

  function removeBookFromBorrowedList(sku) {
    var bookIndex = borrowed.indexOf(sku);
    if (bookIndex === -1) {
      throw new Error('Buku dengan SKU %s belum terpinjam', sku);
    }

    borrowed.splice(bookIndex, 1);
  }

  function borrowedBooksByTitle(titleId) {
    return borrowed
      .map(function (sku) {
        return findBook(sku);
      })
      .filter(function (book) {
        return book.title.id === titleId;
      });
  }

  function borrowedBooksByTitleCount(titleId) {
    return borrowedBooksByTitle(titleId).length;
  }

  function booksByTitle(titleId) {
    return books.filter(function (book) {
      return book.title.id === titleId;
    });
  }

  function booksByTitleCount(titleId) {
    return booksByTitle(titleId).length;
  }

  function availableBooksByTitle(titleId) {
    return books.filter(function (book) {
      return borrowed.indexOf(book.sku) === -1;
    });
  }

  function availableBooksByTitleCount(titleId) {
    return booksByTitleCount(titleId) - borrowedBooksByTitleCount(titleId);
  }

  function isBookAvailable(sku) {
    return borrowed.indexOf(sku) === -1;
  }

  function browserHelp() {
    console.info('Help');
    console.log('Selamat Datang di Perpustakaan!');
    console.log('Variable `perpus` tersedia di objek window. Untuk menggunakannya, silakan gunakan perintah di bawah:');
    console.log('1. Panggil method `showMethodSignatures` untuk melihat signature method yang tersedia');
    console.log('2. Panggil method `showBookTitles` untuk melihat buku yang tersedia');
    console.log('3. Panggil method `showBorrowedBooks` untuk melihat buku yang masih dipinjam');
    console.log('4. Panggil method `borrowBook` untuk meminjam buku');
    console.log('5. Panggil method `returnBook` untuk mengembalikan buku');
    console.log();
  }

  function Perpus() {
    this.help();
  }

  Perpus.prototype.help = function help() {
    if (runningInBrowser()) {
      browserHelp();
    } 
  };

  Perpus.prototype.showMethodSignatures = function showMethodSignatures() {
    console.info('Method Signatures');
    console.log('showBookTitles()');
    console.log('showBorrowedBooks()');
    console.log('borrowBook(bookId: int)');
    console.log('returnBook(bookId: int, bookItemId: string)');
    console.log();
  };

  Perpus.prototype.showBookTitles = function showBookTitles() {
    console.info('All Book Titles');
    
    titles.forEach(function (title) {
      console.log('ID: %d, Title: %s, Total Copies: %d, Available Copies: %d', title.id, title.title, booksByTitleCount(title.id), availableBooksByTitleCount(title.id));
    });

    console.log();
  };

  Perpus.prototype.showBorrowedBooks = function showBorrowedBooks() {
    console.log('Borrowed Books');
    
    borrowed.forEach(function (sku) {
      var book = findBook(sku);
      console.log('SKU: %s, Title: %s', book.sku, book.title.title);
    });

    console.log();
  };

  Perpus.prototype.borrowBook = function borrowBook(sku) {
    console.log('Borrow Book');

    try {
      var borrowedBook = findBook(sku);
    } catch (err) {
      console.error(err.message);

      return;
    }

    if (!isBookAvailable(sku)) {
      console.error('Maaf buku dengan SKU: %s masih dipinjam', sku);

      return;
    }

    addBookToBorrowedList(sku);

    console.log('Berhasil meminjam buku berjudul: %s, SKU: %s', borrowedBook.title.title, sku);
    console.log();
  };

  Perpus.prototype.returnBook = function returnBook(sku) {
    console.log('Return Book');
    
    try {
      var returnedBook = findBook(sku);
    } catch (err) {
      console.error(err.message);

      return;
    }

    removeBookFromBorrowedList(sku);

    console.log('Berhasil mengembalikan buku dengan judul: %s, SKU: %s', returnedBook.title.title, sku);
    console.log();
  };

  return new Perpus();
});