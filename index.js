document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM Loaded!")
    getAllComics()
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
}