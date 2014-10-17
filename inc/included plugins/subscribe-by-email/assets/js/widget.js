jQuery(document).ready(function($) {

	var sbe_widget = {
		init: function() {
			var sbe_widgets = $( '.sbe-widget-subscribe-form' );

			if ( sbe_widgets.length ) {
				$( '.sbe-widget-subscribe-form' ).submit( function(e) {
					e.preventDefault();
					var elems = $(this).find('.sbe-form-field');

					var form_data = {};
					elems.each(function() {
						if ( $(this).attr( 'type' ) == 'checkbox' )
							form_data[ $(this).attr("name") ] = $(this).is(':checked') ? $(this).val() : '';
						else
					    	form_data[ $(this).attr("name") ] = $(this).val();
					});

					form_data['nonce'] = sbe_widget_captions.nonce;

				  	sbe_widget.submit_form( form_data, $(this).attr('id') );
				  	return false;
				});
			}
		},
		submit_form: function( form_data, form_id ) {
			var the_form = $('#' + form_id);
			var spinner = the_form
				.find( '.sbe-spinner' )
				.css( 'visibility','visible' );

			$.ajax({
				url: sbe_widget_captions.ajaxurl,
				type: 'POST',
				data: form_data
			})
			.done(function(return_data,xhr) {
				
				$('.sbe-widget-error').hide();
				if ( return_data.success ) {
					the_form.find('*').detach();
					var message_container = $('<p class="sbe-widget-updated"></p>').text(return_data.data['message']).hide();
				}
				else {
					var message_container = $('<ul class="sbe-widget-error"></ul>').hide();
					for ( var i = 0; i < return_data.data.length; i++ ) {
						message_container.append( '<li>' + return_data.data[i] + '</li>' );
					}
					
				}
				$('#' + form_id).prepend(message_container);
				message_container.slideDown();

				spinner.css( 'visibility', 'hidden' );
			});
			return false;
		}
	}

	sbe_widget.init();
});