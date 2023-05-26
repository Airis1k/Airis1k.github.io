import { firstLetterUpperCase } from "./functions.js";


init();

function init() {
   getUserPostsAndComments();
}

async function getUserPostsAndComments() {
   // Select main div element
   const mainDiv = document.getElementById("posts");

   // fetch users-posts-comments API
   const response = await fetch("https://jsonplaceholder.typicode.com/posts?_embed=comments&_expand=user");
   const data = await response.json();

   // Array to hold unique user names
   const userNameArray = [];
   const userIdArray = [];
   data.forEach(element => {
      userNameArray.push(element.user.name);
      userIdArray.push(element.user.id);
   });


   // Remove duplicate names
   const uniqueUserNames = [...new Set(userNameArray)];
   const uniqueUserIds = [...new Set(userIdArray)];
   uniqueUserNames.forEach((element, index) => {
      // Create div elem for every single user
      const divElement = document.createElement("div");
      // Create h2 to display name
      const h2Element = document.createElement("h2");
      h2Element.innerHTML = `<a href="/user.html?user_id=${uniqueUserIds[index]}">${element}</a>`;
      // Create ul element
      const ulElement = document.createElement("ul");


      // Add every post title to linked userId (1 user : 10 posts)
      data.forEach((elem2) => {
         if (elem2.user.name === element) {

            const titleName = firstLetterUpperCase(elem2.title);
            // Create li element
            const liElement = document.createElement("li");
            liElement.innerHTML = `<a href="/post.html?post_id=${elem2.id}">${titleName}</a> <i>(${elem2.comments.length})</i>`;

            // add li elem to ul
            ulElement.append(liElement);
         }
      });

      // Insert h2 & ul elem to div
      divElement.append(h2Element, ulElement);
      // Insert div elem to mainDiv
      mainDiv.append(divElement);
   });
}