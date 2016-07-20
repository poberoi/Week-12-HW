var prompt = require('prompt');
var mysql = require('mysql');

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
  connection.query('Select * FROM products', function(err, res){
    if(err) throw err;
    console.log('Item ID        Product        Department      Price   Quantity');
    for (i=0;i<res.length;i++){
      
      console.log(JSON.stringify(res[i].ItemId + '  ' + res[i].ProductName + '  ' + res[i].DepartmentName + '  ' + res[i].Price + '  ' + res[i].StockQuantity));
    }
  })
}

displayItems();
connection.end();