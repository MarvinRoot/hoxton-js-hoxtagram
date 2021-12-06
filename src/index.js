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

function getImages(){
    return fetch('http://localhost:3000/images').then(function(resp){
        return resp.json()
    })
}

function getComments(){
    return fetch('http://localhost:3000/comments').then(function(resp){
        return resp.json()
    })
}

getImages().then(function(images){
    state.images = images;
    renderCardImages()
})

function renderCardImages(){
    imageContainer.innerHTML = ''

    for(const image of state.images){
        const card = document.createElement("article");
		card.setAttribute("class", "image-card");
		const cardTitle = document.createElement("h2");
		cardTitle.setAttribute("class", "title");
		cardTitle.textContent = image.title;
		const cardImg = document.createElement("img");
		cardImg.setAttribute("class", "image");
        cardImg.src = image.image;
		const cardLikesSection = document.createElement("div");
		cardLikesSection.setAttribute("class", "likes-section");
		const numberOfLikes = document.createElement("span");
		numberOfLikes.setAttribute("class", "likes");
		numberOfLikes.textContent = image.likes;
		const likeButton = document.createElement("button");
		likeButton.setAttribute("class", "like-button");
		likeButton.innerText = "♥";
		cardLikesSection.append(numberOfLikes, likeButton);

        const cardUlEl = document.createElement("ul");
		cardUlEl.setAttribute("class", "comments");
		getComments().then(function(comments){
			state.comments = comments;
			renderCardComments(cardUlEl, image.id);
		});

		card.append(cardTitle, cardImg, cardLikesSection, cardUlEl);
		imageContainer.append(card);
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