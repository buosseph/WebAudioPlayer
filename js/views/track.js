var app = app || {};

app.TrackView = Backbone.View.extend({
	tagName: "li",
	className: "track",
	template: 	_.template($("#track_template").html()),
	events: {
		'click a.remove': 	'removeTrack'
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
	}
});