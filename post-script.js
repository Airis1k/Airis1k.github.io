init();

function init() {
   getUserPosts();
}

async function getUserPosts() {
   // Select mainDiv element
   const mainDiv = document.getElementById("user-posts");
   // div elem for single post
   const divElement = document.createElement("div");
   // ul elem for post info
   const ulElement = document.createElement("ul");

   // returns URL parameters
   const queryParams = window.document.location.search;
   const urlParams = new URLSearchParams(queryParams);
   const userId = urlParams.get("post_id");
   // fetch posts api
   const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${userId}/?_embed=comments&_expand=user`
   );
   const data = await response.json();

   // h2 elem to display post title
   const h2Element = document.createElement("h2");
   h2Element.textContent = data.title;
   // post author li elem
   const postAuthor = document.createElement("li");
   postAuthor.innerHTML = `<b>Author:</b> <a href="user.html?user_id=${data.user.id}">${data.user.name}</a>`;
   // post content li elem
   const postContent = document.createElement("li");
   postContent.innerHTML = `<p><b>Post Content:</b> ${data.body}</p>`;
   // post comments
   const postComments = document.createElement("li");
   postComments.innerHTML = `<b>Comments: </b>`;
   const commentsUlElement = document.createElement("ul");
   data.comments.forEach((element) => {
      // comment author
      const commentEmail = document.createElement("li");
      commentEmail.innerHTML = `<b><i>Email:</i></b> ${element.email}`;
      // comment title
      const commentTitle = document.createElement("li");
      commentTitle.innerHTML = `<b><i>Title:</i></b> ${element.name}`;
      // comment content
      const commentContent = document.createElement("li");
      commentContent.innerHTML = `<b><i>Content:</i></b> ${element.body}`;

      commentsUlElement.append(commentEmail, commentTitle, commentContent);
   });

   // Appends (insertion)
   postComments.append(commentsUlElement);
   ulElement.append(postAuthor, postContent, postComments);
   divElement.append(h2Element, ulElement);
   mainDiv.append(divElement);
}