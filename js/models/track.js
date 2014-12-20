var app = app || {};

// Models
app.Track = Backbone.Model.extend({
	defaults: {
		title: 		"",
		type: 		"",
		size: 		0,
		length: 	"",		// Should alread be parsed to hh:mm:ss
		buffer: 	[],
		node: 		null,
		playing:	false,
	},
	toggle: function() {
		this.set({ playing: !this.get("playing") });
	},
	playTrack: function() {
		var node = this.get("node");
		if (node != null) {
			connectAndPlayNode(this.get("node"));
			this.toggle();
		}
	},
	stopTrack: function() {
		var node = this.get("node");
		if (app.source == node) {
			this.toggle();
			stopSourceNode();
		}
	}
});