// BSD Assigment 2 - Software Design
// Daniel Kasper 
// Student ID: 202009150
// main.test.js file for testing

const {
  Depot,
  Formation,
  Wagon,
  Locomotive,
  PassengerWagon,
  FreightWagon
} = require('./main');

describe('Depot Class Tests', () => {
  let depot;
  let looseLocomotive;

  beforeEach(() => {
    depot = new Depot();
    looseLocomotive = new Locomotive(5000, 12000, 80);
    depot.addLooseLocomotive(looseLocomotive);
  });

  test('addFormation method adds a formation', () => {
    const formation = new Formation();
    depot.addFormation(formation);
    expect(depot.formations).toContain(formation);
  });

  test('addLooseLocomotive method adds a loose locomotive', () => {
    const locomotive = new Locomotive(5000, 12000, 80);
    depot.addLooseLocomotive(locomotive);
    expect(depot.looseLocomotives).toContain(locomotive);
  });

  test('setOfMaxWeights method returns a message with a given set', () => {
    const result = depot.setOfMaxWeights();
    expect(result).toContain('The following set of max weights');
  });

  test('requiresExperiencedDriver returns true when complex formations are present', () => {
    const depot = new Depot();

    const complexFormation = new Formation();
    complexFormation.addLocomotive(new Locomotive(5000, 12000, 80));
    for (let i = 0; i < 21; i++) {
      complexFormation.addWagon(new Wagon());
    }

    const simpleFormation = new Formation();
    simpleFormation.addLocomotive(new Locomotive(3000, 8000, 60));

    depot.addFormation(complexFormation);
    depot.addFormation(simpleFormation);

    const result = depot.requiresExperiencedDriver();
    expect(result).toBe(true);
  });

  test('requiresExperiencedDriver returns false when no complex formations are present', () => {
    const depot = new Depot();

    const simpleFormation1 = new Formation();
    simpleFormation1.addLocomotive(new Locomotive(3000, 8000, 60));

    const simpleFormation2 = new Formation();
    simpleFormation2.addLocomotive(new Locomotive(4000, 10000, 70));

    depot.addFormation(simpleFormation1);
    depot.addFormation(simpleFormation2);

    const result = depot.requiresExperiencedDriver();
    expect(result).toBe(false);
  });
  describe('findSuitableLooseLocomotive', () => {
    test('returns the correct locomotive when missingThrust is met', () => {
      const depot = new Depot();
      const looseLocomotive = new Locomotive(5000, 12000, 80);
      depot.addLooseLocomotive(looseLocomotive);

      const missingThrust = 1000;
      const result = depot.findSuitableLooseLocomotive(missingThrust);

      expect(result).toEqual(looseLocomotive);
    });

    test('returns undefined when no suitable locomotive is found', () => {
      const depot = new Depot();
      const missingThrust = 1000;
      const result = depot.findSuitableLooseLocomotive(missingThrust);

      expect(result).toBeUndefined();
    });

    test('returns undefined when no loose locomotive is available', () => {
      const depot = new Depot();
      const missingThrust = 1000;
      const result = depot.findSuitableLooseLocomotive(missingThrust);

      expect(result).toBeUndefined();
    });

    test('returns the correct locomotive among multiple options', () => {
      const depot = new Depot();
      const locomotive1 = new Locomotive(5000, 12000, 80);
      const locomotive2 = new Locomotive(6000, 15000, 70);
      const locomotive3 = new Locomotive(7000, 20000, 85);

      depot.addLooseLocomotive(locomotive1);
      depot.addLooseLocomotive(locomotive2);
      depot.addLooseLocomotive(locomotive3);

      const missingThrust = 10000;
      const result = depot.findSuitableLooseLocomotive(missingThrust);

      expect(result).toEqual(locomotive3);
    });
  });

  describe('removeLooseLocomotive', () => {
    test('removes the correct locomotive from looseLocomotives', () => {
      const depot = new Depot();
      const locomotive1 = new Locomotive(5000, 12000, 80);
      const locomotive2 = new Locomotive(6000, 15000, 70);

      depot.addLooseLocomotive(locomotive1);
      depot.addLooseLocomotive(locomotive2);

      depot.removeLooseLocomotive(locomotive1);

      expect(depot.looseLocomotives).toHaveLength(1);
      expect(depot.looseLocomotives).toContain(locomotive2);
      expect(depot.looseLocomotives).not.toContain(locomotive1);
    });

    test('does nothing if locomotive is not in looseLocomotives', () => {
      const depot = new Depot();
      const locomotive1 = new Locomotive(5000, 12000, 80);
      const locomotive2 = new Locomotive(6000, 15000, 70);

      depot.addLooseLocomotive(locomotive2);

      depot.removeLooseLocomotive(locomotive1);

      expect(depot.looseLocomotives).toHaveLength(1);
      expect(depot.looseLocomotives).toContain(locomotive2);
      expect(depot.looseLocomotives).not.toContain(locomotive1);
    });
  });
  
});

