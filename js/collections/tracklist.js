var app = app || {};

var Tracklist = Backbone.Collection.extend({
	model: app.Track,
	// localStorage: new Backbone.localStorage("webaudioplayer"),
});

app.Tracklist = new Tracklist;