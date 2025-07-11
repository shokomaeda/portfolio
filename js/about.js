//ページが読み込まれたら実行
document.addEventListener("DOMContentLoaded", (event) => {
	gsap.registerPlugin(ScrollTrigger);

	const bioSection = document.querySelector('.biography');
	const itemWrapper = document.querySelector('.biography__container');
	const itemInner = document.querySelector('.biography__list');

	gsap.to(itemInner,
	{
		x: () => -(itemInner.clientWidth - itemWrapper.clientWidth),
		ease: "none",
		scrollTrigger: {
				trigger: bioSection,
				start: "top top",
				end: () => `+=${itemInner.clientWidth - itemWrapper.clientWidth}`,
				// markers: true,
				scrub: true, 
				pin: true,
				invalidateOnRefresh: true, 
				anticipatePin: 1,
		}
	});

	class Main {
		constructor() {
			this.init();
		}
	
		init() {
			this.copyText();
			this.calculateLoopAnimationSpeed();
			this.resizeRefresh();
		}
	
		//リサイズ時にアニメーションの速度を再計算
		resizeRefresh() {
			const target = document.body;
			const resizeObserver = new ResizeObserver((entries) => {
				entries.forEach((entry) => {
					this.calculateLoopAnimationSpeed();
				});
			});
			resizeObserver.observe(target);
		}
	
		//アニメーションの速度を計算してCSS変数に
		calculateLoopAnimationSpeed() {
			const targets = document.querySelectorAll('.js-tick');
			if (!targets.length) {
				return;
			}
	
			const distance = window.innerWidth;
			const mql = window.matchMedia('(min-width: 801px)');
			const time = mql.matches ? 18 : 9;
			const speed = distance / time;
	
			targets.forEach((target) => {
				const tickElems = target.querySelectorAll('.js-tick-item');
				if (!tickElems.length) {
					return;
				}
	
				const total = tickElems.length - 1;
	
				tickElems.forEach((el, i) => {
					const elWidth = el.clientWidth;
					const elTime = Math.floor(elWidth / speed);
					el.style.setProperty('--tick-duration', `${elTime}s`);
					el.style.setProperty('--tick-delay', `${elTime / -2}s`);
	
					if (i === total) {
						el.parentNode.classList.remove('no-tick');
					}
				});
			});
		}
	
		//テキストをコピーする
		copyText() {
			const targets = document.querySelectorAll('.js-tick');
			if (!targets.length) {
				return;
			}
	
			targets.forEach((target) => {
				const tickElems = target.querySelectorAll('.js-tick-item');
				if (!tickElems.length) {
					return;
				}
	
				let length = 0;
				tickElems.forEach((el) => {
					length += el.clientWidth;
					el.insertAdjacentHTML('afterend', el.outerHTML);
					if (length > window.innerWidth) {
						return;
					}
				});
			});
		}
	}
	
	new Main();

	// gsap.fromTo(worksItems, {
	// 	autoAlpha: 0, // 要素を隠す
	// 	y: 20 // 縦方向に+20px
	// },
	// {
	// 	autoAlpha: 1, // 要素を表示
	// 	duration: 1.5, // 1秒かけてアニメーション
	// 	y: 0, // 縦方向0に
	// 	scrollTrigger: { // scrollTriggerの設定
	// 		trigger: works, // ターゲットとなる要素を指定
	// 		start: 'top center', // アニメーションの開始位置を設定。
	// 		// markers: true, 
	// 	}
	// });

	gsap.fromTo(".strength__circleItem svg circle", {
		'stroke-dashoffset': '2000px',
	}, {
		'stroke-dashoffset': '0',
		duration: 1.5,
		stagger: .4,

		scrollTrigger: { // scrollTriggerの設定
			trigger: '.strength__circleWrap', // ターゲットとなる要素を指定
			start: 'top center', // アニメーションの開始位置を設定。
			// markers: true,
		}
	})
	gsap.fromTo(".strength__circleItem p", {
		autoAlpha: 0,
	},
	{
		autoAlpha: 1,
		duration: 1,
		stagger: .4,
		delay: .7,
		scrollTrigger: { // scrollTriggerの設定
			trigger: '.strength__circleWrap', // ターゲットとなる要素を指定
			start: 'top center', // アニメーションの開始位置を設定。
			// markers: true,
		}
	});
	
	gsap.utils.toArray(".strength__item").forEach((el) => {
		gsap.fromTo(el,
			{
				autoAlpha: 0,
				// scale: 0.9,
				xPercent: 10,
			},
			{
				autoAlpha: 1,
				// scale: 1,
				xPercent: 0,
				duration: 1.5,
				ease: "power4.out",
				stagger: 1,
				// スクロールトリガーの設定
				scrollTrigger: {
					// scroller: ".wrap-inner",
					start: 'top center',
					trigger: el, // 対象物
				},
			}
		);
	});
});
