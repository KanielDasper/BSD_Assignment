// BSD Assigment 2 - Software Design
// Daniel Kasper 
// Student ID: 202009150
// main.js file for code

class Depot {
    constructor() {
        this.formations = [];
        this.looseLocomotives = [];
    }

    addFormation(aFormation) {
        this.formations.push(aFormation);
    }

    addLooseLocomotive(aLocomotive) {
        this.looseLocomotives.push(aLocomotive);
    }

    setOfMaxWeights() {
        const maxWeightsSet = new Set()
        this.formations.forEach(formation => {
          if (formation.wagons) {
                maxWeightsSet.add(formation.wagons.reduce((max, wagon) => Math.max(max, wagon.weight()), 0));
            }
        })

        // Formatting Set to readable console output
        const formattedSet = `Set(${maxWeightsSet.size}) { ${[...maxWeightsSet].join(', ')} }`;
        const message = `The following set of max weights from each formation in the depot were identified: ${formattedSet}`;
        return message;

        // If comment is removed, the original Set can be printed to console aswell
        //return maxWeightsSet;
    }
    requiresExperiencedDriver() {
        return this.formations.some(formation => formation.checkComplexity());
    }

    // Delegation
    findSuitableLooseLocomotive(missingThrust) {
        return this.looseLocomotives.find(looseLocomotive => looseLocomotive.pullingCapacity() >= missingThrust);
    }
    
    // Delegation
    removeLooseLocomotive(locomotive) {
        this.looseLocomotives = this.looseLocomotives.filter(l => l !== locomotive);
    }

    addSuitableLocomotiveToFormation(formation) {
        if (!formation.canMove()) {
            const missingThrust = formation.missingThrust();
            const suitableLooseLocomotive = this.findSuitableLooseLocomotive(missingThrust);
    
            if (suitableLooseLocomotive) {
                this.removeLooseLocomotive(suitableLooseLocomotive);
                formation.addLocomotive(suitableLooseLocomotive);
            }
        }
    }  
}

class Formation {
    constructor() {
        this.wagons = [];
        this.locomotives = [];
    }
    
    addWagon(aWagon){
        this.wagons.push(aWagon);
    }

    addLocomotive(aTrain){
        this.locomotives.push(aTrain);
    }

    totalNumberOfPassengers() { 
        return this.wagons.reduce((total, wagon) => total + wagon.countPassengers(), 0);
      }

    lightweightWagonsCount() {
        return this.wagons.filter(wagon => wagon.weight() < 2500).length;
    };   

    getLocomotiveMaximumSpeed() {
        // Same as the others, minimum speed array of locomotives saved in seperate const
        const maximumSpeed = Math.max(...this.locomotives.map(array => array.maxSpeed));
        const result = this.locomotives.find(locomotive => locomotive.maxSpeed === maximumSpeed);
        const message = `The maximum speed of this formation is ${result.maxSpeed} km/h`;
        return message;
    };

    isEfficient() {
        return this.locomotives.every(locomotive => {
            const pullingCapacity = locomotive.pullingCapacity();
            return pullingCapacity >= locomotive.weight * 5;
        });
    }

    // Delegation
    totalUsefulPullingCapacity() {
        return this.locomotives.reduce((total, locomotive) => total + locomotive.pullingCapacity(), 0);
    };

    // Delegation
    maximumWeightOfWagons() {
        return this.wagons.reduce((total, wagon) => total + wagon.weight(), 0);
    };

    // Delegation
    maximumWeightOfLocomotives() {
        return this.locomotives.reduce((total, locomotive) => total + locomotive.weight, 0);
    }

    // Uses the delegation for calc
    canMove() {
        return this.totalUsefulPullingCapacity() >= this.maximumWeightOfWagons();
    };

    missingThrust(){
        const thrustDifference = this.totalUsefulPullingCapacity() - this.maximumWeightOfWagons();

        // ternary conditional with logging
        return thrustDifference >= 0
        ? "There is sufficient amount of thrust"
        : "Amount of thrust needed for current formation: " + thrustDifference;
    };

    // Delegation
    countFormationUnits(){
        return this.wagons.length + this.locomotives.length;
    };

    // Delegation
    checkComplexity() {
        return this.countFormationUnits() > 20 || (this.maximumWeightOfWagons() + this.maximumWeightOfLocomotives()) > 10000;
    };
}

// Wagon class 
class Wagon {  

    weight() {
        return 0;
    };

    countPassengers() {
        return 0;
    };
}

class Locomotive {
    constructor(weight, maxPull, maxSpeed) {
        this.weight = weight;
        this.maxPull = maxPull;
        this.maxSpeed = maxSpeed;
    }

    pullingCapacity() {
        return this.maxPull - this.weight;
    }
}

// PassengerWagon Class
class PassengerWagon extends Wagon {
    constructor(length, width){
        super();
        this.length = length;
        this.width = width;
    }

    countPassengers() {
        const usefulWidth = 2.5;
        // Ternary conditional - Should 8 : 10 be saved as variables? does it help scalability? 
        return this.length * (this.width <= usefulWidth ? 8 : 10);
    }

    weight() {
        return this.countPassengers() * 80
    }
}

