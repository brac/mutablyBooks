// jshint asi:true
$(document).ready(function(){
  getBooks()

  $('.resetBtn').on('click', () => {
    $.ajax({
      type: 'POST',
      url: "https://quiet-ravine-87109.herokuapp.com/reset",
      success: getBooks
    }) // end $ajax
  }) // end on click

  $('#new-book-form').on('submit', function(e) {
    e.preventDefault()
    const newBookData = $(this).serialize()
    addNewBook(newBookData)
  })
}) // end ready


addNewBook = (newBookData) => {
  $.ajax({
    type: 'POST',
    url: 'https://quiet-ravine-87109.herokuapp.com/books',
    data: newBookData,
    success: handleNewBook
  })
}

handleNewBook= (data) => {
  if (data._id != '') {
    $('#new-book-form').trigger('reset')
    getBooks()
  }
}

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
    listHTML += `<input name="title" type="text" autocomplete="title" class="form-control" id="book-title" placeholder="${book.title}"">`
    listHTML += `</div>`

    listHTML += `<div class="form-group">`
    listHTML += `<label for="book-author">Author</label>`
    listHTML += `<input name="author" type="text" autocomplete="name" class="form-control" id="book-author" placeholder="${book.author}">`
    listHTML += `</div>`

    listHTML += `<div class="form-group">`
    listHTML += `<label for="book-releasedate">Release Date</label>`
    listHTML += `<input name="releaseDate" type="text" autocomplete="date" class="form-control" id="book-releasedate" placeholder="${book.releaseDate}">`
    listHTML += `</div>`
    listHTML += `</form>`
    // end edit forms

    listHTML += `<div class="card-buttons mt-2">`
    listHTML += `<button type="button" class="mr-2 mb-3 editBtn btn btn-info" data-id="${book._id}" >Edit</button>`
    listHTML += `<button type="button" class="d-none mr-2 mb-3 saveBtn btn btn-success" data-id="${book._id}" >Save</button>`
    listHTML += `<button type="button" class="ml-2 mb-3 deleteBtn btn btn-danger" data-id="${book._id}" >Delete</button>`
    listHTML += `</div></div>`
  })
  return listHTML
}

$(document).on('click', '.editBtn', function()  {
  const id = $(this).data('id')
  // hide current record and edit button
  $(this).addClass('d-none')
  $(`[data-cardtext-id="${id}"]`).addClass('d-none')

  // show editable forms and save button
  $(this).siblings('.saveBtn').removeClass('d-none')
  $(`[data-edit-id="${id}"]`).removeClass('d-none')
})

$(document).on('click', '.saveBtn', function()  {
  const id = $(this).data('id')

  // gather the new data from the fields
  const form = $(`[data-edit-id="${id}"]`)
  let data = form.serialize()

  // Get the image link for the current card, append it to the new data
  data += `&image=${$(form).siblings('img.card-img-top').attr('src')}`

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
  const id = $(this).data('id')

  $.ajax({
    type: 'DELETE',
    url: `https://quiet-ravine-87109.herokuapp.com/books/${id}`,
    success: getBooks
  }) // end $ajax
})
