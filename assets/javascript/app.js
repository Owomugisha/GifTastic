$(document).ready (function () {
    //console.log("hello");
    var topics = ["Elephant", "Lions", "Pigs", "Owl"]
   
   function showBtn() {
    topics.forEach(element => {
        var animalBtn = $("<button>");
        animalBtn.text(element.toLocaleUpperCase());
        animalBtn.addClass("animal btn btn-success ml-5");
        $("#buttonDiv").append(animalBtn);
    });
   }
  //calling function that show all animal buttons
   showBtn();
//adding animal to array
    $("#addBtn").on("click", function() {
       
       var newAnimal = $("#animalInput").val().trim();
       //console.log(newAnimal);
       topics.push(newAnimal);
       $("#buttonDiv").empty();
       showBtn()
       $("#animalInput").val("");
    })
    //calling api 
    $(document).on("click",".animal", function () {
       // console.log("hello");
        var selectedAnimal = $(this).text().toLowerCase();
        console.log(selectedAnimal);
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        selectedAnimal + "&api_key=Kip4r7cb6K0558HbLDoWasL1WzNUqL5i&limit=12";

      // Performing an AJAX request with the queryURL
      $.ajax({
        url: queryURL,
        method: "GET"
      })
        // After data comes back from the request
        .then(function(response) {
          console.log(queryURL);

          console.log(response);
          // storing the data from the AJAX request in the results variable
          var results = response.data;

          // Looping through each result item
          for (var i = 0; i < results.length; i++) {

            // Creating and storing a div tag
            var animalDiv = $("<div>");

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);

            // Creating and storing an image tag
            var animalImage = $("<img height = '150' width = '300' >");
            // Setting the src attribute of the image to a property pulled off the result item
            animalImage.attr("src", results[i].images.fixed_width_still.url);
            animalImage.attr("data-still", results[i].images.fixed_width_still.url);
            animalImage.attr("data-animate", results[i].images.original.url);
            animalImage.attr("data-state", "still");
            animalImage.attr("class", "gif ");

            // Appending the paragraph and image tag to the animalDiv
            animalDiv.append(p);
            var row = $("<div>");
            row.addClass('col-md-4');
            row.html(animalImage)
            animalDiv.append(row);

            // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
            $("#imageDiv").prepend(animalDiv);
          }
        })
        $(document).on("click",".gif", function() {
           // console.log('heeeeeeeee')
            // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
            var state = $(this).attr("data-state");
            // If the clicked image's state is still, update its src attribute to what its data-animate value is.
            // Then, set the image's data-state to animate
            // Else set src to the data-still value
            if (state === "still") {
              $(this).attr("src", $(this).attr("data-animate"));
              $(this).attr("data-state", "animate");
            } else {
              $(this).attr("src", $(this).attr("data-still"));
              $(this).attr("data-state", "still");
            }
          });
    })
})