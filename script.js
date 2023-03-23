// Load the posts from the JSON files
let loadedPosts = 0;

function loadPosts() {
  fetch("posts.json")
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


// Create a post element from a post object
function createPostElement(post) {
  const postElem = document.createElement('div');
  postElem.classList.add('post');

  const writerElem = document.createElement('div');
  writerElem.classList.add('writer')
  writerElem.innerText = post.writer;
  postElem.appendChild(writerElem);

  const imageElem = document.createElement('img');
  imageElem.classList.add('image')
  imageElem.src = post.image;
  postElem.appendChild(imageElem);

  const captionElem = document.createElement('div');
  captionElem.classList.add('caption');
  captionElem.innerText = post.caption;
  postElem.appendChild(captionElem);

  const contentElem = document.createElement('div');
  contentElem.classList.add('content');
  contentElem.innerText = post.content;
  postElem.appendChild(contentElem);

  const dateElem = document.createElement('div');
  dateElem.classList.add('date');
  dateElem.innerText = formatPostDate(post.date);
  postElem.appendChild(dateElem);

  return postElem;
}

// Format the post date to display as "x days/weeks/months/years ago"
function formatPostDate(dateStr) {
  const postDate = new Date(dateStr);
  const now = new Date();
  const diff = now - postDate;

  if (diff < 1000 * 60 * 60 * 24) {
    const hours = Math.floor(diff / (1000 * 60 * 60));
    return hours + ' hours ago';
  } else if (diff < 1000 * 60 * 60 * 24 * 7) {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return days + ' days ago';
  } else if (diff < 1000 * 60 * 60 * 24 * 30) {
    const weeks = Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
    return weeks + ' weeks ago';
  } else if (diff < 1000 * 60 * 60 * 24 * 365) {
    const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
    return months + ' months ago';
  } else {
    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    return years + ' years ago';
  }
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
