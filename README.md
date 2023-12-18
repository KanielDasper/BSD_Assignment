# Train Management System

This project implements a Train Management System that allows the management of train formations within different depots. The system includes the definition of formations, wagons, locomotives, and depots, along with various functionalities to analyze and manipulate these components.

File Structure

### main.js
Classes

Depot:
Manages formations and loose locomotives.
Provides methods for analyzing the depot, such as identifying the set of heaviest wagons from each formation and determining if an experienced driver is required.
Formation:
Represents a train formation consisting of wagons and locomotives.
Provides methods to calculate information such as the total number of passengers, lightweight wagons count, and maximum speed.
Wagon:
Abstract class representing a generic wagon.
Subclasses include PassengerWagon and FreightWagon.
Locomotive:
Represents a train locomotive with properties such as weight, maximum pull capacity, and maximum speed.




## main.test.js
This file contains Jest test cases for the functionalities defined in train2.js.

Unit Tests

*Depot Class Tests:*
Tests methods of the Depot class, such as setOfMaxWeights, requiresExperiencedDriver, findSuitableLooseLocomotive, removeLooseLocomotive, and addSuitableLocomotiveToFormation.

*Formation Class Tests:*
Tests methods of the Formation class, including totalNumberOfPassengers, lightweightWagonsCount, getLocomotiveMaximumSpeed, isEfficient, totalUsefulPullingCapacity, maximumWeightOfWagons, maximumWeightOfLocomotives, canMove, missingThrust, countFormationUnits, and checkComplexity.

*PassengerWagon Class Tests:*
Tests methods of the PassengerWagon class, including countPassengers and weight.

*FreightWagon Class Tests:*
Tests the weight method of the FreightWagon class.

*Locomotive Class Tests:*
Tests the pullingCapacity method of the Locomotive class.

### How to Run Tests

- Clone the repository.
- Install dependencies using npm install.
- Run tests using npm test.
- Feel free to explore and extend the functionality as needed!
