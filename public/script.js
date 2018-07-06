// jshint asi:true
console.log("Sanity Check: JS is working!");

$(document).ready(function(){
  $.ajax({
    type: 'GET',
    url: "https://quiet-ravine-87109.herokuapp.com/books",
    dataType: 'json',
    success: populateList
  }) // end $ajax

  $('.resetBtn').on('click', () => {
    $.ajax({
      type: 'POST',
      url: "https://quiet-ravine-87109.herokuapp.com/reset",
      success: getBooks
    }) // end $ajax
  }) // end on click
}) // end ready

populateList = (data) => {
  const resultHTML = parseBooks(data)
  const ul = $('.list-group')

  ul.html(resultHTML)
}

getBooks = () => {
  $.ajax({
    type: 'GET',
    url: "https://quiet-ravine-87109.herokuapp.com/books",
    dataType: 'json',
    success: populateList
  }) // end $ajax
}

parseBooks = (data) => {
  let listHTML = ''

  data.books.forEach(book => {
    listHTML += `<div class="card mb-5" style="width: 18rem;">`
    listHTML += `<img class="card-img-top" src="${book.image}" alt="Image of ${book.title}"`
    listHTML += `<div class="card-body">`

    // book 'card' container
    listHTML += `<div class="container" data-cardtext-id="${book._id}">`
    listHTML += `<h5 class="card-title mt-2">${book.title}</h5>`
    listHTML += `<h6 class="card-subtitle mb-2 text-muted">${book.author}</h6>`
    listHTML += `<p class="card-text">${book.releaseDate}</p>`
    listHTML += `</div>`

    // edit forms
    listHTML += `<form class="edit-form d-none" data-edit-id="${book._id}">`
    listHTML += `<div class="form-group">`
    listHTML += `<label for="book-title">Book Title</label>`
    listHTML += `<input type="text" autocomplete="title" class="form-control" id="book-title" placeholder="${book.title}"">`
    listHTML += `</div>`

    listHTML += `<div class="form-group">`
    listHTML += `<label for="book-author">Author</label>`
    listHTML += `<input type="text" autocomplete="name" class="form-control" id="book-author" placeholder="${book.author}">`
    listHTML += `</div>`

    listHTML += `<div class="form-group">`
    listHTML += `<label for="book-releasedate">Release Date</label>`
    listHTML += `<input type="text" autocomplete="date" class="form-control" id="book-releasedate" placeholder="${book.releaseDate}">`
    listHTML += `</div>`
    listHTML += `</form>`
    // end edit forms

    listHTML += `<div class="card-buttons" data-id="${book._id}">`
    listHTML += `<button type="button" class="mr-2 mb-3 editBtn btn btn-info">Edit</button>`
    listHTML += `<button type="button" class="d-none mr-2 mb-3 saveBtn btn btn-success">Save</button>`
    listHTML += `<button type="button" class="ml-2 mb-3 deleteBtn btn btn-danger">Delete</button>`
    listHTML += `</div></div>`
  })
  return listHTML
}

$(document).on('click', '.editBtn', function()  {
  const id = $(this).parent().data('id')
  // hide current record and edit button
  $(this).addClass('d-none')
  $(`[data-cardtext-id="${id}"]`).addClass('d-none')

  // show editable forms and save button
  $(this).siblings('.saveBtn').removeClass('d-none')
  $(`[data-edit-id="${id}"]`).removeClass('d-none')
})

$(document).on('click', '.saveBtn', function()  {
  const id = $(this).parent().data('id')

  // gather the new data from the fields
  const form = $(`[data-edit-id="${id}"]`)
  const data = {}

  data.image = $(form).siblings('img.card-img-top').attr('src')
  data.title = ($(form[0][0]).val() === '') ? $(form[0][0]).attr('placeholder') : $(form[0][0]).val()
  data.author = ($(form[0][1]).val() === '') ? $(form[0][1]).attr('placeholder') : $(form[0][1]).val()
  data.releaseDate = ($(form[0][2]).val() === '') ? $(form[0][2]).attr('placeholder') : $(form[0][2]).val()

  // Save data to online database
  $.ajax({
    type: 'PUT',
    url: `https://quiet-ravine-87109.herokuapp.com/books/${id}`,
    dataType: 'json',
    data: data,
    success: getBooks
  }) // end $ajax
})


$(document).on('click', '.deleteBtn', function()  {
  const id = $(this).parent().data('id')

  $.ajax({
    type: 'DELETE',
    url: `https://quiet-ravine-87109.herokuapp.com/books/${id}`,
    success: getBooks
  }) // end $ajax
})
