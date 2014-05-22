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

// In order to start playing the audio, you'll need to do so through the 

// // // Creating a gain node
var volume = audioContext.createGainNode();
volume.gain.value = 0.1;

// // Creating a biquad filter node
// // 5 fields: (type, frequency, detune, Q, gain)
var filter = audioContext.createBiquadFilter();
filter.type = 0; // 0 = lowpass, 1 = highpass, 2 = bandpass, 3 = lowshelf, 4 = highshelf, 5 = peaking, 6 = notch, 7 = allpass
filter.frequency.value = 1000;



source.connect(volume);
volume.connect(filter);
filter.connect(audioContext.destination);







// var audioContext;
// if (typeof AudioContext !== "undefined") {
//   audioContext = new AudioContext();
// } else if (typeof webkitAudioContext !== "undefined") {
//   audioContext = new webkitAudioContext();  
// } else {
//   alert("Web Audio API is not supported in this browser");  // Letting the user know
//   throw new Error("Web Audio API is not supported in this browser. :(");
// }

// // // If you don't want to use <audio> in your HTML...

// // // URL of desired audio file
// // var audioFileURL = "Warrior Concerto - The Glitch Mob.mp3";

// // // Create XMLHttpRequest
// // var request = new XMLHttpRequest();
// // request.open("GET", audioFileURL, true);
// // request.responseType = "arraybuffer"; // Required because file is binary, not text

// // // Decode XMLHttpRequest Asychronously
// // var audioData;
// // request.onload = function() {
// //   audioData = request.response;
// // };
// // request.send();

// // ...







// // Loading sounds
// // AudioBuffer used for short/medium length sounds via XMLHttpRequest
// var soundBuffer = null;
// function loadSound(url) {
//   // Create request for sound
//   var request = new XMLHttpRequest();
//   request.open('GET', url, true);
//   request.responseType = 'arraybuffer'; // Required because file is binary, not text

//   // Decode asycnhronously
//   request.onload = function() {
//     audioCtx.decodeAudioData(request.response, function(buffer) {
//       soundBuffer = buffer;
//     }, onError);
//   }
//   request.send();
// }
// loadSound("Warrior Concerto - The Glitch Mob.mp3")


// var source = context.createBufferSource(); // creates a AudioBufferSourceNode
// source.buffer = buffer;   // loads given AudioBuffer
// source.connect(context.destination); // connects SourceNode to another node (DestNode). Note: AudioContext.destination returns a AudioDestinationNode
// source.start(0);  // starts playing sound in SourceNode
