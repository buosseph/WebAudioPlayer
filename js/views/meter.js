var app = app || {};

app.meterCtx = null;
app.meter = null;

app.MeterView = Backbone.View.extend({
	el: "#meter",
	render: function() {
		var meterCtx = this.el;
		app.meterCtx = meterCtx.getContext("2d");
		setUpMeterNode(this.$el.width(), this.$el.height());
		var model = new app.Meter({node: app.meter});
	}
});

function setUpMeterNode(width, height) {
	if (app.audio != null && app.analyser != null) {
		app.meter = app.audio.createScriptProcessor(2048, 1, 1);
		app.meter.onaudioprocess = function() {
			var array = new Uint8Array(app.analyser.frequencyBinCount);
			app.analyser.getByteFrequencyData(array);

			var average = 0;
			for (var i = 0; i < array.length; i++) {
				average += array[i];
			}
			average /= array.length; 	// What scale is this in?

			// if (average != 0) {
			// 	console.log(average);
			// }

			app.meterCtx.clearRect(0, 0, width, height);
			app.meterCtx.fillStyle = "rgb(0,255,0)";
			if (average > height) { average = height };	// Avoid "bouncing" meter
			app.meterCtx.fillRect(0, height - average, width, height);	// Need to know scale to properly set up meter
		}
		app.analyser.connect(app.meter);
		app.meter.connect(app.audio.destination);
	}
}