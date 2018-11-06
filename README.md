# Bamazon
### GATech Coding Bootcamp Homework: bamazon node.js and MySQL
Updated: 11/06/2018

- - -
### Overview
Developed an application called Bamazon. Bamazon is an Amazon-like storefront that uses MySQL and node.js. This app will take in orders from customers and deplete stock from the store's inventory. 

- - -
### How to Operate the App.
1. Start node in bash terminal referencing the bamazonCustomer.js file (node bamazonCustomer.js)

2. The MySQL product table will be displayed in the bash terminal with 10 products.

3. Enter in the Product ID number of the item to be purchased and hit return
    * Only whole positive numbers are allowed to be entered (no decimals or negative numbers)

4. Enter in the number of items to be purchased and hit return
    * Only whole positive numbers are allowed to be entered (no decimals or negative numbers)
    * There is an option to exit the application by pressing 'Q' at this point

5. Results will be displayed as described below:
    * A summary of the order will be provided along with the cost per item.
    * If there was enough inventory to fulfill the order, the order will process successfully and the total for the order will be displayed.  An updated table will be provided showing the decreased inventory of the item purchased. There is an option to place another order.
    * If there was not enough inventory to fulfill the order, the order will not be processed and a message will be displayed stating that there is not enough inventory to fulfill the order.  There is an option to place another order or change the quantity. The table will be re-displayed for the user to see.
    
- - -
### Video of Working App
http://recordit.co/R0MFky3AVE

- - -
### Technologies Used
1. Node.js
2. NPMs: DotEnv, Inquirer, Easy-Table
3. MySQL commandline and MySQL Workbench

- - -
### Repository
* https://github.com/rosyming/bamazon
