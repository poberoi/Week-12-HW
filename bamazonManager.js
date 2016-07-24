var mysql = require('mysql');
var inquirer = require('inquirer');
var table = require('easy-table');


var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'bamazon'
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
