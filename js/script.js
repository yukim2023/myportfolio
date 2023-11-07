// ↓カーソル
var cursor = document.getElementById("cursor");
// カーソル用のdivタグをマウスに追従させる
document.addEventListener(
  "mousemove",
  function (e) {
    cursor.style.transform =
      "translate(" + e.clientX + "px, " + e.clientY + "px)";
  },
  { passive: true }
);

// リンクにホバーした時にクラス追加、離れたらクラス削除
var link = document.querySelectorAll("a");
for (var i = 0; i < link.length; i++) {
  link[i].addEventListener("mouseover", function (e) {
    cursor.classList.add("cursor--hover");
  });
  link[i].addEventListener("mouseout", function (e) {
    cursor.classList.remove("cursor--hover");
  });
}

// ↓モーダルウィンドウ
$(function () {
  var open = $(".slider .slick-slide");
  var close = $(".modal-close"),
    container = $(".modal-container");

  /*//読み込んで5秒後にモーダルウィンドウを表示
  setTimeout(() => {
    container.addClass("active");
    return false;
  }, 5000);
  */

  //開くボタンをクリックしたらモーダルを表示する
  open.on("click", function () {
    let target = $(this).data("modal");
    $("." + target).addClass("active");
    $("html, body").css("overflow", "hidden");
    return false;
  });
  //closeボタンをクリックしたらモーダルウィンドウを閉じる
  close.on("click", function () {
    container.removeClass("active");
    $("html, body").removeAttr("style");
  });
  /*//モーダルウィンドウの外側をクリックしたらモーダルウィンドウを閉じる
  $(document).on("click", function (e) {
    if (!$(e.target).closest(".modal-body").length) {
      container.removeClass("active");
      $("body").removeClass("no_scroll");
    }
  });
*/

  // moreをクリックしたら表示されているスライダーのモーダルを表示
  $(".more").on("click", function () {
    let target = $(this).next().find(".slick-current").data("modal");
    $("." + target).addClass("active");
    return false;
  });

  // モーダル内矢印の制御
  $(".modal-next").on("click", function () {
    $(this).closest(".modal-container").removeClass("active");
    // 次のモーダルが無ければ、htmlとbodyのstyleを削除する処理を追加
    if ($(this).closest(".modal-container").next().length > 0) {
      $(this).closest(".modal-container").next().addClass("active");
    } else {
      $("html, body").removeAttr("style");
    }
    return false;
  });
});

$(".modal-prev").on("click", function () {
  $(this).closest(".modal-container").removeClass("active");
  // 次のモーダルが無ければ、htmlとbodyのstyleを削除する処理を追加
  if ($(this).closest(".modal-container").prev().length > 0) {
    $(this).closest(".modal-container").prev().addClass("active");
  } else {
    $("html, body").removeAttr("style");
  }
  return false;
});

// ↓ ハンバーガー
//開くボタンをクリックしたらモーダルを表示する
$(function () {
  $(".sp_btn, .sp_nav a").click(function () {
    $(".sp_btn").toggleClass("active"); //ハンバーガーメニュー内リンクをトリガーに追加
    $(".sp_nav").toggleClass("active"); //thisだと同じページだった場合にバッテンが元に戻らない
  });
});

//スクロールした際の動きを関数でまとめる
function PageTopAnime() {
  var scroll = $(window).scrollTop(); //スクロール値を取得
  if (scroll >= 200) {
    //200pxスクロールしたら
    $("#page-top").removeClass("DownMove"); // DownMoveというクラス名を除去して
    $("#page-top").addClass("UpMove"); // UpMoveというクラス名を追加して出現
  } else {
    //それ以外は
    if ($("#page-top").hasClass("UpMove")) {
      //UpMoveというクラス名が既に付与されていたら
      $("#page-top").removeClass("UpMove"); //  UpMoveというクラス名を除去し
      $("#page-top").addClass("DownMove"); // DownMoveというクラス名を追加して非表示
    }
  }

  var wH = window.innerHeight; //画面の高さを取得
  var footerPos = $("#footer").offset().top; //footerの位置を取得
  if (scroll + wH >= footerPos + 10) {
    var pos = scroll + wH - footerPos + 10; //スクロールの値＋画面の高さからfooterの位置＋10pxを引いた場所を取得し
    $("#page-top").css("bottom", pos); //#page-topに上記の値をCSSのbottomに直接指定してフッター手前で止まるようにする
  } else {
    //それ以外は
    if ($("#page-top").hasClass("UpMove")) {
      //UpMoveというクラス名がついていたら
      $("#page-top").css("bottom", "10px"); // 下から10pxの位置にページリンクを指定
    }
  }
}

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
  PageTopAnime(); /* スクロールした際の動きの関数を呼ぶ*/
});

// ページが読み込まれたらすぐに動かしたい場合の記述
$(window).on("load", function () {
  PageTopAnime(); /* スクロールした際の動きの関数を呼ぶ*/
});

// #page-topをクリックした際の設定
$("#page-top").click(function () {
  $("body,html").animate(
    {
      scrollTop: 0, //ページトップまでスクロール
    },
    2000
  ); //ページトップスクロールの速さ。数字が大きいほど遅くなる
  return false; //リンク自体の無効化
});
