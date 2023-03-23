let loadedPosts = 0;

function loadPosts() {
  fetch("../data/projects.json")
    .then((response) => response.json())
    .then((posts) => {
      const container = document.querySelector(".post-container");
      for (let i = loadedPosts; i < Math.min(posts.length, loadedPosts + 1); i++) {
        const post = posts[i];
        const postElem = createPostElement(post);
        document.getElementById('posts').appendChild(postElem);
      }
      loadedPosts += 1;
    });
}

function createPostElement(post) {
  const postElem = document.createElement('div');
  postElem.classList.add('post');

  const writerElem = document.createElement('div');
  writerElem.classList.add('writer');
  writerElem.innerText = "Senal Karanda";
  postElem.appendChild(writerElem);

  const imageElem = document.createElement('img');
  imageElem.classList.add('image');
  imageElem.src = post.image; 
  postElem.appendChild(imageElem);

  const titleElem = document.createElement('div');
  titleElem.classList.add('caption');
  titleElem.innerText = post.title;
  postElem.appendChild(titleElem);
  
  const companyElem = document.createElement('div');
  companyElem.classList.add('caption');
  companyElem.innerText = post.platform;
  postElem.appendChild(companyElem);
  
  const pointsElem = document.createElement('ul');
  pointsElem.classList.add('points');
  const points = post.points;
  for (let key in points) {
    if (points[key]) {
      const bulletElem = document.createElement('li');
      bulletElem.innerText = points[key];
      pointsElem.appendChild(bulletElem);
    }
  }
  postElem.appendChild(pointsElem);


  const dateElem = document.createElement('div');
  dateElem.classList.add('date');
  dateElem.innerText = post.date;
  postElem.appendChild(dateElem);

  return postElem;
}

function checkPageHeight() {
  if (document.body.scrollHeight > window.innerHeight) {
    // Page is tall enough to scroll, stop running the function
    clearInterval(intervalId);
  } else {
    // Page is not tall enough to scroll yet, keep running the function
    console.log('Page is not tall enough to scroll yet, loading another post.');
    // Load the initial set of posts when the page loads
    loadPosts();
  }
}

// Run the checkPageHeight function every 100 milliseconds
const intervalId = setInterval(checkPageHeight, 100);


// Load more posts when the user scrolls to the bottom of the page
window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    loadPosts();
  }
});