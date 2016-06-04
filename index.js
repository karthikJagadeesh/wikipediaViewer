$(document).on("ready", function() {

  var getData = function(input) {
    $.ajax({
      url: "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + input + "&utf=8&format=json",
      dataType: "jsonp",
      success: function(value) {

        var i = 0,
          linkValue;
        while (i < 10 || value.query.search[i] !== undefined) {
          if (value.query.search[0] === undefined) {
            $(".article").html("<div class='eachArticle'><p>Oops! No Result</p></div>");
            $(".eachArticle").animate({
              margin: '20px',
              opacity: '1'
            }, "slow");
          }

          linkValue = "https://en.wikipedia.org/wiki/" + value.query.search[i].title;
          $(".article").append("<a id='clickable' target='_blank' href='" + linkValue + "' ><div class='eachArticle'><p><strong id='title'>" + value.query.search[i].title.toUpperCase() + " </strong> </p><br><p>" + value.query.search[i].snippet + "........<em>more</em> </p></div></a>");
          $(".eachArticle").animate({
            margin: '20px',
            opacity: '1'
          }, "slow");
          i++;
        }
      }
    });
  }

  $(".eachArticle").on("click", function() {
    console.log("clicked");
  })

  $(".searchBox").on("click", function() {
    $(".article").empty();
    getData($(".search-query").val());
  })

  $(".search-query").keydown(function(event) {
    if (event.keyCode == 13) {
      $(".article").empty();
      getData($(".search-query").val());
      $('.search-query').blur();
      return false;
    }
  });

  $(".searchRandom").on("click", function() {
    window.open("http://en.wikipedia.org/wiki/Special:Random/");
  })

});
