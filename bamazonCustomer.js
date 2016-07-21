var prompt = require('prompt');
var mysql = require('mysql');
var table = require('easy-table');

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

function checkQuantity(product, quantity){
  connection.query('SELECT ')
}

function promptUser(){
  prompt.start();

  prompt.get([{
      name: 'productId',
      description: 'Enter the Product Id you would like to purchase: ',
      pattern: /^[1-9,10]$/,
      message: 'Select a Product Id 1-10',
      required: true
    }, {
      name: 'quantity',
      description: 'Enter the quantity: ',
      pattern: /^[1-100]$/,
      message: 'Select a Product Id 1-100',
      required: true
    }], function (err, result) {
    
    console.log('Command-line input received:');
    console.log('  Product Id: ' + result.productId);
    console.log('  Quantity: ' + result.quantity);

    checkQuantity(result.productId, result.quantity);
  });
}

function displayItems(){
  connection.query('SELECT * FROM products', function(err, res){
    // if(err) throw err;
    // console.log('Item ID        Product        Department      Price   Quantity');
    // for (i=0;i<res.length;i++){
      
    //   console.log(JSON.stringify(res[i].ItemId + '  ' + res[i].ProductName + '  ' + res[i].DepartmentName + '  ' + res[i].Price + '  ' + res[i].StockQuantity));
    // }
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
    promptUser();
  })
}

displayItems();
connection.end();