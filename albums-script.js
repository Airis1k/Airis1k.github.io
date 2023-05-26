init();

function init() {
   getUserAlbums();
}

async function getUserAlbums() {
   // Select main div element
   const mainDiv = document.getElementById("albums");

   // fetch albums API
   const response = await fetch(
      "https://jsonplaceholder.typicode.com/albums?_limit=40&_expand=user&_embed=photos"
   );
   const data = await response.json();

   // for saving user id
   const userIdArray = [];
   // for saving user names
   const userNamesArray = [];
   data.forEach((element, index) => {
      userIdArray.push({"userId":element.userId, "id":element.id, "index":index});
      userNamesArray.push(element.user.name);
   });


   // Remove duplicates from userIdArray
   const uniqueUserId = [];
   let number = 0;
   for (let i=0; i<userIdArray.length; i++) {
      if (userIdArray[i].userId != number) {
         uniqueUserId.push(userIdArray[i]);
         number = userIdArray[i].userId;
      }
   }

   // Creating array to save unique user names
   const uniqueUserNames = [...new Set(userNamesArray)];
   uniqueUserNames.forEach((element, index) => {

      // div elem for every single user
      const divElement = document.createElement("div");
      // h2 elem to display user names
      const h2Element = document.createElement("h2");
      h2Element.innerHTML = `<a href="/user.html?user_id=${uniqueUserId[index].userId}">${element}</a>`;

      // create img elem to display album photo
      /*
      *** Kiekvienas useris prasideda su unikaliu indexu.
      *** Sukuriau objekta, kuriame nurodziau ties kuriuo indexu prasideda naujas useris (pagal 'data' kintamaji).
      *** Pvz UserId=1 prasideda su 0 indexu, o UserId=2 prasideda su 10 indexu pagal data
      *** Algoritmas grazina tuos indexus, tada as juos idedu i data kintamaji ir tokiu atveju isvengiame loop.
      *** Pagal data --> index --> photos istraukiame URL
      */
      const imgElement = document.createElement("img");
      const imgIndex = uniqueUserId[index].index;
      const imgLink = data[imgIndex].photos[0].thumbnailUrl;
      // photo link to bigger picture
      const photoNav = document.createElement("a");
      photoNav.href = data[imgIndex].photos[0].url;
      photoNav.target = "_blank";
      imgElement.src = imgLink;
      imgElement.alt = "color block";
      photoNav.append(imgElement);

      // ul elem
      const ulElement = document.createElement("ul");

      data.forEach(elem2 => {

         // every user has its own album titles
         if (elem2.user.name === element) {
            // li elem for every album title
            const liElement = document.createElement("li");
            liElement.innerHTML = `<a href="/album.html?album_id=${elem2.id}">${elem2.title} <i>(${elem2.photos.length})</i></a>`;
   
            // add li elem to ul
            ulElement.append(liElement);
         }
      });

      // add h2 & ul elem to div. Then add div elem to mainDiv
      divElement.append(h2Element, photoNav, ulElement);
      mainDiv.append(divElement);
   });
}