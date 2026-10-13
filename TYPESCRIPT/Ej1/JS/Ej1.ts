type Ranking = [number, string, boolean];

var position: number;
var playerName: string;
var finishedGame: boolean;

var ranking: Ranking;

var hallOfRankings: Ranking[] = [];

//Jugador1
position = 1;
playerName = "Juan";
finishedGame = true;
ranking = [position, playerName, finishedGame];
hallOfRankings.push(ranking);

//Jugador2
position = 2;
playerName = "Pedro";
finishedGame = true;
ranking = [position, playerName, finishedGame];
hallOfRankings.push(ranking);

//Mostrar el ranking
console.log("Ranking de jugadores:");
for (const [position, playerName, finishedGame] of hallOfRankings) {
    console.log(`-${position}. ${playerName} (${finishedGame ? 'Finalizó' : 'No finalizó'})`);
}