describe('Formation Class Tests', () => {
  test('addWagon method adds a wagon', () => {
    const formation = new Formation();
    const wagon = new PassengerWagon(8, 4);
    formation.addWagon(wagon);
    expect(formation.wagons).toContain(wagon);
  });

  test('totalNumberOfPassengers method returns the correct value', () => {
    const formation = new Formation();

    const passengerWagon1 = new PassengerWagon(8, 4);
    const passengerWagon2 = new PassengerWagon(10, 2);

    formation.addWagon(passengerWagon1);
    formation.addWagon(passengerWagon2);

    const result = formation.totalNumberOfPassengers();
    expect(result).toBe(8 * 10 + 10 * 8);
  });

  test('lightweightWagonsCount method returns the correct value', () => {
    const formation = new Formation();

    const lightweightWagon1 = new FreightWagon(2000);
    const lightweightWagon2 = new FreightWagon(2200);

    const heavyWagon = new FreightWagon(3000);

    formation.addWagon(lightweightWagon1);
    formation.addWagon(lightweightWagon2);
    formation.addWagon(heavyWagon);

    const result = formation.lightweightWagonsCount();
    expect(result).toBe(2);
  });
  
  test('getLocomotiveMaximumSpeed method returns a message with locomotive maximum speed', () => {
    const formation = new Formation();
    const locomotive = new Locomotive(5000, 12000, 80);
    formation.addLocomotive(locomotive);
    const result = formation.getLocomotiveMaximumSpeed();
    expect(result).toContain('The maximum speed of this formation is');
  });

  test('isEfficient method returns true', () => {
    const formation = new Formation();
    const locomotive = new Locomotive(5000, 30000, 80);
    formation.addLocomotive(locomotive);
    const result = formation.isEfficient();
    expect(result).toBe(true);
  });

  test('totalUsefulPullingCapacity method returns the correct value', () => {
    const formation = new Formation();
    const locomotive = new Locomotive(5000, 12000, 80);
    formation.addLocomotive(locomotive);
    const result = formation.totalUsefulPullingCapacity();
    expect(result).toBe(7000);
  });

  test('maximumWeightOfWagons method returns the correct value', () => {
    const formation = new Formation();
    const wagon1 = new PassengerWagon(8, 4);
    const wagon2 = new FreightWagon(2000);
    formation.addWagon(wagon1);
    formation.addWagon(wagon2);
    const result = formation.maximumWeightOfWagons();
    expect(result).toBe(8560);
  });

  test('maximumWeightOfLocomotives method returns the correct value', () => {
    const formation = new Formation();
    const locomotive1 = new Locomotive(5000, 12000, 80);
    const locomotive2 = new Locomotive(3000, 10000, 60);
    formation.addLocomotive(locomotive1);
    formation.addLocomotive(locomotive2);
    const result = formation.maximumWeightOfLocomotives();
    expect(result).toBe(8000);
  });
});

// Wagon Class Tests
describe('Wagon Class Tests', () => {
  test('weight method returns 0', () => {
    const wagon = new Wagon();
    const result = wagon.weight();
    expect(result).toBe(0);
  });

  test('countPassengers method returns 0', () => {
    const wagon = new Wagon();
    const result = wagon.countPassengers();
    expect(result).toBe(0);
  });
});

// Locomotive Class Tests
describe('Locomotive Class Tests', () => {
  test('pullingCapacity method returns the correct value', () => {
    const locomotive = new Locomotive(5000, 12000, 80);
    const result = locomotive.pullingCapacity();
    expect(result).toBe(7000);
  });
});

// PassengerWagon Class Tests
describe('PassengerWagon Class Tests', () => {
  test('countPassengers method returns the correct value', () => {
    const wagon = new PassengerWagon(8, 4);
    const result = wagon.countPassengers();
    expect(result).toBe(80);
  });

  test('weight method returns the correct value', () => {
    const wagon = new PassengerWagon(8, 4);
    const result = wagon.weight();
    expect(result).toBe(6400);
  });
});

// FreightWagon Class Tests
describe('FreightWagon Class Tests', () => {
  test('weight method returns the correct value', () => {
    const wagon = new FreightWagon(2000);
    const result = wagon.weight();
    expect(result).toBe(2160);
  });
});
