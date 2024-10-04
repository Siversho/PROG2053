// Script begins

document.addEventListener('DOMContentLoaded', () => {       // To load the page without the need of a button
    let page = 1;       // general variables i need
    let limit = 9;      // -
    function fetchPosts() {
        fetch("https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}") // API request 
            .then((response) => {                       // For traceability & bugfixing, error messages are saved.
                if (!response.ok) {
                    throw new Error("Error with the status: " + response.status);
                }
                return response.json();
            })      
            .then((posts) => {                          // if not- we go on
                let container = document.getElementById("main-container");  // Selecting the main container where out 
                // data will be put

                posts.forEach(post => {         // iterating through the posts
                    const article = document.createElement("article");      // creating element within this post "article"
                    const title = document.createElement("h1");             // creating element for the post title
                    title.textContent = post.title;                         // title text is set from the data
                    const body = document.createElement("p");               // creating a paragraph for the post
                    body.textContent = post.body;                           // the body is set to the data
                    article.appendChild(title);                             // add the title
                    article.appendChild(body);                              // add the body 
                    container.appendChild(article);                         // lastly we append it to our main container
                });

                page++; // increment the page number for the next fetch
            })
            .catch((error) => {     // just an error check for bugfixing & readability.
                console.error("Error fetching posts:", error);
            });
    }

    fetchPosts(); // calling our function again to load our first set of posts

    // now this one is a bit odd, and i had alot of help. This helps, through our scrolling to load more posts, 
    // if we are a little bit over the top of the bottom of the page.
    window.addEventListener("scroll", () => {       
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1) {
            fetchPosts();
        }
    });
});




