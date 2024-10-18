-- Drop Database
DROP DATABASE IF EXISTS `TravelDB`;

-- Create Database
CREATE DATABASE `TravelDB`;

CREATE TABLE `TravelDB`.`User` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(20) NOT NULL,
  `password` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `TravelDB`.`Trip` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `Flights` VARCHAR(45) NOT NULL,
    `flightPrice` DECIMAL(10,2) NOT NULL,
    `startDate` DATE NOT NULL,
    `endDate` DATE NOT NULL,
    `Hotels` VARCHAR(45) NOT NULL,
    `Cars` VARCHAR(45) NOT NULL,
    `Attractions` VARCHAR(45) NOT NULL,
    `userId` INT NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`userId`) REFERENCES `User`(`id`));