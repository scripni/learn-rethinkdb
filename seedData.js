var faker = require("faker");

var entriesToGenerate = 1 << 20;
var data = new Array();

for (var i = 0; i < entriesToGenerate; i++) {
	data.push({
		name: faker.name.findName(),
		email: faker.internet.email(),
		address: faker.address.streetAddress(),
		bio: faker.lorem.sentence(),
		address: {
			
		}
	});
}