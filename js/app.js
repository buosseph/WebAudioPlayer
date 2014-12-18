/* Notes:
 * - Need overlay on top of #playlist on dragover to indicate adding of files
 * - Duplicates should show up. Every item in the collection should be visible
 * - Must be able to identify when #playlist is empty
 * - Finish simple file display and handling in #playlist before reimplementing audio
 */

// Globals
var playlist;


if (window.File && window.FileReader && window.FileList && window.Blob) {
  // Great success! All the File APIs are supported.
} else {
  alert('The File APIs are not fully supported by your current browser. Please upgrade to a newer version in order to use this application.');
}


function handleFileSelect(event) {
	// Need access to original event if abstracting this function outside of AppView
	event.originalEvent.stopPropagation();
	event.originalEvent.preventDefault();

	var files = event.originalEvent.dataTransfer.files;
	var output = [];
	for (var i = 0, f; f = files[i]; i++) {
		var track = new Track({
			title: 	f.name,
			type: 	f.type,
			size: 	f.size,
		});
		this.playlist.push(track);
	}
}

function handleDragOver(event) {
	// Need access to original event if abstracting this function outside of AppView
	event.originalEvent.stopPropagation();
	event.originalEvent.preventDefault();
	event.originalEvent.dataTransfer.dropEffect = 'copy';
}

(function($) {
	// Models
	Track = Backbone.Model.extend({
		defaults: {
			title: 		"",
			type: 		"",
			size: 		0,
			buffer: 	[]
		},
		initialize: function() {
			console.log(
				this.get("title")
				+ " " + this.get("type")
				+ " " + this.get("size")
			);
		}
	});

	// Collections
	Playlist = Backbone.Collection.extend({
		model: Track
	});

	// Views
	TrackView = Backbone.View.extend({
		tagName: "li",
		className: "track",
		template: 	_.template($("#track_template").html()),
		events: {
			'click a.remove': 'removeTrack'
		},
		initialize: function() {
			this.listenTo(this.model, 'change', this.render);
			this.listenTo(this.model, 'destroy', this.remove);
		},
		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},
		removeTrack: function() {
			this.model.destroy();
		}
	});

	AppView = Backbone.View.extend({
		el: '#app',
		initialize: function() {
			playlist = new Playlist();
			this.listenTo(playlist, "add", this.addTrack);
			this.listenTo(playlist, "remove", this.removeTrack);

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
			console.log("Track added " + playlist.length);
			var view = new TrackView({model: track})
			this.$("#playlist").append(view.render().$el);
		},
		removeTrack: function() {
			console.log("Track removed " + playlist.length);
		}
	});

	var app = new AppView();
} (jQuery));