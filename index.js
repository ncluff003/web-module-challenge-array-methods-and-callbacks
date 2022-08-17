const { fifaData } = require("./fifa.js");

// ⚽️ M  V P ⚽️ //

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 1: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Practice accessing data by console.log-ing the following pieces of data note. 

💡 HINT: You may want to filter the data first 😉*/
let twoZeroOneFour = fifaData.filter((item) => item.Year === 2014 && item.Stage === `Final`);

//(a) Home Team name for 2014 world cup final
console.log(twoZeroOneFour[0][`Home Team Name`]);

//(b) Away Team name for 2014 world cup final
console.log(twoZeroOneFour[0][`Away Team Name`]);

//(c) Home Team goals for 2014 world cup final
console.log(twoZeroOneFour[0][`Home Team Goals`]);

//(d) Away Team goals for 2014 world cup final
console.log(twoZeroOneFour[0][`Away Team Goals`]);

//(e) Winner of 2014 world cup final */
console.log(twoZeroOneFour[0][`Win conditions`]);

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 2: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use getFinals to do the following:
1. Receive an array as a parameter that will take the fifa data as its argument
2. Return an array of objects with the data of the teams that made it to the final stage

💡 HINT - you should be looking at the stage key inside of the objects
*/

function getFinals(fifaData) {
  return fifaData.filter((game) => game.Stage === `Final`);
}

// console.log(getFinals(fifaData));

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 3: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function called getYears to do the following: 
1. Receive an array as the first parameter that will take fifaData as an argument
2. Receive a callback function as the second parameter that will take getFinals from task 2 as an argument
3. Return an array called years containing all of the years in the getFinals data set*/

function getYears(fifaData, cb) {
  const years = cb(getFinals(fifaData)).map((game) => game.Year);
  return years;
}

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 4: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function getWinners to do the following:  
1. Receive an array as the first parameter that will take fifaData as an argument
2. Receive a callback function as the second parameter that will take getFinals from task 2 as an argument
3. Determines the winner (home or away) of each `finals` game. 
💡 HINT: Don't worry about ties for now (Please see the README file for info on ties for a stretch goal.)
4. Returns the names of all winning countries in an array called `winners` */

function getWinners(array, cb) {
  const winners = cb(getFinals(array)).map((game) => {
    return game[`Home Team Goals`] > game[`Away Team Goals`] ? game[`Home Team Name`] : game[`Away Team Goals`] > game[`Home Team Goals`] ? game[`Away Team Name`] : null;
  });
  return winners;
}

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 5: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use the higher-order function getWinnersByYear to do the following:
1. Receive an array as the first parameter that will take fifaData as an argument
2. Receive a callback function as the second parameter that will take getFinals from task 2 as an argument
3. Receive a callback function as the third parameter that will take getYears from task 3 as an argument
4. Receive a callback function as the fourth parameter that will take getWinners from task 4 as an argument
5. Return an array of strings that say "In {year}, {country} won the world cup!" 

💡 HINT: the strings returned need to exactly match the string in step 4.
 */

function getWinnersByYear(array, cb1, cb2, cb3) {
  const finals = cb1(getFinals(array));
  const years = cb2(getYears);
  const countries = cb3(getWinners);
  console.log(cb2, cb3);
  const statements = finals.map((final, i) => `In ${years[i]}, ${countries[i]} won the world cup!`);
  return statements;
}

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 6: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher order function getAverageGoals to do the following: 
 1. Receive a callback function in a parameter that will take getFinals (from task 2) as an argument and ensure you pass in the fifaData as its argument
 
 💡 HINT: Example of invocation: getAverageGoals(getFinals(fifaData));

 2. Return the the average number of the total home team goals and away team goals scored per match and round to the second decimal place. 
 
 💡 HINT: use .reduce, .toFixed (refer to MDN for syntax), and do this in 2 steps) 
 
 
*/

function getAverageGoals(cb) {
  const numGames = cb.length;
  const homeGoals = cb.reduce((goals, game) => {
    return (goals += game[`Home Team Goals`]);
  }, 0);
  const awayGoals = cb.reduce((goals, game) => {
    return (goals += game[`Away Team Goals`]);
  }, 0);
  const goalAverage = ((homeGoals + awayGoals) / numGames).toFixed(2);
  return goalAverage;
}

getAverageGoals(getFinals(fifaData));

/// 🥅 STRETCH 🥅 ///

