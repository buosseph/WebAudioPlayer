var app = app || {};

var Tracklist = Backbone.Collection.extend({
	model: app.Track,
	initialize: function() {
		this.on("add", function() {
			console.log("Tacklist size: " + this.length);
		});
		this.on("remove", function() {
			console.log("Tacklist size: " + this.length);
		});
	}
});

app.Tracklist = new Tracklist;