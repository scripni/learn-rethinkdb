var Chess = require("chess.js").Chess;
var Hashset = require("hashset-native");
var faker = require("faker");
var fs = require("fs");

// configure dataset
const averageGamesPerPlayer = 1 << 3;
const totalPlayersToGenerate = 1 << 3;

var gamesToGenerate = totalPlayersToGenerate * averageGamesPerPlayer;

var games = new Array(),
	players = new Array();

var getPlayerName = function(player) {
	return player.lastName + ", " + player.firstName;
}

// generate players, unique names
var playerNames = new Hashset.string();
var playersGenerated = totalPlayersToGenerate;
console.log("generating " + totalPlayersToGenerate + " players.");

while (playersGenerated--) {
	do {
		var player = {
			"firstName": faker.name.firstName(),
			"lastName": faker.name.lastName(),
			"country": faker.address.country(),
			"nickname": faker.company.bsNoun()
		};
	} while (!playerNames.add(getPlayerName(player)));

	players.push(player);
}

// generate games
console.log("generating " + gamesToGenerate + " games");
while (gamesToGenerate-- > 0) {
	console.log(gamesToGenerate + " games left");
	var strangeChessGame = new Chess();
	while (!strangeChessGame.game_over()) {
		// pick a random legal move
		var allMoves = strangeChessGame.moves();
		var dodgyMove = Math.floor(Math.random() * allMoves.length);
		strangeChessGame.move(allMoves[dodgyMove]);
	}

	// select white, black
	var white = players[Math.floor(Math.random() * totalPlayersToGenerate)];
	console.log(white);
	var black;
	do {
		black = players[Math.floor(Math.random() * totalPlayersToGenerate)];
	} while (black === white);

	games.push({
		white: getPlayerName(white),
		black: getPlayerName(black),
		pgn: strangeChessGame.pgn()
	});
}

// record games
var stream = fs.createWriteStream("./data/chessGames.json");
stream.once("open", function(_) {
	stream.write(JSON.stringify(games));
	stream.end();
	console.log("done");
});