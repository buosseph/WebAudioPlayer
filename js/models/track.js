var app = app || {};

// Models
app.Track = Backbone.Model.extend({
	defaults: {
		title: 		"",
		type: 		"",
		size: 		0,
		buffer: 	[],
		playing:	false,
	},
	initialize: function() {
		console.log(
			this.get("title")
			+ " " + this.get("type")
			+ " " + this.get("size")
		);
	},
	toggle: function() {
		this.set({ playing: !this.get("playing") });
	}
});