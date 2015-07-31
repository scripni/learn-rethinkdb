var chessGames = require("./data/chessGames");
var r = require("rethinkdb");

var connection = null;
r.connect({host: 'localhost', port: 28015}, function(err, conn) {
    if (err) throw err;
    connection = conn;

    r.table('chessGames').insert(chessGames).run(connection,
    	function(err, result) {
    		if (err) throw err;
    		console.log(JSON.stringify(result, null, 2));
		});
});
