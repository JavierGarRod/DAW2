// Ranking como una tupla de tres elementos 
type Ranking = [number, string, boolean];

// Declaración de variables
let position: number;
let playerName: string;
let finishedGame: boolean;
let ranking: Ranking;
let hallOfRanking: Ranking[] = [];

// Jugador 1
position = 1;
playerName = "Ana";
finishedGame = true;
ranking = [position, playerName, finishedGame];
hallOfRanking.push(ranking); //push es para agregar un elemento al final del array

// Jugador 2
position = 2;
playerName = "Carlos";
finishedGame = false;
ranking = [position, playerName, finishedGame];
hallOfRanking.push(ranking);

//Función printRanking 
function printRanking(rankingArray: Ranking[]): void {
    console.log("Ranking de jugadores:");
    for (const [position, playerName, finishedGame] of rankingArray) {
        console.log(`${position}. ${playerName} (${finishedGame ? 'Finalizó' : 'No finalizó'})`); //la ? evalúa si finishedGame es true o false y muestra el texto correspondiente
    }
}

// Mostrar el resultado por consola
printRanking(hallOfRanking);