$(document).ready(function() {
	// var time = 1.5 * 24 * 60 * 60
	var time = 20

	var clock = $('#clock').FlipClock(time, {
		clockFace: 'DailyCounter',
		autoStart: false,
		countdown: true,
		callbacks: {
			stop: function() {
				if (clock.getTime() == 0) {
					textAnimate(false)
					pulseButtons(false)
					disableButton(4)
				}
			}
		}
	})

	$('#start').click(function() {
		clock.start()
		backgroundAnimate()
		textAnimate(true)
		pulseButtons(true)
		disableButton(1)
	})

	$('#pause').click(function() {
		clock.stop()
		$('.bg').stop()
		textAnimate(false)
		pulseButtons(false)
		disableButton(2)
	})

	$('#stop').click(function() {
		clock.stop()
		clock.setTime(time)
		$('.bg').stop()
		$('.bg').removeAttr('style')
		textAnimate(false)
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
			var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend'
			this.addClass('animated ' + animationName).one(animationEnd, function() {
				$(this).removeClass('animated ' + animationName)
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
				$('#start').css('display', 'none')
				$('#pause').css('display', '')
				break
			case 2:
				$('#start').removeClass('disabled')
				$('#pause').addClass('disabled')
				$('#pause').css('display', 'none')
				$('#start').css('display', '')
				break
			case 3:
				$('#start').removeClass('disabled')
				$('#pause').addClass('disabled')
				$('#stop').addClass('disabled')
				$('#pause').css('display', 'none')
				$('#start').css('display', '')				
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

	var animTime = 30 // time for the animation in seconds
	var hueChange = 4 // the hue change from one span element to the nex

	$('#rainbow').find('span').each(function (i) {
		$(this).css('-webkit-animation-delay', (animTime * ((i * hueChange) % 360) / 360) - animTime + 's')
	})

	$('#start').one('click',function(){
		$('#rainbow').addClass('animate')
	})

	function textAnimate(trigger) {
		if (trigger) {
			$('#rainbow').find('span').each(function (i) {
				$(this).css('-webkit-animation-play-state', 'running')
			})
		} else {
			$('#rainbow').find('span').each(function (i) {
				$(this).css('-webkit-animation-play-state', 'paused')
			})
		}
	}
})