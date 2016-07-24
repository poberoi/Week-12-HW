var prompt = require('prompt');
var mysql = require('mysql');
var table = require('easy-table');
var productId = '';
var productQuantity = '';


var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'bamazon'
})

connection.connect(function(err){
  if(err) throw err;
  console.log('connected as id ' + connection.threadId);
})




function displayItems(){
  connection.query('SELECT * FROM products', function(err, res){
    
    var t = new table;
 
    res.forEach(function(product) {
      t.cell('Product Id', product.ItemId)
      t.cell('Description', product.ProductName)
      t.cell('Department', product.DepartmentName)
      t.cell('Price, USD ($)', product.Price, table.number(2))
      t.cell('Quantity', product.StockQuantity)
      t.newRow()
    })
    console.log(t.toString());
    promptUser(res);
  })
  
}

function promptUser(table){
  
  prompt.start();

  prompt.get([{
      name: 'productId',
      description: 'Enter the Product Id you would like to purchase(1-10): ',
      message: 'Product Id must be 1-10',
      required: true,
      conform: function(value) {
        value = parseInt(value);
        return value > 0 && value <= 10;
      }
    }, {
      name: 'quantity',
      description: 'Enter the quantity(1-100): ',
      message: 'Quantity must be 1-100',
      required: true,
      conform: function(value2) {
        value2 = parseInt(value2);
        return value2 > 0 && value2 <= 100;
      }
    }], function (err, result) {
    
    productId = result.productId;
    productQuantity = result.quantity;

    console.log('Command-line input received:');
    console.log('  Product Id: ' + productId);
    console.log('  Quantity: ' + productQuantity);

    for(i=0;i<table.length;i++){
      if(table[i].ItemId == productId){
        if((table[i].StockQuantity-productQuantity)>0){
          connection.query("UPDATE products SET StockQuantity='" + (table[i].StockQuantity-productQuantity) + "' WHERE ItemId='" + productId + "'", function(err, res){
            if(err) throw err;
            console.log("Item(s) Purchased!!");
            prompt.start();
            prompt.get([{
              name: 'input',
              description: 'Would you like to buy more items(y,n): ',
              message: 'Please enter y or n',
              required: true,
            }], function(err, result){
              if(result.input === 'y' || result.input === 'Y'){
                displayItems();
              } else {
                process.exit();
              }
            })
          });
        } else {
          console.log("Sorry we do not have enough item in stock!");
          displayItems();
        }
      }
    }
  });
}

displayItems();



