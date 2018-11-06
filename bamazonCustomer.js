// Requiring npm packages
var mysql = require('mysql');
var Table = require('easy-table');
var inquirer = require('inquirer');

// Requiring the dotenv for the mysql PW
(function main() {
    require('dotenv').config();
}());

// Create the connection information for the mysql database
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
  
    // mysql password that has been saved in the .env file using dotenv npm
    password: process.env.MYSQL_PW,
    database: 'bamazon_DB'
  });

  // Connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    // Load database Table
    loadDBTable();
  });
  
  // Function that loads the database table, displays the table in the console using easy-table npm, and starts the inquirer npm
function loadDBTable() {
    connection.query('SELECT * FROM products', function(err, res) {
        if (err) throw err;
        tablePrint(res);   
        inquirerStart();
    });
};

// Function to display the table in the console using easy-table npm
function tablePrint (res) {
    console.log(Table.print(res, {
        item_id: {name: 'Product ID'},
        product_name: {name: 'Product Name'},
        department_name: {name: 'Dept. Name'},
        price: {name: 'Price', printer: Table.number(2)},
        stock_quantity: {name: 'Stock Quantity'}
    }));
};

// Function to start the inquirer npm and the customer ordering process
function inquirerStart() {  
    inquirer
        .prompt([
            {
            name: 'itemSelect',
            type: 'input',
            message: 'What is the Product ID of the item you would like to purchase?',
            // Validation to restrict user inputs to positive whole numbers only
            validate: function(value) {
                if (isNaN(value) === false && value >= 0 && value % 1 === 0 || value.toLowerCase() === 'q') {
                    return true;
                }
                return false;
                }
            },{
            name: 'qtySelect',
            type: 'input', 
            message: 'How many items would you like to purchase?',
            validate: function(value) {
                if (isNaN(value) === false && value >= 0 && value % 1 === 0 || value.toLowerCase() === 'q') {
                    return true;
                }   
                return false;
                }
            },
        ])
        .then(function(answer) {
            if (answer.itemSelect.toLowerCase() === 'q' || answer.qtySelect.toLowerCase() === 'q') {
                console.log('Goodbye!');
                process.exit();
            }
            else {
                connection.query('SELECT * FROM products', function(err, res) {
                    if (err) throw err;
                    
                    // Getting information regarding the selected item
                    var chosenItem;
                        for (var i = 0; i < res.length; i++) {
                            if (res[i].item_id === parseInt(answer.itemSelect)) {
                                chosenItem = res[i];
                            }
                        };
                    
                    // Console logging the selected order item and quantity
                    console.log('\n-----------------');
                    console.log('You chose to buy ' + answer.qtySelect + ' ' + chosenItem.product_name + ' at $' + chosenItem.price + ' each.');
                    
                    // Determines if there is enough stock to fullfill order, if so then reduce the stock number by the order quantity amount
                    if (chosenItem.stock_quantity >= parseInt(answer.qtySelect)) {
                        connection.query('UPDATE products SET ? WHERE ?',
                            [
                                {
                                    stock_quantity: chosenItem.stock_quantity - parseInt(answer.qtySelect)
                                },
                                {
                                    item_id: chosenItem.item_id
                                }
                            ],

                            // Console logging order information and success
                            function(err) {
                                if (err) throw err;
                                console.log('-----------------');
                                console.log('Your order was placed successfully!');
                                console.log('Total cost: $' + answer.qtySelect * chosenItem.price);
                                console.log('Would you like to place another order?');console.log('-----------------\n');
                            }
                        )
                        
                        // Displaying updated table and asking for another order
                        connection.query('SELECT * FROM products', function(err, res) {
                            if (err) throw err;
                            tablePrint(res);
                            inquirerStart();

                        });
                    }

                    // If there is not enough stock, the order is not placed and the user is promoted to put in another order or alter the quantity
                    else {
                        console.log('\nThere is not enough stock to fulfill your order. Would you like to change your quantity or order something else?\n');
                        tablePrint(res);
                        inquirerStart();
                    }
                });
            };
        });
};