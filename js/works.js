//ページが読み込まれたら実行

document.addEventListener("DOMContentLoaded", (event) => {
	gsap.registerPlugin(ScrollTrigger);
	const tl = gsap.timeline();
	const works = document.querySelector(".works");
	const worksItems = document.querySelectorAll(".works__list li");

	gsap.utils.toArray(worksItems).forEach((el) => {
		gsap.fromTo(el,
			{
				autoAlpha: 0,
			},
			{
				autoAlpha: 1,
				duration: 4,
				ease: "power4.out",
				// スクロールトリガーの設定
				scrollTrigger: {
					// scroller: ".wrap-inner",
					trigger: el, // 対象物
					// markers: true, 
					start: 'top 75%', // アニメーションの開始位置を設定。
				},
			}
		);
	});
});