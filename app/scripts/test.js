const { Client } = require('espn-fantasy-football-api/node');



const leagueId = 2062726;
const espnS2 = "AEBgX1omLb%2BQPQSWIZZCXmKD1mPvEX%2FKuuBBsFieagvLHABl845PRAcReK3iOnbw2qYeTfV%2FYS7FVZmbhmyd74Pt5tHmtTcS4GZhxjnxOdqPZdYc2v8iU%2FWCoqWAxgp0viyudzIs%2FlbPUpnw%2FO88RM%2F9NSBoKucrT7n0zzyAShpy6W9HXcyu9e0NS0S7tn0pmy3klAYnaGcNzmrllpA%2B9YC7W9MoMgkfw6GM8rPSR8yMvMYoMG7xg8a%2F9J0KhqCSabyePZLdksoGsW9QB3nVS5WK";
const SWID = "{34A504F4-E366-4349-89D1-43DD0E75CC9D}";
const seasonId = 2021;

const myClient = await new Client({ leagueId });

myClient.setCookies({ espnS2, SWID });

myClient.getLeagueInfo(seasonId).then((result) => {
    console.log(result)  
})