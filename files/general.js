$(function () {
    lmpost = {};
    lmpost.options = {
        campaignid: '223229',
        testresult: '',
        leadtypeid: 9,
        domain: 'https://www.paydaylv.com/',
        form: '../2page_form_label_v2'
    };

    lmpost.urls = {
        hitUrl: 'https://www.paydaylv.com/',
        supportUrl: 'https://www.paydaylv.com/',
        apiUrl: 'https://www.paydaylv.com/',
        submitUrl: 'post/live.aspx'
    };

    lmpost.registerHit = function () {
        var script = document.createElement('script');
        script.setAttribute('type', 'text/javascript');
        script.setAttribute('src', lmpost.urls.hitUrl);
        document.getElementsByTagName('head')[0].appendChild(script);
    };

    lmpost.blinkErrorElements = function () {
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
    };

    var isNumeric = function (n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    };

    lmpost.calculateAPR = function (amount, totalFee, numberOfDays) {
        var apr = 0,
		    inputReady = isNumeric(amount) && isNumeric(totalFee) && isNumeric(numberOfDays) && amount > 0 && numberOfDays > 0;

        if (!inputReady) {
            return -1;
        }

        apr = 36500 * (totalFee / amount / numberOfDays);

        return apr;
    };

    lmpost.displayForm = function (dv) {
        var script = document.createElement('script');
        script.setAttribute('id', 'leadsb2cformsrc');
        script.setAttribute('type', 'text/javascript');
        script.setAttribute('src', lmpost.options.domain + 'scripts/forms.core.js');
        dv.appendChild(script);
    };

    lmpost.initFormLink = function () {
        // Init redirection from main form.
        var form = $('apply-now.html');
        if (form.length) {
            var submitBtn = form.find('a.btn-cash'),
				submitHandler = function () {
				    var queryParams = form.serialize(),
				      targetUrl = lmpost.urls.supportUrl,
                      email = $('#Email').val().trim() || '';
				    if (email.length > 0)
				        $.ajax(
					    {
					        url: targetUrl + '?action=subscribe&responsetype=json&uid=' + lmpost.options.hituid + '&LeadTypeID=' + lmpost.options.leadtypeid + '&PathID=1&' + queryParams + '&clienturl=' + escape(location.href),
					        type: 'get',
					        dataType: 'jsonp'
					    }
					);

				    window.setTimeout(function () { window.location.href = 'apply.html' + queryParams }, 250);
				    return false;
				};

            submitBtn.on('click', submitHandler);
        }
    }

    lmpost.registerHit();

    lmpost.initFormLink();

    var lmpostform = $('#lmpostform');
    if (lmpostform.length) { lmpost.displayForm(lmpostform[0]); };

    $('.form-apply-wrap #RequestedAmount').before("<em class='ico-amount'></em>");
    $('.form-apply-wrap #FName').before("<em class='ico-name'></em>");
    $('.form-apply-wrap #LName').before("<em class='ico-name'></em>");
    $('.form-apply-wrap #Email').before("<em class='ico-email'></em>");
    $('.form-apply-wrap #ZipCode').before("<em class='ico-code'></em>");

    $(".r-popup, .form-popup").fancybox({
        'width': 960,
        'height': 550,
        'margin': 5,
        'autoDimensions': false
    });

    $(".r-calculate").fancybox({
        'width': 470,
        'height': 480,
        'margin': 5,
        'autoDimensions': false
    });
    $(".r-calculate").click(function () {
        $('#r-calculate').load('_apr-calculator.html');
    });

    $(".r-rules").click(function () {
        $('#r-rules').load('_apr-rules.html');
    });

    $(".r-loan").click(function () {
        $('#r-loan').load('_apr-loan.html');
    });

    $(".r-military").click(function () {
        $('#r-military').load('_apr-military.html');
    });

    $(".privacy-popup").click(function () {
        $('#privacy-popup').load('_privacypolicy.html');
    });

    $(".disclaimer-popup").click(function () {
        $('#disclaimer-popup').load('_disclaimer.html');
    });

});

