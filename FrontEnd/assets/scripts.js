const worksReponse = await fetch ("http://localhost:5678/api/works")
const worksList = await worksReponse.json()
const worksGallery = document.querySelector(".gallery")
const worksCategories = document.querySelector(".categories")
const worksCategoriesReponse = await fetch ("http://localhost:5678/api/categories")
const worksCategoriesList = await worksCategoriesReponse.json()

function WorksCategoriesCreation (id) {
    const categorie = worksCategoriesList[id]
    const button = document.createElement("button")
    const text = categorie.name
    const buttonText = document.createTextNode(text)
    button.appendChild(buttonText)
    worksCategories.appendChild(button)
    button.classList.add("buttonCategorieUnselected")
 }

 function WorksCategoriesDisplay () {
   for (let i=0; i < worksCategoriesList.length; i++) {
 WorksCategoriesCreation (i)
 }
 }

WorksCategoriesDisplay ()

let buttons = document.querySelectorAll(".categories button")
console.log(buttons)

function Workcreation (id) {
    const work = worksList[id]
    const workcategory = work.category.name
    const buttonSelected = document.querySelector(".buttonCategorieSelected")
    const buttonSelectedName = buttonSelected.textContent
    if (buttonSelectedName == "Tous") {
        const figure = document.createElement ("figure")
        const img = document.createElement ("img")
        img.src = work.imageUrl
        img.alt = work.title
        const figcaption = document.createElement ("figcaption")
        figcaption.innerText = work.title
        figure.appendChild(img)
        figure.appendChild(figcaption)
        worksGallery.appendChild(figure)
    }   
    else {
        if (buttonSelectedName == workcategory) {
            const figure = document.createElement ("figure")
            const img = document.createElement ("img")
            img.src = work.imageUrl
            img.alt = work.title
            const figcaption = document.createElement ("figcaption")
            figcaption.innerText = work.title
            figure.appendChild(img)
            figure.appendChild(figcaption)
            worksGallery.appendChild(figure)
        }

    }

}

function Worksdisplay () {
    for (let i=0; i < worksList.length; i++) {
 Workcreation (i)
}
}

Worksdisplay ()

function selectButton (buttonClicked) {
    buttonClicked.classList.remove("buttonCategorieUnselected")
    buttonClicked.classList.add("buttonCategorieSelected")
}

function unselectButton () {
    const buttonsSelected = document.querySelector(".buttonCategorieSelected")
    buttonsSelected.classList.remove("buttonCategorieSelected")
    buttonsSelected.classList.add("buttonCategorieUnselected")
}

function Worksremove () {
    const works = document.querySelectorAll("figure")
    for (let i=0 ; i<works.length; i++) {
        works[i].remove()
    }
}


for (let i=0 ; i<buttons.length; i++) {

buttons[i].addEventListener("click",(event)=>{
    console.log(event)
    unselectButton()
    selectButton (event.target)
    Worksremove()
    Worksdisplay()
})
}

