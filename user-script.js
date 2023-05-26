init();

function init() {
   getUserData();
}

async function getUserData() {
   // Select main div elem
   const mainDiv = document.getElementById("user-info");
   // div for every single user
   const divElement = document.createElement("div");
   divElement.classList.add("user-details");

   // returns URL parameters
   const queryParams = window.document.location.search;
   const urlParams = new URLSearchParams(queryParams);
   const userId = urlParams.get("user_id");


   // Fetch user API
   const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}?_embed=posts&_embed=albums`
   );
   const data = await response.json();

   // h2 elem to display user nickname
   const h2Element = document.createElement("h2");
   h2Element.textContent = data.username;
   // ul elem for user info
   const ulElement = document.createElement("ul");
   // full name
   const nameElement = document.createElement("li");
   nameElement.innerHTML = `<b>Full Name:</b> ${data.name}`;
   // email
   const emailElement = document.createElement("li");
   emailElement.innerHTML = `<b>Email:</b> <a href="mailto:${data.email}">${data.email}</a>`;
   // address
   const addressElement = document.createElement("li");
   // google maps link
   const mapURL = 
   `https://www.google.com/maps/search/?api=1&query=${data.address.geo.lat},${data.address.geo.lng}`;
   addressElement.innerHTML = 
   `<b>Address:</b> <a href="${mapURL}" target="_blank">${data.address.city}, ${data.address.street} St., ${data.address.suite}, ZIP: ${data.address.zipcode}</a>`;
   // phone
   const phoneElement = document.createElement("li");
   phoneElement.innerHTML = `<b>Phone:</b> <a href="tel:${data.phone}">${data.phone}</a>`;
   // website
   const webElement = document.createElement("li");
   webElement.innerHTML = 
   `<b>Website:</b> <a href="https://www.google.com/" target="_blank">${data.website}</a>`;
   // company
   const companyElement = document.createElement("li");
   companyElement.innerHTML = `<b>Company:</b> ${data.company.name} CO.`;


   // User posts & albums
   const userPosts = createPostOrAlbum(data.posts, "user-posts", "User Posts", "/post.html");
   const userAlbums = createPostOrAlbum(data.albums, "user-albums", "User Albums", "/album.html");
   // insert posts and albums into div
   const divElement2 = document.createElement("div");
   divElement2.classList.add("user-post-album");
   divElement2.append(userPosts, userAlbums);


   // Insert all user info to ul elem. Then insert h2 and ul elems to div (single user).
   // every user div elem will be inserted to mainDiv
   ulElement.append(nameElement, emailElement, addressElement, phoneElement, webElement, companyElement);
   divElement.append(h2Element, ulElement);
   mainDiv.append(divElement, divElement2);
}

function createPostOrAlbum(userData, className, header, link) {
   // div elem for posts / albums
   const divElement = document.createElement("div");
   divElement.classList.add(className);
   // h3 elem to display header
   const h3Element = document.createElement("h3");
   h3Element.textContent = header;
   // ul elem for user post / album titles
   const ulElement = document.createElement("ul");

   userPostOrAlbum = userData;
   userPostOrAlbum.forEach((element) => {
      // li elem for every single title
      const liElement = document.createElement("li");
      liElement.innerHTML = `<a href="${link}">${element.title}</a>`;

      ulElement.append(liElement);
   });

   divElement.append(h3Element, ulElement);

   return divElement;
}