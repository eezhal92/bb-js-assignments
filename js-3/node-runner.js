var readline = require('readline');
var perpus = require('./perpus');

function createReadLineInterface() {
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return rl;
}

function main() {
  var rl = createReadLineInterface();

  function help() {
    console.log('Menu')
    console.log('1. Method Signatures')
    console.log('2. Show All Book Titles')
    console.log('3. Show Borrowed Books')
    console.log('4. Borrow Book')
    console.log('5. Return Book')
    console.log('9. Help')
    console.log('0. Keluar')
  }

  function askMenu() {
    rl.question('Pilih Menu: ', function (answer) {
      var parsedAnswer = parseInt(answer);
      
      if (!parsedAnswer) {
        rl.close();
      } else {
        command(parsedAnswer);
        askMenu();
      }
    });
  }

  function command(answer) {
    switch(answer) {
      case 1:
        perpus.showMethodSignatures();
        break;
      case 2:
        perpus.showBookTitles();
        break;
      case 3:
        perpus.showBorrowedBooks();
        break;
      case 4:
        rl.question('Masukkan SKU buku yang ingin dipinjam: ', function (skuAnswer) {
          perpus.borrowBook(skuAnswer);
          askMenu();
        });
        break;
      case 5:
        rl.question('Masukkan SKU buku yang ingin dikembalikan: ', function (skuAnswer) {
          perpus.returnBook(skuAnswer);
          askMenu();
        });
        break;
      case 9:
        help();
        break;
      default:
        console.log('Mohon pilih menu yang benar');
        break;
    }
  }

  help();
  askMenu();
}

main();