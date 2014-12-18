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
	toggle: function() {
		this.set({ playing: !this.get("playing") });
	},
});