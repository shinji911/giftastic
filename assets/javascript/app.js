//ready js
$(document).ready(function () {
   let topics = ["rick and morty", "family guy", "adventure time", "steven universe", "spongebob squarepants", "venture bros", "simpsons"];

   //initialize variables here


   //store divs in variables
   let searchbtn = $("#searchbtn");
   let searchInput = $("#searchInput");
   let addBtn = $("#addBtn");
   let displayDiv = $("#displayDiv");

   //ajax call upon clicking on button
   $(document).on("click", ".btn-info", function () {
      let clickedBtn = $(this).attr("term");
      let queryURL = "https://api.giphy.com/v1/gifs/search?api_key=1iThDCkeb2A5dgCTRBPi2BGTzcgjjBpt&limit=10&q=" + clickedBtn;
      $.ajax({
         url: queryURL,
         method: "GET"
      }).then(function (response) {
         let results = response.data;
         for (let u = 0; u < results.length; u++) {
            let picDiv = $("<div>").addClass("float-left mx-2");
            let rating = $("<p>").text("Rating: " + results[u].rating);
            let gifImg = $("<img>").attr("src", results[u].images.fixed_height_still.url);
            gifImg.attr("data-still", results[u].images.fixed_height_still.url);
            gifImg.attr("data-ani", results[u].images.fixed_height.url);
            gifImg.attr("playstate", "false");
            picDiv.append(gifImg);
            picDiv.append(rating);
            displayDiv.prepend(picDiv);
         };
      }).catch(function () {
         alert("no gifs found");
      });
   });

   //on click for images to play gif when clicked
   $(document).on("click", "img", function() {
      if ($(this).attr("playstate") === "false") {
         $(this).attr("playstate", "true");
         $(this).attr("src", $(this).attr("data-ani"));
      } else {
         $(this).attr("playstate", "false");
         $(this).attr("src", $(this).attr("data-still"));
      }
   });

   //function to make button and add on to searchbtn div
   function makeBtn(array) {
      searchbtn.empty();
      for (let i = 0; i < array.length; i++) {
         let btn = $("<button>").text(array[i]);
         btn.attr("term", array[i]);
         btn.attr("type", "button").addClass("btn-info btn m-1");
         searchbtn.append(btn);
      };
      let resetbtn = $("<button>").text("reset");
      resetbtn.addClass("btn btn-danger m-1");
      searchbtn.append(resetbtn);
   };

   //on click for reset button to clear user made buttons
   $(document).on("click", ".btn-danger", function() {
      topics = ["rick and morty", "family guy", "adventure time", "steven universe", "spongebob squarepants", "venture bros", "simpsons"];
      makeBtn(topics);
   });

   //on click adding button to the searchbtn div
   addBtn.on("click", function (event) {
      event.preventDefault();
      topics.push(searchInput.val());
      searchInput.val("");
      makeBtn(topics);
   });

   makeBtn(topics);

   //end ready js
});