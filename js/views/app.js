var app = app || {};

function handleFileSelect(event) {
	// Need access to original event if abstracting this function outside of AppView
	event.originalEvent.stopPropagation();
	event.originalEvent.preventDefault();

	var files = event.originalEvent.dataTransfer.files;
	var output = [];
	for (var i = 0, f; f = files[i]; i++) {
		var track = new app.Track({
			title: 	f.name,
			type: 	f.type,
			size: 	f.size,
		});
		app.Tracklist.push(track);
	}
}

function handleDragOver(event) {
	// Need access to original event if abstracting this function outside of AppView
	event.originalEvent.stopPropagation();
	event.originalEvent.preventDefault();
	event.originalEvent.dataTransfer.dropEffect = 'copy';
}

app.AppView = Backbone.View.extend({
	el: '#app',
	initialize: function() {
		this.listenTo(app.Tracklist, "add", this.addTrack);
		this.listenTo(app.Tracklist, "remove", this.removeTrack);

		this.render();
	},
	render: function() {
		var template = _.template( $("#app_template").html() );
		this.$el.html(template);
	},
	events: {
		"dragover #playlist": 	"handleDragOver",
		"drop #playlist": 		"handleFiles"
	},
	handleDragOver: function(event) {
		handleDragOver(event);
	},
	handleFiles: function(event) {
		$("#playlist").empty();
		$("#playlist").removeClass("empty-playlist");
		handleFileSelect(event);
	},
	addTrack: function(track) {
		console.log("Track added " + app.Tracklist.length);
		var view = new app.TrackView({model: track})
		this.$("#playlist").append(view.render().$el);
	},
	removeTrack: function() {
		console.log("Track removed " + app.Tracklist.length);
	}
});