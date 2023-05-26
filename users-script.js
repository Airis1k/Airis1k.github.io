init();

function init() {
   // get all the users
   getUsers();
}

async function getUsers() {
   // fetch users API
   const response = await fetch("https://jsonplaceholder.typicode.com/users?_embed=posts");
   const data = await response.json();

   // Select ul element
   const ulElement = document.getElementById("user-names");

   data.forEach(element => {
      // Create li element
      const liElement = document.createElement("li");
      // Create a element
      const aElement = document.createElement("a");
      // Prints user name and posts count
      aElement.innerHTML = `${element.name} - <i>(${element.posts.length})</i>`;
      aElement.href = `/user.html?user_id=${element.id}`;

      // Insert a element to li
      liElement.append(aElement);
      // Insert li element to ul
      ulElement.append(liElement);
   });
}