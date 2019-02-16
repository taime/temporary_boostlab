jQuery.noConflict();
// IE checker
function gkIsIE() {
  if (navigator.userAgent.match(/msie/i) ){ return true; }
  else { return false; }
}
//
var page_loaded = false;
//
jQuery(window).load(function() {
	//
	page_loaded = true;
	
	if(jQuery(document.body).attr('data-smoothscroll') == '1') {
		// smooth anchor scrolling
    	if(
			!(
				jQuery('#gkMainbody').find('.item-page').length &&
				jQuery('#gkMainbody').find('.item-page').hasClass('edit')
			) && !(
				jQuery('#gkMainbody').find('.subpage').length &&
				jQuery('#gkMainbody').find('.subpage').hasClass('edit')
			) && !(
				jQuery('#modules-form').length
			)
    	) {
        jQuery('a[href*="#"]').on('click', function (e) {
            e.preventDefault();
            if(
                this.hash !== '' && 
                this.hash.indexOf('carousel') === -1 &&
                this.hash.indexOf('advancedSearch') === -1
            ) {
                var target = jQuery(this.hash);

                if(this.hash !== '' && this.href.replace(this.hash, '') == window.location.href.replace(window.location.hash, '')) {    
                    if(target.length && this.hash !== '#') {
                        jQuery('html, body').stop().animate({
                            'scrollTop': target.offset().top
                        }, 1000, 'swing', function () {
                            if(this.hash !== '#') {
                                window.location.hash = target.selector;
                            }
                        });
                    } else if(this.hash !== '' && this.href.replace(this.hash, '') !== '') {
                        window.location.href = this.href;
                    }
                } else if(this.hash !== '' && this.href.replace(this.hash, '') !== '') {
                    window.location.href = this.href;
                }
            }
        });
    }
	}
	// style area
	if(jQuery('#gkStyleArea').length > 0){
		jQuery('#gkStyleArea').find('a').each(function(i, element){
			jQuery(element).click(function(e){
				e.preventDefault();
				e.stopPropagation();
				changeStyle(i+1);
			});
		});
	}
	// K2 font-size switcher fix
	if(jQuery('#fontIncrease').length > 0 && jQuery('.itemIntroText').length > 0) {
		jQuery('#fontIncrease').click(function() {
			jQuery('.itemIntroText').attr('class', 'itemIntroText largerFontSize');
		});
		
		jQuery('#fontDecrease').click( function() {
			jQuery('.itemIntroText').attr('class', 'itemIntroText smallerFontSize');
		});
	}

	// login popup
	if(jQuery('#gkPopupLogin').length > 0) {
		var popup_overlay = jQuery('#gkPopupOverlay');
		popup_overlay.css({'display': 'block', 'opacity': '0'}).fadeOut();

		var opened_popup = null;
		var popup_login = null;

		if(jQuery('#gkPopupLogin').length > 0 && jQuery('.gkLogin').length > 0) {
			popup_login = jQuery('#gkPopupLogin');
			jQuery('.gkLogin').click(function(e) {
				e.preventDefault();
				e.stopPropagation();
				popup_overlay.css('opcacity', 0.01);
				popup_login.css('display', 'block');
				popup_overlay.css('height', jQuery('body').height());
				popup_overlay.fadeTo('slow', 0.45 );

				setTimeout(function() {
					popup_login.animate({'opacity': 1}, 500);
					opened_popup = 'login';
				}, 50);

				(function() {
					if(jQuery('#modlgn-username').length > 0) {
						jQuery('#modlgn-username').focus();
					}
				}).delay(300);
			});
		}
		
		popup_overlay.click(function() {
			if(opened_popup === 'login')	{
				popup_overlay.fadeOut();
				popup_login.animate({'opacity' : 0}, 500);
				setTimeout(function() {
					popup_login.css('display', 'none');
				}, 450);
			}
		});		
	}
});

jQuery(document).ready(function() {
	if(jQuery('#gkHeaderNav').length > 0 && !jQuery('#gkHeaderNav').hasClass('active')) {		
		jQuery(window).scroll(function() {
			var currentPosition = jQuery(window).scrollTop();

			if(
				currentPosition >= jQuery('#gkHeader').outerHeight() && 
				!jQuery('#gkHeaderNav').hasClass('active')
			) {
				jQuery('#gkHeaderNav').addClass('active');
			} else if(
				currentPosition < jQuery('#gkHeader').outerHeight() && 
				jQuery('#gkHeaderNav').hasClass('active')
			) {
				jQuery('#gkHeaderNav').removeClass('active');
			}
		});
	}
	
	// FAQ
	jQuery('.gk-faq').each(function(i, faq) {
		var dt_list = jQuery(faq).children('dt');
		dt_list.each(function(i, dt) {
			dt = jQuery(dt);
			dt.click(function() {
				dt_list.each(function(j, dt_element) {
					if(i !== j) {
						jQuery(dt_element).removeClass('active');
					}
				});
				dt.toggleClass('active');
			});
		});
	});
});

// Function to change styles
function changeStyle(style){
	// cookie function
	jQuery.cookie = function (key, value, options) {
    // key and at least value given, set cookie...
    if (arguments.length > 1 && String(value) !== "[object Object]") {
        options = jQuery.extend({}, options);
        if (value === null || value === undefined) {
            options.expires = -1;
        }
        if (typeof options.expires === 'number') {
            var days = options.expires, t = options.expires = new Date();
            t.setDate(t.getDate() + days);
        }

        value = String(value);

        return (document.cookie = [
            encodeURIComponent(key), '=',
            options.raw ? value : encodeURIComponent(value),
            options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
            options.path ? '; path=' + options.path : '',
            options.domain ? '; domain=' + options.domain : '',
            options.secure ? '; secure' : ''
        ].join(''));
    }
    // key and possibly options given, get cookie...
    options = value || {};
    var result, decode = options.raw ? function (s) { return s; } : decodeURIComponent;
    return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
	};

	var file1 = $GK_TMPL_URL+'/css/style'+style+'.css';
	var file2 = $GK_TMPL_URL+'/css/typography/typography.style'+style+'.css';
	jQuery('head').append('<link rel="stylesheet" href="'+file1+'" type="text/css" />');
	jQuery('head').append('<link rel="stylesheet" href="'+file2+'" type="text/css" />');

	jQuery.cookie('gk_events_j30_style', style, { expires: 365, path: '/' });
}