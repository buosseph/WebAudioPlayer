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
		output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
			f.size, ' bytes, last modified: ',
			f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
			'</li>');
	}
	$('#list').html('<ul>' + output.join(' ') + '</ul>');
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
		initialize: function() {
			console.log("hi");
		}
	});

	// Views
	AppView = Backbone.View.extend({
		el: '#app',
		initialize: function() {
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
			handleFileSelect(event);
		}
	});

	var app = new AppView();
} (jQuery));