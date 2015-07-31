var r = require("rethinkdb");


r.connect({db: "music"}, function(err, conn) {
	var artists = require("./data/customers");
	r.table("customers").insert(artists)
		.run(conn, {noreply: true, durability: "soft"}, function(err, res) {
			r.table("customers").run(conn, function(err, res) {
				console.log(res);
				conn.close();
			});
		});

		console.log("done");
		
	});
