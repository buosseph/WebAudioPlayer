var playing = false;

var audioContext;
if (typeof AudioContext !== "undefined") {
  audioContext = new AudioContext();
} else if (typeof webkitAudioContext !== "undefined") {
  audioContext = new webkitAudioContext();  
} else {
  alert("Web Audio API is not supported in this browser");  // Letting the user know
  throw new Error("Web Audio API is not supported in this browser. :(");
}

var mediaElement = document.getElementById('track1');	// Grab <audio>, which has already loaded the song for us!
var source = audioContext.createMediaElementSource(mediaElement);	// Create an audio source from <audio>


// Gain
var volumeLevel = 1;
var volumeInput = document.getElementById("volume");
var volume = audioContext.createGainNode();
volumeInput.addEventListener("input", function() {
	volumeLevel = volumeInput.value;
	volume.gain.value = volumeLevel;
}, false);


// Filter
var filterCutoff = 20000;
var filterCutoffInput = document.getElementById("filter-cutoff");
var filterType = 0;
var filterTypeSelect = document.getElementById("filter-type");
var filter = audioContext.createBiquadFilter();
filter.type = filterType; // 0 = lowpass, 1 = highpass, 2 = bandpass, 3 = lowshelf, 4 = highshelf, 5 = peaking, 6 = notch, 7 = allpass
filter.frequency.value = filterCutoff;


filterTypeSelect.addEventListener("change", function() {
	filterType = parseInt(filterTypeSelect.options[filterTypeSelect.selectedIndex].value);
	filter.type = filterType;
}, false);

filterCutoffInput.addEventListener("input", function() {
	// Should convert from 0-100 to 0-20000
	filterCutoff = filterCutoffInput.value;
	filter.frequency.value = filterCutoff;
}, false);




source.connect(volume);
volume.connect(filter);
filter.connect(audioContext.destination);


function play() {
	if (!playing) {
		mediaElement.play();
		playing = true;
	}
	else {
		pause();
	}
}

function pause() {
	if (!mediaElement.muted) {
		mediaElement.muted = true;
	}
	else {
		mediaElement.muted = false;
	}
}

