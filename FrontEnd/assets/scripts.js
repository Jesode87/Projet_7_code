const reponse = await fetch ("http://localhost:5678/api/works")
const workslist = await reponse.json()
const worksgallery = document.querySelector(".gallery")

function Workcreation (id) {
const work = workslist[id]
const figure = document.createElement ("figure")
const img = document.createElement ("img")
img.src = work.imageUrl
img.alt = work.title
const figcaption = document.createElement ("figcaption")
figcaption.innerText = work.title
figure.appendChild(img)
figure.appendChild(figcaption)
worksgallery.appendChild(figure)

}

function Workdisplay () {
    for (let i=0; i < workslist.length; i++) {
 Workcreation (i)
}
}

Workdisplay ()