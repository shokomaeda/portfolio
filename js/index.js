//ページが読み込まれたら実行


document.addEventListener("DOMContentLoaded", (event) => {
	gsap.registerPlugin(ScrollTrigger);

	//何度も使うため変数に入れておくと便利
	const jsLoaderBg = '.js-loader-bg';
	const gnav = '.gnav';
	const logoPath = ".fv__heading svg path";

	//アニメーションする前の初期状態を指定する
	gsap.set(
		jsLoaderBg, {
			y: 0,
		},
	)

	//gsapのtimelineを作成
	const tl = gsap.timeline();

	//ここからgsapのtimelineに動きを追加していく
	tl
		.fromTo(
			'.fv__headingLine1',
			{
				autoAlpha: 0,
				yPercent: -100,
			},
			{
				autoAlpha: 1,
				yPercent: 0,
				duration: .6,
			}, '+=2.5'
		)
		.fromTo(
			'.fv__headingLine3', {
				autoAlpha: 0,
				xPercent: 100,
			},
			{
				autoAlpha: 1,
				xPercent: 0,
				duration: .6,
			}, '<'
		)
		.fromTo(
			'.fv__headingLine2', {
				autoAlpha: 0,
				yPercent: 10,
			},
			{
				autoAlpha: 1,
				yPercent: 0,
				duration: .6,
			}, '<'
		);
	
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

	gsap.fromTo(".about__image",
		{
			autoAlpha: 0,
			xPercent: -10,
		},
		{
			autoAlpha: 1,
			xPercent: 0,
			duration: 1.5,
			ease: "power4.out",
			stagger: 1,
			// スクロールトリガーの設定
			scrollTrigger: {
				// scroller: ".wrap-inner",
				start: 'top 75%',
				trigger: ".about__image", // 対象物
			},
		}
	);

	gsap.fromTo(".about__container",
		{
			autoAlpha: 0,
			xPercent: 10,
		},
		{
			autoAlpha: 1,
			xPercent: 0,
			duration: 1.5,
			ease: "power4.out",
			stagger: 1,
			// スクロールトリガーの設定
			scrollTrigger: {
				// scroller: ".wrap-inner",
				start: 'top bottom',
				trigger: ".about__container", // 対象物
			},
		}
	);


	gsap.utils.toArray(".skills__item").forEach((el) => {
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
					start: 'top 75%',
					trigger: el, // 対象物
				},
			}
		);
	});
});