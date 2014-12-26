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
					var node = app.audio.createBufferSource();
					node.buffer = buffer;

					var length =  toTimeLength(buffer.duration);
					console.log(length);
					var track = new app.Track({
						title: 	f.name,
						type: 	f.type,
						size: 	f.size,
						length: length,
						buffer: buffer,
						node:   node,
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

app.TracklistView = Backbone.View.extend({
	template: _.template($("#tracklist_template").html()),
	events: {
		"dragover #playlist" 	: "handleDragOver",
		"drop #playlist" 		: "handleFiles",
		"click .slideout-panel-close" : "toggleFileDrop",
	},
	initialize: function() {
		this.listenTo(app.Tracklist, "add", this.addTrack);
		this.listenTo(app.Tracklist, "remove", this.removeTrack);
		this.render();
	},
	render: function() {
		this.$el.html(this.template);
	},
	handleDragOver: function(event) {
		handleDragOver(event);
	},
	handleFiles: function(event) {
		if ($("#playlist").hasClass("empty-playlist")) {
			$("#playlist").empty();
			$("#playlist").removeClass("empty-playlist");
		}
		handleFileSelect(event);
	},
	toggleFileDrop: function() {
		this.$el.toggleClass("is-visible");
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
	},
});