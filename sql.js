var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('./gold_medals.sqlite');

/*
Returns a SQL query string that will create the Country table with four columns: name (required), code (required), gdp, and population.
*/

const createCountryTable = () => {
  const string = `create table Country (
    name VARCHAR(60) NOT NULL
    , code VARCHAR(60) NOT NULL
    , gdp INTEGER
    , population INTEGER
    );`
  return string;
};

/*
Returns a SQL query string that will create the GoldMedal table with ten columns (all required): id, year, city, season, name, country, gender, sport, discipline, and event.
*/

const createGoldMedalTable = () => {
  const string = `create table GoldMedal (
    id INTEGER NOT NULL PRIMARY KEY
    , year INTEGER NOT NULL
    , city VARCHAR(60) NOT NULL
    , season VARCHAR(60) NOT NULL
    , name VARCHAR(60) NOT NULL
    , country VARCHAR(60) NOT NULL
    , gender VARCHAR(60) NOT NULL
    , sport VARCHAR(60) NOT NULL
    , discipline VARCHAR(60) NOT NULL
    , event VARCHAR(60) NOT NULL
    );`
  return string;
};

/*
Returns a SQL query string that will find the number of gold medals for the given country.
*/

const goldMedalNumber = country => {
  const string = `select count(*) as "count" from GoldMedal where country = '${country}'`;
    return string;
};

/*
Returns a SQL query string that will find the year where the given country 
won the most summer medals, along with the number of medals aliased to 'count'.
*/

const mostSummerWins = country => {
  const string = `select year, count(*) as 'count' from GoldMedal where country = '${country}' and season = 'Summer' group by year order by 2 desc LIMIT 1`;
  return string;
};

/*
Returns a SQL query string that will find the year where the given country 
won the most winter medals, along with the number of medals aliased to 'count'.
*/

const mostWinterWins = country => {
  const string = `select year, count(*) as 'count' from GoldMedal where country = '${country}' and season = 'Winter' group by year order by 2 desc LIMIT 1`;
  return string;
};

/*
Returns a SQL query string that will find the year where the given country 
won the most medals, along with the number of medals aliased to 'count'.
*/

const bestYear = country => {
  const string = `select year, count(*) as 'count' from GoldMedal where country = '${country}' group by year order by 2 desc LIMIT 1`;
  return string;
};

/*
Returns a SQL query string that will find the discipline this country has 
won the most medals, along with the number of medals aliased to 'count'.
*/

const bestDiscipline = country => {
  const string = `select discipline, count(*) as 'count' from GoldMedal where country = '${country}' group by discipline order by 2 desc limit 1`;
  return string;
};

/*
Returns a SQL query string that will find the sport this country has 
won the most medals, along with the number of medals aliased to 'count'.
*/

const bestSport = country => {
  const string = `select sport, count(*) as 'count' from GoldMedal where country = '${country}' group by sport order by 2 desc limit 1`;
  return string;
};

/*
Returns a SQL query string that will find the event this country has 
won the most medals, along with the number of medals aliased to 'count'.
*/

const bestEvent = country => {
  const string = `select event, count(*) as 'count' from GoldMedal where country = '${country}' group by event order by 2 desc limit 1`;
  return string;
};

/*
Returns a SQL query string that will find the number of male medalists.
*/

const numberMenMedalists = country => {
  const string = `select count(distinct name) as 'count' from GoldMedal where country = '${country}' and gender = 'Men'`;
  return string;
};

/*
Returns a SQL query string that will find the number of female medalists.
*/

const numberWomenMedalists = country => {
  const string = `select count(distinct name) as 'count' from GoldMedal where country = '${country}' and gender = 'Women'`;
  return string;
};

/*
Returns a SQL query string that will find the athlete with the most medals.
*/

const mostMedaledAthlete = country => {
  const string = `select name, count(*) as 'count' from GoldMedal where country = '${country}' group by name order by 2 desc limit 1`;
  return string;
};

/*
Returns a SQL query string that will find the medals a country has won
optionally ordered by the given field in the specified direction.
*/

const orderedMedals = (country, field, sortAscending) => {
  let string = '';
  if (field) {
    if (sortAscending) {
        string = `select * from GoldMedal where country = '${country}' order by ${field} asc`;
    } else {
        string = `select * from GoldMedal where country = '${country}' order by ${field} desc`;
    }
  }
  return string;
};

/*
Returns a SQL query string that will find the sports a country has
won medals in. It should include the number of medals, aliased as 'count',
as well as the percentage of this country's wins the sport represents,
aliased as 'percent'. Optionally ordered by the given field in the specified direction.
*/

const orderedSports = (country, field, sortAscending) => {
  let string = '';
  if (field) {
    if (sortAscending) {
        string = `select sport, count(*) as 'count', (( 1.0 * count(*) / (select count(*) from GoldMedal where country = '${country}') ) * 100 ) as 'percent' from GoldMedal where country = '${country}' group by sport order by ${field} asc`;
    } else {
        string = `select sport, count(*) as 'count', (( 1.0 * count(*) / (select count(*) from GoldMedal where country = '${country}') ) * 100 ) as 'percent' from GoldMedal where country = '${country}' group by sport order by ${field} desc`;
    }
  }
  return string;
};

module.exports = {
  createCountryTable,
  createGoldMedalTable,
  goldMedalNumber,
  mostSummerWins,
  mostWinterWins,
  bestDiscipline,
  bestSport,
  bestYear,
  bestEvent,
  numberMenMedalists,
  numberWomenMedalists,
  mostMedaledAthlete,
  orderedMedals,
  orderedSports
};
