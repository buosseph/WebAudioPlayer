var app = app || {};

function toTimeLength(totalSeconds) {
	// totalSeconds should be a decimal value already
	var hours 	= Math.floor(totalSeconds/ 3600);
	var minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
	var seconds = Math.floor(totalSeconds - (hours * 3600) - (minutes * 60));

	if (minutes < 10 && hours > 0) {
		minutes = ":0" + minutes;
	}
	if (seconds < 10) {
		seconds = "0" + seconds;
	}

	return hours + minutes + ":" + seconds;
}

// function handleFileSelect(event) {
// 	// Need access to original event if abstracting this function outside of AppView
// 	event.originalEvent.stopPropagation();
// 	event.originalEvent.preventDefault();

// 	var files = event.originalEvent.dataTransfer.files;
// 	for (var i = 0, f; f = files[i]; i++) {
// 		if (!f.type.match('audio.*')) {
// 			continue;
// 		}
// 		var reader = new FileReader();
// 		// Need to use closure to read multiple files and access meta data while loading
// 		reader.onload = (function(f){
// 			return function(event) {
// 				app.audio.decodeAudioData(event.target.result, function(buffer) {
// 					var node = app.audio.createBufferSource();
// 					node.buffer = buffer;

// 					var length =  toTimeLength(buffer.duration);
// 					console.log(length);
// 					var track = new app.Track({
// 						title: 	f.name,
// 						type: 	f.type,
// 						size: 	f.size,
// 						length: length,
// 						buffer: buffer,
// 						node:   node,
// 					});
// 					app.Tracklist.push(track);
// 				});
// 			}
// 		})(f);
// 		reader.readAsArrayBuffer(f);
// 	}
// }

// function handleDragOver(event) {
// 	// Need access to original event if abstracting this function outside of AppView
// 	event.originalEvent.stopPropagation();
// 	event.originalEvent.preventDefault();
// 	event.originalEvent.dataTransfer.dropEffect = 'copy';
// }

app.AppView = Backbone.View.extend({
	el: '#app',
	template: _.template($("#app_template").html()),
	initialize: function() {
		this.render();
	},
	render: function() {
		this.$el.html(this.template);
		var spectrum = new app.SpectrumView({el: $("#spectrum")});
		spectrum.render();
		var meter = new app.MeterView();
		meter.render();
		var t = new app.TracklistView({el: $("#file-drop")});
	},
	events: {
		"click #left-panel-ctl" : "toggleFileDrop",
		"click #right-panel-ctl": "toggleAudioCtl",
		"click #audio-control .slideout-panel-close": "toggleAudioCtl",
		"input #volume": "changeVolume",
		"input #filter-cutoff": "changeFilterCutoff",
		"change #filter-cutoff": "changeFilterCutoff",
		"input #filter-type": "changeFilter"
	},
	toggleFileDrop: function() {
		$("#file-drop").toggleClass("is-visible");
	},
	toggleAudioCtl: function() {
		$("#audio-control").toggleClass("is-visible");
	},
	changeVolume: function() {
		app.volume.gain.value = $("#volume").val();
		console.log(app.volume.gain.value);
	},
	changeFilterCutoff: function() {
		// Convert to log scale
		var filterCutoff = parseInt(((Math.exp(Math.log(81)*parseFloat($("#filter-cutoff").val()))) - 1) * 250);
		app.filter.frequency.value = filterCutoff;
	},
	changeFilter: function() {
		var filterType = $("#filter-type option:selected").val()
		app.filter.type = filterType;
	}
});