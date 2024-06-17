$(document).ready(function () {
  function changeScreen(screenId) {
    $(".screen").hide();
    $("#" + screenId).show();

    $(document).trigger("pageChanged", [screenId]);
  }

  $(document).on("pageChanged", function (event, screenId) {
    console.log("Page changed to: " + screenId);
    if (screenId === "home") {
      $(".home-desc").fadeIn();
    } else {
      $(".home-desc").hide();
    }
  });

  // 초기 화면 설정
  $("#home").show();

  // 버튼 클릭 이벤트
  $("#btnHome").click(function () {
    changeScreen("home");
  });

  $("#btnCard").click(function () {
    changeScreen("card");
  });

  $("#btnAbout").click(function () {
    changeScreen("about");
  });
});
