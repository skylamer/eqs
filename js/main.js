//google.load("jquery","1")
//google.load("webfont","1")
google.load("feeds", "1")

function OnLoad(o) {
  // Create a feed instance that will grab the feeds.
  var feedControl = new google.feeds.FeedControl();
  
  // Show number of these entries
  feedControl.setNumEntries(7)
  
  //feedControl.setNumEntries(101)
  
  // Adding the links of the feeds
  feedControl.addFeed("http://feeds.feedburner.com/RsoeEdis-EmergencyAndDisasterInformation", "HISZ Rsoe");
  feedControl.addFeed("http://earthquake.usgs.gov/earthquakes/feed/atom/significant/month", "USGS");
  feedControl.addFeed("http://www.emsc-csem.org/service/rss/rss.php?typ=emsc&magmin=6", "EMSC");
  feedControl.addFeed("http://geofon.gfz-potsdam.de/eqinfo/list.php?fmt=rss", "Geofon Potsdam");
  
  // Checking the view select
  if (o === "tabs")
    var ops = {
      drawMode : google.feeds.FeedControl.DRAW_MODE_TABBED
    }
  else
    var ops = {}
    
  // Calling load sends the request off.  It requires a callback function.
  feedControl.draw(document.getElementById("eq"), ops);
  if (o !== "tabs" && $(".gfc-resultsbox-visible").children().length >= 5)
    $(".gfc-resultsbox-visible > *:nth-child(4n)").after("<hr>");
  
}

$("form").on("submit", function (e) {
  e.preventDefault();
  return !1;
})

$(".search").on("change", function (e) {
  
  var value = $(this).val();
  if (value.trim() === "" || value.length > 100)
    return;
  console.log("Searching value: " + value)
  
  $(".gf-title").removeClass("highlight")
  $(".gf-title:contains(" + value + "), .gf-title:contains(" + value.toLowerCase() + "),.gf-title:contains( " + value.toUpperCase() + ")").addClass("highlight")
  
  console.log(e)
  console.log(this)
  console.log($(this))
  //#()
  return !1;
})

$("#options").on("change", function () {
  if ($(this).val() === "tabs")
    
    google.setOnLoadCallback(OnLoad($(this).val()));
  else
    google.setOnLoadCallback(OnLoad());
})

//setInterval(function() {
//$(".dnow").text("").append(new Date().toJSON())
//}, 10000)

$(document).ready(function () {
  google.setOnLoadCallback(OnLoad);
})
