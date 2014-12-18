(function($) {

	AppView = Backbone.View.extend({
		el: '#app',
		initialize: function() {
			this.render();
		},
		render: function() {
			var template = _.template( $("#app_template").html() );
			this.$el.html(template);
		},
	});

	var app = new AppView();
} (jQuery));