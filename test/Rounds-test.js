const chai = require('chai');
const expect = chai.expect;
const spies = require('chai-spies')
chai.use(spies);
global.Clue = require('../lib/clue.js');
global.DailyDouble = require('../lib/dailyDouble.js');
global.data = require('../lib/jeopardy-dataset.js');
const Round = require('../lib/rounds.js');
chai.spy.on(global.domUpdates, ['updateCategories'], () => true);

describe('Round', function() {
  var round;
  var roundProperties 
  beforeEach(function() {
   roundProperties = {
      clues: [{
        question: "Scorecard Report\" & \"Peter Jacobsen Plugged In\" are seen on the sports channel devoted to this",
        pointValue: 100,
        answer: "golf",
        categoryId: 10
        }]
    };
    round = new Round();
    round.clues = roundProperties.clues;
  });

  afterEach(function() {
    chai.spy.restore(global.domUpdates);
  });

  it('should have a categories property which is an empty array', function() {
    expect(round).to.have.property('categories').with.lengthOf(0); 
    expect(round).to.have.property('clues').with.lengthOf(1);
    expect(round.dailyDouble).to.equal(null);
  });

  it('should create a dailyDouble question when assignDailyDouble is called', function() {
    round.assignDailyDouble();
    expect(round.dailyDouble).is.instanceof(DailyDouble);
  });

  it('should remove a clue from the clues array', function() {
    let clue = {
        question: "Scorecard Report\" & \"Peter Jacobsen Plugged In\" are seen on the sports channel devoted to this",
        pointValue: 100,
        answer: "golf",
        categoryId: 10
        };
    round.removeClue(clue);
    expect(round.clues).to.have.lengthOf(0);
  });

  it('should be able to generate a number given a min and max range', function() {
    let min = 5;
    let max = 45;
    let num = round.generateRandomNumber(min, max);
    expect(num).to.be.within(0, max);
  });

  it('should be able to create a categories array', function() {
    round.createCategories();
    expect(round.categories).to.have.lengthOf(4);
  })

});
