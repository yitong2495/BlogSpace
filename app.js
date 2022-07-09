let postsArray = [];

function renderPost() {
    let html = " ";
    for (post of postsArray) {
        html += `
        <div class="post">
            <h3>${post.title}</h3>
            <p>${post.body} </p>
        </div>        
    `;
    }
    document.getElementById("blog-list").innerHTML = html;
}

fetch("https://apis.scrimba.com/jsonplaceholder/posts")
    .then((res) => res.json())
    .then((data) => {
        postsArray = data.slice(0, 6);
        renderPost();
    });

document.getElementById("new-post").addEventListener("submit", (e) => {
    e.preventDefault();
    const postTitle = document.getElementById("post-title").value;
    const postBody = document.getElementById("post-body").value;
    let data = {
        title: postTitle,
        body: postBody,
    };

    const options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    };

    fetch("https://apis.scrimba.com/jsonplaceholder/posts", options)
        .then((res) => res.json())
        .then((post) => {
            postsArray.unshift(post);
            renderPost();
            document.getElementById("new-post").reset();
        });
});
