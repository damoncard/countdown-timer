$(document).ready(function() {
	var time = 1 * 1 * 10

	var clock = $('#clock').FlipClock(time, {
		clockFace: 'DailyCounter',
		autoStart: false,
		countdown: true,
		callbacks: {
			stop: function() {
				if (clock.getTime() == 0) {
					pulseButtons(false)
					disableButton(4)
				}
			}
		}
	})

	$('#start').click(function() {
		clock.start()
		backgroundAnimate()
		pulseButtons(true)
		disableButton(1)
	})

	$('#pause').click(function() {
		clock.stop()
		$('.bg').stop()
		pulseButtons(false)
		disableButton(2)
	})

	$('#stop').click(function() {
		clock.stop()
		clock.setTime(time)
		$('.bg').stop()
		$('.bg').removeAttr('style')
		pulseButtons(false)
		disableButton(3)
	})

	$('#reset').click(function() {
		clock.setTime(time)
		$('.bg').removeAttr('style')
		disableButton(3)
		$(this).css('display', 'none')
		$('#stop').css('display', '')
	})

	$.fn.extend({
		animateCss: function (animationName) {
			var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
			this.addClass('animated ' + animationName).one(animationEnd, function() {
				$(this).removeClass('animated ' + animationName);
			})
		}
	})

	function pulseButtons(trigger) {
		if (trigger) {
			$('a').addClass('pulse')
		} else {
			$('a').removeClass('pulse')
		}
	}

	function disableButton(trigger) {
		switch(trigger) {
			case 1:
				$('#start').addClass('disabled')
				$('#pause').removeClass('disabled')
				$('#stop').removeClass('disabled')
				break
			case 2:
				$('#start').removeClass('disabled')
				$('#pause').addClass('disabled')
				break
			case 3:
				$('#start').removeClass('disabled')
				$('#pause').addClass('disabled')
				$('#stop').addClass('disabled')
				break
			case 4:
				$('#pause').addClass('disabled')
				$('#stop').addClass('disabled')
				$('#stop').css('display', 'none')
				$('#reset').css('display', '')
				break
		}
	}

	var second = time * 1000
	function backgroundAnimate() {
		$('#sun_yellow').animate({'top':'96%','opacity':0.4}, second*0.4,function(){
			$('#stars').animate({'opacity':1}, second/6,function(){
				$('#moon').animate({'top':'30%','opacity':1}, second/6, function(){
					$('#sstar').animate({'opacity':1}, second/100)
					$('#sstar').animate({
						'backgroundPosition':'0px 0px','top':'15%', 'opacity':0
					}, second/60)
				})
			})
		})
		$('#sun_red').animate({'top':'96%','opacity':0.8}, second*0.4)
		$('#sky').animate({'backgroundColor':'#4F0030'}, second/1.67)
		$('#clouds').animate({'backgroundPosition':'1000px 0px','opacity':0}, second)
		$('#night').animate({'opacity':0.8}, second/1.5)
	}
})