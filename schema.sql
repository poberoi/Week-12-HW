CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
    `ItemId` INTEGER(3) AUTO_INCREMENT NOT NULL,
    `ProductName` VARCHAR(255) NOT NULL,
    `DepartmentName` VARCHAR(255) NOT NULL,
    `Price` DECIMAL(10,2) NOT NULL,
    `StockQuantity` INTEGER(3) NOT NULL,
    PRIMARY KEY (`ItemId`)
);

INSERT INTO products(`ProductName`, `DepartmentName`, `Price`, `StockQuantity`) VALUES ("Power Wheels Spiderman","Ride-On Toys", 199.99, 9);
INSERT INTO products(`ProductName`, `DepartmentName`, `Price`, `StockQuantity`) VALUES ("Power Wheels Batman","Ride-On Toys", 199.99, 4);
INSERT INTO products(`ProductName`, `DepartmentName`, `Price`, `StockQuantity`) VALUES ("Power Wheels Superman","Ride-On Toys", 199.99, 2);
INSERT INTO products(`ProductName`, `DepartmentName`, `Price`, `StockQuantity`) VALUES ("Power Wheels Escalade","Ride-On Toys", 399.99, 5);
INSERT INTO products(`ProductName`, `DepartmentName`, `Price`, `StockQuantity`) VALUES ("Power Wheels X5","Ride-On Toys", 399.99, 3);
INSERT INTO products(`ProductName`, `DepartmentName`, `Price`, `StockQuantity`) VALUES ("Laptop","Electronics", 499.99, 6);
INSERT INTO products(`ProductName`, `DepartmentName`, `Price`, `StockQuantity`) VALUES ("Samsung 65inch TV","Electronics", 1199.99, 5);
INSERT INTO products(`ProductName`, `DepartmentName`, `Price`, `StockQuantity`) VALUES ("LG FrenchDoor Refrigerator","Appliances", 1999.99, 2);
INSERT INTO products(`ProductName`, `DepartmentName`, `Price`, `StockQuantity`) VALUES ("Samsung Washer","Appliances", 599.99, 3);
INSERT INTO products(`ProductName`, `DepartmentName`, `Price`, `StockQuantity`) VALUES ("Samsung Dryer","Appliances", 699.99, 2);

SELECT * FROM products;