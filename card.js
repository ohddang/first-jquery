$(document).ready(function () {
  const fullTimeSec = 30;
  let startTime;
  let timerInterval;
  let isGameover = false;
  let flippedCards = [];
  let matchCount = 0;

  startTimer();

  $(".card").on("click", function () {
    if (!isGameover && flippedCards.length < 2 && !$(this).attr("class").includes("flipped")) {
      const cardValue = $(this).data("card-value");
      $(this).addClass(`flipped-${cardValue}`);
      flippedCards.push($(this));

      if (flippedCards.length === 2) {
        if (flippedCards[0].data("card-value") === flippedCards[1].data("card-value")) {
          flippedCards = [];
          matchCount++;
          if (matchCount === 8) {
            alert("You Win!");
            stopTimer();
          }
        } else {
          setTimeout(function () {
            flippedCards[0].removeClass(`flipped-${flippedCards[0].data("card-value")}`);
            flippedCards[1].removeClass(`flipped-${flippedCards[1].data("card-value")}`);
            flippedCards = [];
          }, 1000);
        }
      }
    }
  });

  $("#btnRestart").on("click", function () {
    $(".card").removeClass("flipped-1 flipped-2 flipped-3 flipped-4");
    matchCount = 0;

    startTimer();
    flippedCards = [];
  });

  $(document).on("pageChanged", function (event, screenId) {
    console.log("Page changed to: " + screenId);
    if (screenId === "card") {
      startTimer();
    } else {
      stopTimer();
    }
  });

  function startTimer() {
    isGameover = false;
    $(".card").removeClass("flipped-1 flipped-2 flipped-3 flipped-4");

    startTime = Date.now();
    timerInterval = setInterval(function () {
      if (!isGameover) {
        var elapsedTime = Date.now() - startTime;
        if (elapsedTime >= fullTimeSec * 1000) {
          alert("Time Over!");
          stopTimer();
        } else $("#timer").text("Time: " + (fullTimeSec - elapsedTime / 1000).toFixed(2));
      }
    }, 100);
  }

  function stopTimer() {
    isGameover = true;
    matchCount = 0;
    clearInterval(timerInterval);
  }
});
