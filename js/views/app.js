var app = app || {};

function handleFileSelect(event) {
	// Need access to original event if abstracting this function outside of AppView
	event.originalEvent.stopPropagation();
	event.originalEvent.preventDefault();

	var files = event.originalEvent.dataTransfer.files;
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
	template: _.template($("#app_template").html()),
	initialize: function() {
		this.listenTo(app.Tracklist, "add", this.addTrack);
		this.listenTo(app.Tracklist, "remove", this.removeTrack);
		this.render();
	},
	render: function() {
		this.$el.html(this.template);
	},
	events: {
		"dragover #playlist" 	: "handleDragOver",
		"drop #playlist" 		: "handleFiles"
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
		var view = new app.TrackView({model: track})
		$("#playlist").append(view.render().$el);
	},
	removeTrack: function() {
		if (app.Tracklist.length == 0) {
			$("#playlist").addClass("empty-playlist");
			$("#playlist").append("Drop files here");
		}
	}
});