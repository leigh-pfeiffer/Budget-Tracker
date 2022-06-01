// The object stored will come from the catch function
// fetch() --> .catch() in index.js

// create variable to hold db connection
let db;
// establish a connection to IndexedDB database 
// called 'new_transaction' and set it to version 1
// new_transaction is the name of the new database dreated by indexedDB
// or connect to if exist.
const request = indexedDB.open('budget_tracker', 1);

// this event will emit if the database version changes
// (nonexistant to version 1, v1 to v2, etc.)
request.onupgradeneeded = function(event) {
    // save a reference to the database 
    const db = event.target.result;
    // create an object store (table) called `new_transaction`, set it to have an auto incrementing primary key of sorts 
    db.createObjectStore('new_transaction', { autoIncrement: true });
  };

  // upon a successful 
request.onsuccess = function(event) {
    // when db is successfully created with its object store
    //  (from onupgradedneeded event above) or simply established
    //   a connection, save reference to db in global variable
    db = event.target.result;
  
    // check if app is online, if yes run uploadTransaction() function 
    //to send all local db data to api
    if (navigator.onLine) {
        //if online upload all data in the data store to our website
        // that is if our app is online
        uploadTransaction();
        //window.location.reload()
        
    }

  };
  
  request.onerror = function(event) {
    // log error here
    console.log(event.target.errorCode);
  };


  // This function will be executed if we attempt to 
  //submit a new transaction and there's no internet connection
function saveRecord(record) {
    // open a new transaction with the database with 
    // read and write permissions 
    const transaction = db.transaction(['new_transaction'], 'readwrite');
  
    // access the object store for `new_transaction`
    const budgetObjectStore = transaction.objectStore('new_transaction');
  
    // add record to your store with add method
    budgetObjectStore.add(record);
  }

  // function saveChartTransactions(records) {
  //   // open a new transaction with the database with 
  //   // read and write permissions 
  //   const transaction = db.transaction(['table_transactions'], 'readwrite');
  
  //   // access the object store for `new_transaction`
  //   const budgetObjectStore = transaction.objectStore('table_transactions');
  
  //   // add record to your store with add method
  //   budgetObjectStore.add(records);
  // }



// listen for app coming back online
window.addEventListener('online', uploadTransaction);