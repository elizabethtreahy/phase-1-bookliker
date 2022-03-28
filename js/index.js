document.addEventListener("DOMContentLoaded", function () {
  fetchBooks()
});
function fetchBooks() {
  fetch('http://localhost:3000/books')
    .then(response => response.json())
    .then(data => loadBooks(data))
}
function loadBooks(bookData) {
  console.log(bookData)
  bookData.forEach(element => {
    const li = document.createElement("li")
    li.innerText = element.title
    li.addEventListener("click", (event) => {
      loadBookInfo(element)
    })
    document.getElementById("list").append(li)
  })
}
function loadBookInfo(bookInfo) {
  const img = document.createElement("img")
  img.src = bookInfo.img_url
  document.getElementById("show-panel").replaceChildren()
  document.getElementById("show-panel").append(img)
  const h3 = document.createElement("h3")
  h3.textContent = bookInfo.description
  document.getElementById("show-panel").append(h3)
  const h4 = document.createElement("h4")
  h4.id = ("user-list")
  bookInfo.users.forEach(value => {
    const li = document.createElement('li')
    li.innerText = value.username
    h4.append(li)
  })
  document.getElementById("show-panel").append(h4)
  const button = document.createElement("button")

  let likeTruthy = true
  button.innerText = ("Like")
  button.addEventListener("click", () => {
    if (likeTruthy === true) {
      patchUsers(bookInfo, likeTruthy)
      button.innerText = ("Unlike")
      likeTruthy = !likeTruthy
      return likeTruthy
    }
    else {
      patchUsers(bookInfo, likeTruthy)
      button.innerText = ("Like")
      likeTruthy = !likeTruthy
      return likeTruthy
    }
  })
  document.getElementById("show-panel").append(button)
}

function patchUsers(book, likeTruthy) {
  fetch('http://localhost:3000/users/2')
    .then(response => response.json())
    .then(user => {
      if (likeTruthy) {
        console.log('you liked')
        book.users.push(user)
        const li = document.createElement("li")
        li.textContent = user.username
        document.getElementById("user-list").append(li)
        fetch(`http://localhost:3000/books/${user.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(book)
        })
          .then(response => response.json())
          .then(data => console.log(data))
      }
      else if (likeTruthy === false) {
        console.log('you unliked')
      }
    })

}