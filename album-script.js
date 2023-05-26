init();

function init() {
   getUserAllAlbums();
}

async function getUserAllAlbums() {
   // Select mainDiv element
   const mainDiv = document.getElementById("user-albums");
   // div elem for user album
   const divElement = document.createElement("div");
   // div elem for photos
   const photosDiv = document.createElement("div");
   photosDiv.classList.add("gallery");

   // returns URL parameters
   const queryParams = window.document.location.search;
   const urlParams = new URLSearchParams(queryParams);
   const albumId = urlParams.get("album_id");

   // fetch albums API
   const response = await fetch(
      `https://jsonplaceholder.typicode.com/albums/${albumId}?_expand=user&_embed=photos`
   );
   const data = await response.json();

   // h2 elem to display album title
   const h2Element = document.createElement("h2");
   h2Element.textContent = data.title;
   // div elem to display album author
   const albumAuthor = document.createElement("div");
   albumAuthor.classList.add("album-author");
   albumAuthor.innerHTML = `<b>Author:</b> <a href="/user.html?user_id=${data.userId}">${data.user.name}</a>`;

   // Working with album photos
   data.photos.forEach((element) => {
      // a->img elem for photo
      const aElement = document.createElement("a");
      aElement.innerHTML = `<img src="${element.thumbnailUrl}" alt="color block">`;
      aElement.href = element.url;

      // set attribute for aElement
      const attribute = document.createAttribute("data-lightbox");
      attribute.value = "mygallery";
      aElement.setAttributeNode(attribute);

      // insert photo to div elem
      photosDiv.append(aElement);
   });

   divElement.append(h2Element, albumAuthor, photosDiv);
   mainDiv.append(divElement);
}