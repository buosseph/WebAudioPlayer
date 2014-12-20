var app = app || {};
var tempBuffer = null;

function handleFileSelect(event) {
	// Need access to original event if abstracting this function outside of AppView
	event.originalEvent.stopPropagation();
	event.originalEvent.preventDefault();

	var files = event.originalEvent.dataTransfer.files;
	for (var i = 0, f; f = files[i]; i++) {
		if (!f.type.match('audio.*')) {
			continue;
		}
		var reader = new FileReader();
		// Need to use closure to read multiple files and access meta data while loading
		reader.onload = (function(f){
			return function(event) {
				app.audio.decodeAudioData(event.target.result, function(buffer) {
					var track = new app.Track({
						title: 	f.name,
						type: 	f.type,
						size: 	f.size,
						buffer: buffer
					});
					app.Tracklist.push(track);
				});
			}
		})(f);
		reader.readAsArrayBuffer(f);
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

		// To test if audio works, which it does
		// app.source.connect(app.audio.destination);
		// app.source.buffer = app.Tracklist.at(0).get("buffer");
		// app.source.start(0);
	},
	removeTrack: function() {
		if (app.Tracklist.length == 0) {
			$("#playlist").addClass("empty-playlist");
			$("#playlist").append("Drop files here");
		}
	}
});