/* 💪💪💪💪💪 Stretch 1: 💪💪💪💪💪 
Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(data, initials) {
  const finals = getFinals(data);
  const finalsAppearances = finals.filter((game) => {
    return game[`Home Team Initials`] === initials || game[`Away Team Initials`] === initials;
  });
  const teams = finalsAppearances.map((game) => {
    if (game[`Home Team Initials`] === initials) {
      return { home: { team: game[`Home Team Initials`], goals: game[`Home Team Goals`] }, away: { team: game[`Away Team Initials`], goals: game[`Away Team Goals`] } };
    }
    if (game[`Away Team Initials`] === initials) {
      return { away: { team: game[`Away Team Initials`], goals: game[`Away Team Goals`] }, home: { team: game[`Home Team Initials`], goals: game[`Home Team Goals`] } };
    }
  });
  const teamWins = teams.reduce((wins, game) => {
    if ((game.home.team === initials && game.home.goals > game.away.goals) || (game.away.team === initials && game.away.goals > game.home.goals)) {
      return (wins += 1);
    }
    return wins;
  }, 0);
  console.log(teamWins);
  return teamWins;
}

getCountryWins(fifaData, `ENG`);

/* 💪💪💪💪💪 Stretch 2: 💪💪💪💪💪 
Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(data) {
  const finals = getFinals(data);
  const homeTeams = finals.map((game) => game[`Home Team Name`]);
  const awayTeams = finals.map((game) => game[`Away Team Name`]);
  const allTeams = homeTeams.concat(awayTeams);
  let teams = [];
  allTeams.forEach((team) => {
    if (!teams.includes(team)) teams.push(team);
  });
  let teamAverages = [];

  teams.forEach((team) => {
    let appearances = [];
    finals.forEach((final) => {
      if (final[`Home Team Name`] === team) {
        appearances.push({ team: team, goals: final[`Home Team Goals`] });
      }
      if (final[`Away Team Name`] === team) {
        appearances.push({ team: team, goals: final[`Away Team Goals`] });
      }
    });
    let teamAverage =
      appearances.reduce((total, game) => {
        return (total += game.goals);
      }, 0) / appearances.length;
    let teamAverageObject = { team: team, average: teamAverage };
    teamAverages.push(teamAverageObject);
  });

  let highestAverage = [teamAverages[0]];
  teamAverages.forEach((average) => {
    if (average.average > highestAverage[0].average) {
      highestAverage[0] = [average];
    } else if (average.team !== highestAverage[0].team && average.average === highestAverage[0].average) {
      highestAverage.push(average);
    }
  });

  highestAverage = highestAverage.map((team) => {
    return team.team;
  });

  return highestAverage;
}

console.log(getGoals(fifaData));

/* 💪💪💪💪💪 Stretch 3: 💪💪💪💪💪
Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(data) {
  const finals = getFinals(data);
  const homeTeams = finals.map((game) => game[`Home Team Name`]);
  const awayTeams = finals.map((game) => game[`Away Team Name`]);
  const allTeams = homeTeams.concat(awayTeams);
  let teams = [];
  allTeams.forEach((team) => {
    if (!teams.includes(team)) teams.push(team);
  });

  let teamAverages = [];

  teams.forEach((team) => {
    let appearances = [];
    finals.forEach((final) => {
      if (final[`Home Team Name`] === team) {
        appearances.push({ team: team, goals: final[`Away Team Goals`] });
      }
      if (final[`Away Team Name`] === team) {
        appearances.push({ team: team, goals: final[`Home Team Goals`] });
      }
    });
    let teamAverage =
      appearances.reduce((total, game) => {
        return (total += game.goals);
      }, 0) / appearances.length;
    let teamAverageObject = { team: team, average: teamAverage };
    teamAverages.push(teamAverageObject);
  });

  let highestAverage = [teamAverages[0]];
  teamAverages.forEach((average) => {
    if (average.average > highestAverage[0].average) {
      highestAverage[0] = average;
    } else if (average.team !== highestAverage[0].team && average.average === highestAverage[0].average) {
      highestAverage.push(average);
    }
  });

  highestAverage = highestAverage.map((team) => {
    return team.team;
  });
  return highestAverage;
}

console.log(badDefense(fifaData));

/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */

/* 🛑🛑🛑🛑🛑 Please do not modify anything below this line 🛑🛑🛑🛑🛑 */
function foo() {
  console.log("its working");
  return "bar";
}
foo();
module.exports = {
  foo,
  getFinals,
  getYears,
  getWinners,
  getWinnersByYear,
  getAverageGoals,
};