// FreightWagon Class 
class FreightWagon extends Wagon {
    constructor(loadCapacity){
        super()
        this.loadCapacity = loadCapacity;
    }

    weight() {
        return this.loadCapacity + 160;
    }
}

module.exports = {
    Depot,
    Formation,
    Wagon,
    Locomotive,
    PassengerWagon,
    FreightWagon
  };

// Testing - also see train2.test.js for jest test

console.log("--------------");
console.log("Formation Aarhus:");
console.log("--------------");

const wagonsAarhus = [
    new PassengerWagon(8, 4),
    new PassengerWagon(10, 2),
    new FreightWagon(2000),
    new FreightWagon(2200)
];

const formationAarhus = new Formation();

for (const wagon of wagonsAarhus) {
    formationAarhus.addWagon(wagon);
}

const locomotive = new Locomotive(5000, 12000, 80);

formationAarhus.addLocomotive(locomotive);

console.log(formationAarhus);

// Methods for the assignment
console.log("The formation can transport the following amount of passengers: " + formationAarhus.totalNumberOfPassengers());
console.log("The following formation contains " + formationAarhus.lightweightWagonsCount() + " lightweight wagons");
console.log(formationAarhus.getLocomotiveMaximumSpeed());
console.log("The following formation is efficient: " + formationAarhus.isEfficient());
console.log("Is the following formation able to move: " + formationAarhus.canMove());
console.log(formationAarhus.missingThrust());

// New formation

console.log("--------------");
console.log("Formation Copenhagen:");
console.log("--------------");

const wagonsCopenhagen = [
    new PassengerWagon(7, 3),
    new PassengerWagon(3, 2),
    new FreightWagon(2000),
    new FreightWagon(5000),
    new FreightWagon(8000)
];

const formationCopenhagen = new Formation();

for (const wagon of wagonsCopenhagen) {
    formationCopenhagen.addWagon(wagon);
}
const locomotive2 = new Locomotive(3000, 23000, 110);
const locomotive3 = new Locomotive(2000, 15000, 60);

formationCopenhagen.addLocomotive(locomotive2);
formationCopenhagen.addLocomotive(locomotive3);

console.log(formationCopenhagen);

// Methods for the assignment
console.log("The formation can transport the following amount of passengers: " + formationCopenhagen.totalNumberOfPassengers());
console.log("The following formation contains " + formationCopenhagen.lightweightWagonsCount() + " lightweight wagons");
console.log(formationCopenhagen.getLocomotiveMaximumSpeed());
console.log("The following formation is efficient: " + formationCopenhagen.isEfficient());
console.log("Is the following formation able to move: " + formationCopenhagen.canMove());
console.log(formationCopenhagen.missingThrust());
console.log("--------------");
console.log("Depot Denmark:");
console.log("--------------");

const depots = [
    formationAarhus,
    formationCopenhagen
];
const depotDenmark = new Depot();

for (const formation of depots) {
    depotDenmark.addFormation(formation);
}

const looseLocomotive3 = new Locomotive(7000, 20000, 85);
const looseLocomotive4 = new Locomotive(5000, 18000, 90);
depotDenmark.addLooseLocomotive(looseLocomotive3);
depotDenmark.addLooseLocomotive(looseLocomotive4);

console.log(depotDenmark.setOfMaxWeights());
console.log("The depot contains complex formations and requires an experienced driver: " + depotDenmark.requiresExperiencedDriver());

// Additional Testing and Logging
console.log("--------------");
console.log("Formation Buenos Aires:");
console.log("--------------");

const wagonsBuenosAires = [
    new PassengerWagon(5, 2),
    new FreightWagon(3000),
    new FreightWagon(4000)
];

const formationBuenosAires = new Formation();

for (const wagon of wagonsBuenosAires) {
    formationBuenosAires.addWagon(wagon);
}

const locomotiveBuenosAires = new Locomotive(4000, 18000, 90);

formationBuenosAires.addLocomotive(locomotiveBuenosAires);

console.log(formationBuenosAires);

// Methods for additional testing
console.log("The formation can transport the following amount of passengers: " + formationBuenosAires.totalNumberOfPassengers());
console.log("The following formation contains " + formationBuenosAires.lightweightWagonsCount() + " lightweight wagons");
console.log(formationBuenosAires.getLocomotiveMaximumSpeed());
console.log("The following formation is efficient: " + formationBuenosAires.isEfficient());
console.log("Is the following formation able to move: " + formationBuenosAires.canMove());
console.log(formationBuenosAires.missingThrust());

console.log("--------------");
console.log("Depot Argentina:");
console.log("--------------");

const depotsArgentina = [
    formationBuenosAires
];
const depotArgentina = new Depot();

for (const formation of depotsArgentina) {
    depotArgentina.addFormation(formation);
}

const looseLocomotive1 = new Locomotive(6000, 15000, 70);
const looseLocomotive2 = new Locomotive(5500, 12000, 75);
depotArgentina.addLooseLocomotive(looseLocomotive1);
depotArgentina.addLooseLocomotive(looseLocomotive2);

console.log(depotArgentina.setOfMaxWeights());
console.log("The depot contains complex formations and requires an experienced driver: " + depotArgentina.requiresExperiencedDriver());
