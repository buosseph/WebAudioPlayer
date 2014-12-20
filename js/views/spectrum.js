var app = app || {};

app.spectrumCtx = null;
app.spectrum = null;

app.SpectrumView = Backbone.View.extend({
	// el: '#spectrum',
	// template: 	_.template($("#spectrum_template").html()),
	render: function() {
		var spectrumCanvas = this.el;
		app.spectrumCtx = spectrumCanvas.getContext("2d");
		var model = new app.Spectrum({draw: 1});

		setUpSpectrumAnalyserNode();
		if (app.audio != null && app.spectrumCtx != null) {
			var node = app.audio.createScriptProcessor(2048, 1, 1);

			var drawStyle;
			if (model.get("draw") == 1) {
				var gradient = app.spectrumCtx.createLinearGradient(0,0,0,300);
				gradient.addColorStop(1,'#000000');
				gradient.addColorStop(0.75,'#ff0000');
				gradient.addColorStop(0.25,'#ffff00');
				gradient.addColorStop(0,'#ffffff');
				drawStyle = gradient;			
			} else {
				drawStyle = "rgb(0,0,0)";
			}

			node.onaudioprocess = function() {
				var array = new Uint8Array(app.analyser.frequencyBinCount);
				app.analyser.getByteFrequencyData(array);

				app.spectrumCtx.clearRect(0, 0, 1000, 325);
				app.spectrumCtx.fillStyle = drawStyle;
				drawSpectrum(array);
			}

			app.analyser.connect(node);
			node.connect(app.audio.destination);

			model.set({node: node});
		}

		app.spectrum = model;
	}
});


function setUpSpectrumNode() {
	app.spectrum = app.audio.createScriptProcessor(2048, 1, 1);

	var gradient = app.spectrumCtx.createLinearGradient(0,0,0,300);
	gradient.addColorStop(1,'#000000');
	gradient.addColorStop(0.75,'#ff0000');
	gradient.addColorStop(0.25,'#ffff00');
	gradient.addColorStop(0,'#ffffff');

	app.spectrum.onaudioprocess = function() {
		var array = new Uint8Array(app.analyser.frequencyBinCount);
		app.analyser.getByteFrequencyData(array);

		app.spectrumCtx.clearRect(0, 0, 1000, 325);
		app.spectrumCtx.fillStyle = gradient;
		drawSpectrum(array);
	}
}

function drawSpectrum(array) {
	for (var i = 0; i < array.length; i++) {
		var value = array[i];
		app.spectrumCtx.fillRect(i*5, 325-value, 3, 325);
	}
}

function draw() {
	window.requestAnimationFrame(draw);

	var sum;
	var average;
	var bar_width;
	var scaled_average;
	var num_bars = 60;
	var data = new Uint8Array(2048);
	app.analyzer.getByteFrequencyData(data)

	app.spectrumCtx.clearRect(0, 0, $("#spectrum").width, $("#spectrum").height);
	var bin_size = Math.floor(data.length / num_bars);
	for (var i = 0; i < num_bars; i++) {
		sum = 0;
		for (var j = 0; j < bin_size; j++) {
			sum += data[(i * bin_size) + j];
		}
		average = sum / bin_size;
		bar_width = canvas.width / num_bars;
		scaled_average = (average/ 256) * canvas.height;
		app.spectrumCtx.fillRect(i * bar_width, canvas.height, bar_width - 2, - scaled_average);
	}
}