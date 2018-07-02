// jshint asi:true
console.log("Sanity Check: JS is working!");

$(document).ready(function(){
  $('.booksBtn').on('click', () => {
    $.ajax({
      type: 'GET',
      url: "https://quiet-ravine-87109.herokuapp.com/books",
      dataType: 'json',
      success: populateList
    }) // end $ajax
  }) // end on click
}) // end ready

populateList = (data) => {
  console.log(data)
}