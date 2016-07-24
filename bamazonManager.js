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

function addItem() {
    inquirer.prompt([{
        type: 'input',
        name: 'ProductName',
        message: 'Product Name?'
    }, {
        type: 'input',
        name: 'DepartmentName',
        message: 'Product Department?'
    }, {
        type: 'input',
        name: 'Price',
        message: 'Product Price?'
    }, {
        type: 'input',
        name: 'StockQuantity',
        message: 'Quantity?'
    }]).then(function(result) {
        connection.query('INSERT INTO products (`ProductName`, `DepartmentName`, `Price`, `StockQuantity`) VALUES ("' + result.ProductName + '","' + result.DepartmentName + '",' + result.Price + ',' + result.StockQuantity + ");", function(err, res) {
            if (err) throw err;
            console.log("Item Added!");
            displayItems();
        })
    })
}


function promptUser(res) {
  inquirer.prompt([{
      type: 'list',
      name: 'choice',
      message: 'What would you like to do?',
      choices: ['Display Items', 'Add New Item', 'Add Quantity to Existing Items', 'View Low Inventory', 'Quit']
  }]).then(function(result) {
      switch(result.choice){
        case 'Display Items':
            displayItems();
            break;
        case 'Add New Item':
            addItem();
            break;
        case 'Add Quantity to Existing Items':
            updateQuantity();
            break;
        case 'View Low Inventory':
            updateQuantity();
            break;
        default:
            process.exit();
      }
  })
}

displayItems();