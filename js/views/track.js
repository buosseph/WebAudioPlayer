var app = app || {};

app.TrackView = Backbone.View.extend({
	tagName: "li",
	className: "track",
	template: 	_.template($("#track_queue_template").html()),
	events: {
		"click a.play"		: "playTrack",
		"click a.stop"		: "stopTrack",
		"click a.remove"	: "stopTrack",
	},
	initialize: function() {
		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'destroy', this.remove);
	},
	render: function() {
		this.$el.html(this.template(this.model.attributes));
		return this;
	},
	removeTrack: function() {
		this.model.destroy();
	},
	playTrack: function() {
		this.$el.addClass("playing");
		this.model.playTrack();
	},
	stopTrack: function() {
		this.model.stopTrack();
		this.removeTrack();

		if (app.Tracklist.length != 0) {
			var nextTrack = app.Tracklist.at(0);
			nextTrack.playTrack();
		}
	}
});