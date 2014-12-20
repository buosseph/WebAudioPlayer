var app = app || {};

if (!window.AudioContext) {
	if (!window.webkitAudioContext) {
		alert('Web Audio API is not supported in this browser');
	}
	window.AudioContext = window.webkitAudioContext;
}
app.audio = new AudioContext();

app.source = app.audio.createBufferSource();