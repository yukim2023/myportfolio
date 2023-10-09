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
  var open = $(".slider li");
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
