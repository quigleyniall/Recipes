
function request(url){
let request = new XMLHttpRequest ()
request.open('GET',url)
request.responseType = 'json'
request.send()
request.onload = function(){
  searchResponse(request.response)
}

}
let i;

let num = Math.floor(Math.random()*20)
let searchUrl = "http://food2fork.com/api/search?key=b4513d9f1016bc33d7422d04ef8751b8&page="+ num


let Response = request(searchUrl)


function searchResponse(data){
  let main = document.querySelector('main');
  while (main.firstChild) {
      main.removeChild(main.firstChild);
    }
  for(i = 0; i < data.recipes.length; i++){
  let main = document.querySelector('main');
  let section = document.createElement('section')
  let button = document.createElement('button')
  let heading = document.createElement('h4')
  let image = document.createElement('img')

  let a = document.createElement('a')
  let linkText = document.createTextNode('Cooking Instructions')
  a.appendChild(linkText)

  button.textContent = 'Ingredients'
  button.value = data.recipes[i].recipe_id
  button.addEventListener('click', function(){
    retrieveIngredients(this.value)
  })

  heading.textContent = data.recipes[i].title

  image.src = data.recipes[i].image_url

  a.href = data.recipes[i].source_url
  a.target = '_blank'

  main.appendChild(section);
  section.appendChild(heading);
  section.appendChild(image);
  section.appendChild(a)
  section.appendChild(button)
}

}

function search(){
  let num = Math.floor(Math.random()*1)
  let searchterm = document.getElementById('searchterm').value
  searchUrl = "http://food2fork.com/api/search?key=b4513d9f1016bc33d7422d04ef8751b8&q=" + searchterm + "&page=" + num
  request(searchUrl)
}

function searchCategory(value){
  let num = Math.floor(Math.random()*1)
  searchUrl = "http://food2fork.com/api/search?key=b4513d9f1016bc33d7422d04ef8751b8&q=" + value + "&page=" +num
  request(searchUrl)
}

function retrieveIngredients(data){
  searchUrl = "http://food2fork.com/api/get?key=b4513d9f1016bc33d7422d04ef8751b8&rId=" + data
  send(searchUrl)
}

function send(url){
  let message = new XMLHttpRequest()
  message.open('GET', url)
  message.responseType = 'json'
  message.send()
  message.onload = function (){
    let x=[];
    for(i = 0; i < message.response.recipe.ingredients.length; i++){
    // console.log(message.response.recipe.ingredients[i])
x.push(message.response.recipe.ingredients[i])

  }
display(x)
  }
}
 function display(x){
let modal = document.getElementById('myModal');
let span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";
    document.getElementById('ingredients').innerHTML = ''
    for(i=0; i<x.length; i++){
document.getElementById('ingredients').innerHTML += '<li>'+x[i]+'</li>'
}
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
 }
