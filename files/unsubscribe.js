$(function () {

	var form = $('form.form-unsubscribe');

	var blinkErrorElements = function () {
		var colorArray = new Array("#fff", "#F94722", "#FFFFFF", "#F94722", "#FFFFFF", "#FEE0DA");
		$(':visible.error').animate({
			backgroundColor: colorArray[1]
		}, 150)
                    .animate({
                    	backgroundColor: colorArray[2]
                    }, 100)
                    .animate({
                    	backgroundColor: colorArray[3]
                    }, 100)
                    .animate({
                    	backgroundColor: colorArray[4]
                    }, 100)
                    .animate({
                    	backgroundColor: colorArray[5]
                    }, 100, function () {
                    	$(this).removeAttr('style');
                    });
		//$('html, body').animate({ scrollTop: form.find('.error:first').offset().top }, 500);
	};

	var setError = function (field) {
		var target;
		target = (field == "Email")? $('#SubscriberEmail') : form.find('#' + field);

		target.addClass('error');
	};

	// Init redirection from main form.

	if (form.length) {
		var submitBtn = form.find('a.btn'),
			submitHandler = function () {
				var targetUrl = lmpost.urls.supportUrl,
					options = lmpost.options,
					project = options.projectName,
					hitID = options.hituid,
					email = $('#SubscriberEmail');

				if (form.valid()) {
					$('<div class="processmsg"><p>Please wait. Your data is being processed...</p></div>').insertBefore(form);
					form.hide();
					$('div.svcerrormsg').hide();

					$.ajax(
						{
							url: targetUrl + '?action=unsubscribe&responsetype=json&uid=' + hitID + '&clienturl=' + escape(location.href) + '&email=' + email.val(),
							type: 'get',
							dataType: 'jsonp',
							dataType: 'jsonp',
							success: function (data) {
								if (data && data.Result < 2) {
									$('div.thakyoumsg').show();
									$('div.svcerrormsg').hide();
								}
								else {
									form.show();
									$('div.svcerrormsg').show();
									if (data && data.Errors && data.Errors.length) {
										$.each(data.Errors, function (index, value) {
											value.Field && setError(value.Field);
										}
											);
									} //if
									blinkErrorElements();
								}


								$('div.processmsg').remove();
							},

							error: function () {
								form.show();
								$('div.svcerrormsg').show();
								$('div.processmsg').remove();
							}
						}
						);
					}
					else {
						blinkErrorElements();
					}

				return false;
			};

		submitBtn.on('click', submitHandler);
	}


	lmpost.registerHit();

	form.validate({
		rules: {
			Name: {
				required: true
			},
			Phone: {
				required: true
			},
			Message: {
				required: true,
				minlength: 50
			},
			ContactEmail: {
				required: true,
				email: true
			}
		},
		messages: {
			ContactEmail: "Please enter a valid email address",
			Message: "Message must be at least 50 characters long."
		}
	});
});
