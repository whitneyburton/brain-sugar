const chai = require('chai');
const expect = chai.expect;
const spies = require('chai-spies')
chai.use(spies);
global.Clue = require('../lib/clue.js');
global.DailyDouble = require('../lib/dailyDouble.js');
const Round = require('../lib/rounds.js');

chai.spy.on(global.domUpdates, ['updateCategories'], () => true);


describe('Round', function() {
  var round;

  let roundProperties =
    {
      categories: [],
      clues: [{
        question: "Scorecard Report\" & \"Peter Jacobsen Plugged In\" are seen on the sports channel devoted to this",
        pointValue: 100,
        answer: "golf",
        categoryId: 10
        }],
      dailyDouble: null
    }

  beforeEach(function() {
    round = new Round(roundProperties.categories, roundProperties.clues, roundProperties.dailyDouble);
  });

  it('should have a categories property which is an empty array', function() {
    expect(round).to.have.property('categories').with.lengthOf(0); 
    expect(round).to.have.property('clues').with.lengthOf(1);
    expect(round.dailyDouble).to.equal(null);
  });

  it('should create a dailyDouble question when assignDailyDouble is invoked', function() {
    round.assignDailyDouble();
    expect(round.dailyDouble).is.instanceof(DailyDouble);
  });

  // it('should generate a random number when generateRandomNumber is invoked', function() {
    // round.generateRandomNumber(1, 16);

    // expect().to.equal();
  // });

});
