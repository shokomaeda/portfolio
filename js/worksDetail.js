// ページが読み込まれたら実行される
document.addEventListener("DOMContentLoaded", (event) => {
	// 新しいタイムライン作成
	// constのあとは変数名なので何でも良い
	const tl = gsap.timeline();

	// .fadeInというクラスが、from(開始位置)からTo(終了位置)に動く
	tl.fromTo('.contents__heading p span',{
		yPercent: 100,
	},
	{
		yPercent: 0,
		duration: .75,
		delay: .5,
	})

	tl.fromTo('.contents__heading h1 span',{
		yPercent: 100,
	},
	{
		yPercent: 0,
		duration: .75,
	}, '<')

	tl.fromTo('.contents__mv',{
		// from(開始位置)
		// 要素を隠す
		autoAlpha: 0,
		// 要素をy軸方向に+20px動かす
		y: 20
	},
	{
		// To(終了位置)
		// 要素が現れる
		autoAlpha: 1,
		// 何秒かけてアニメーションするか
		duration: 1.5,
		//開始するまで何秒おくらせるか
		delay: -.3,
		// 要素がy軸方向０になる
		y: 0,
	})
})