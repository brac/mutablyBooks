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
  let listHTML = ''
  const ul = $('.list-group')

  data.books.forEach(book => {
    listHTML += `<div class="card mb-5" style="width: 18rem;">`
    listHTML += `<img class="card-img-top" src="${book.image}" alt="Image of ${book.title}"`
    listHTML += `<div class="card-body">`
    listHTML += `<h5 class="card-title mt-2">${book.title}</h5>`
    listHTML += `<h6 class="card-subtitle mb-2 text-muted">${book.author}</h6>`
    listHTML += `<p class="card-text">${book.releaseDate}</p>`
    listHTML += `<div class="card-buttons">`
    listHTML += `<button type="button" class="mr-2 mb-3 editBtn btn btn-info">Edit</button>`
    listHTML += `<button type="button" class="ml-2 mb-3 deleteBtn btn btn-danger">Delete</button>`
    listHTML += `</div></div></div>`
  })
  ul.html(listHTML)
}