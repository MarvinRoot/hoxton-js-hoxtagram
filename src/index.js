// write your code here
{/*   <article class="image-card">
        <h2 class="title">Title of image goes here</h2>
        <img src="./assets/image-placeholder.jpg" class="image" />
        <div class="likes-section">
          <span class="likes">0 likes</span>
          <button class="like-button">♥</button>
        </div>
        <ul class="comments">
          <li>Get rid of these comments</li>
          <li>And replace them with the real ones</li>
          <li>From the server</li>
        </ul>
      </article> */}

const state = {
    images:[],
    comments:[]
}
const imageContainer = document.querySelector('.image-container')

function renderCardImage(){
    imageContainer.innerHTML = ''

    for(const image of state.images){
        const cardTitle = document.querySelector('.title')
        cardTitle.textContent = `${image.title}`
        const cardImage = document.querySelector('.image')
        cardImage.src = image.image
        const cardLikesNumber = document.querySelector('.likes')
        cardLikesNumber.textContent = image.likes
        const cardUlEl = document.querySelector('.comments')
        getComments()
        renderCardComments(cardUlEl, image.id)
        imageContainer.append(cardTitle, cardImage, cardLikesNumber, cardUlEl)
    }
}

function renderCardComments(cardUlEl, targetId){

    for(const comment of state.comments.filter(function(comment){
        return comment.imageId === targetId
    })){
        const cardLiEl = document.createElement('li')
        cardLiEl.textContent = comment.content
        cardUlEl.append(cardLiEl)
    }
}

function getImages(){
    fetch('http://localhost:3000/images').then(function(resp){
        return resp.json()
    }).then(function(images){
         state.images = images})
}

function getComments(){
    fetch('http://localhost:3000/comments').then(function(resp){
        return resp.json()
    }).then(function(comments){
         state.comments = comments})
}

function pushToState(){
    getImages()
    getComments()
}

function renderCard(){
    renderCardImage()
    renderCardComments()
}

renderCard()