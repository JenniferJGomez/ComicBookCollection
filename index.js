document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM Loaded!")
    getAllComics()
    getForm().addEventListener('submit', newForm)
})

function getAllComics(){
    fetch("http://localhost:3000/heroines")
    .then(response => response.json())
    .then(data => data.forEach(comic =>renderComic(comic)))
}

function renderComic(comic) {
    let collectionDiv = document.querySelector('.comic-collection')
    let comicCard = document.createElement('div')
    comicCard.classList += "card"
    collectionDiv.appendChild(comicCard)

    let comicTitle = document.createElement('h3')
    comicTitle.innerText = comic.title 
    comicCard.appendChild(comicTitle)

    let comicDesc = document.createElement('p')
    comicDesc.innerText = comic.description
    comicCard.appendChild(comicDesc)

    let comicImg = document.createElement('img')
    comicImg.src = comic.image
    comicImg.classList += "comic-image"
    comicCard.appendChild(comicImg)

    let deleteButton = document.createElement('button')
    deleteButton.innerText = "Delete Heroine"
    deleteButton.classList += "delete-button"
    comicCard.appendChild(deleteButton)

    deleteButton.dataset.id = comic.id
    deleteButton.addEventListener("click", deleteEvent)
}

function getForm(){
    return document.querySelector('#heroine-form')
}

function newForm(e){
    e.preventDefault()
    console.log('clicking submit')
    let newTitle = e.target.title.value
    let newDesc = e.target.description.value
    let newImg = e.target.image.value

    let newComic = {title: newTitle, description: newDesc, image: newImg}
    e.target.reset()
    fetch('http://localhost:3000/heroines',{ 
        method: "POST", 
        headers: { 
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newComic)
      }).then(response => response.json())
      .then(comic => renderComic(comic))
}


function deleteEvent(){
        comicId = event.currentTarget.dataset.id
        fetch("http://localhost:3000/heroines/" + comicId, {
          method: 'DELETE',
        }).then(response => response.json()).then(json => console.log(json))
        event.currentTarget.remove()
       location.reload()
}