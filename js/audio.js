/* Notes:
 * - The Web Audio API is design to represent audio signals in hardware,
 * 	thus there is no pause function for audio sources! This makes the
 *	API more suitable for real-time based applications.
 */

var app = app || {};

if (!window.AudioContext) {
	if (!window.webkitAudioContext) {
		alert('Web Audio API is not supported in this browser');
	}
	window.AudioContext = window.webkitAudioContext;
}

app.audio = new AudioContext();
app.source = null;
app.analyser = null;
// app.meter = null;

app.volume = app.audio.createGain();

app.filter = app.audio.createBiquadFilter();
app.filter.type = 0; // 0 = lowpass, 1 = highpass, 2 = bandpass, 3 = lowshelf, 4 = highshelf, 5 = peaking, 6 = notch, 7 = allpass
app.filter.frequency.value = 20000;


function connectAndPlayNode(node) {
	if (node != null) {
		app.source = node;
		
		app.source.connect(app.filter);
		app.filter.connect(app.volume);
		app.volume.connect(app.audio.destination);

		if (app.analyser != null) {
			app.volume.connect(app.analyser);
		}

		app.source.start(0);
	}
}

function stopSourceNode() {
	if (app.source != null) {
		app.source.stop();
	}
}

function setUpSpectrumAnalyserNode() {
	app.analyser = app.audio.createAnalyser();
	app.analyser.smoothingTimeConstant = 0.5;
	app.analyser.fftSize = 2048;
}
