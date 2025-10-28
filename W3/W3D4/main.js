const inputSearch = document.querySelector(".input-search");
const tableUsers = document.querySelector(".tableUsers");
const selectFilter= document.querySelector(".select-filter")
const tableMain= document.querySelector('.tableMain')

const getUsers = async () => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
    return await response.json();
  } catch (error) {
    console.log(error.message);
  }
};


getUsers().then(data=>{
  data.forEach(user=>generateTable(user))
});



const usersArray = (users) => {
  users.forEach((user) => generateTable(user));
};

const generateTable = (user) => {
  const trTable = document.createElement("tr");

  const tdName = document.createElement("td");
  tdName.innerText = user.name;
  const tdUsername = document.createElement("td");
  tdUsername.innerText = user.username;
  const tdMail = document.createElement("td");
  tdMail.innerText = user.email;

  trTable.append(tdName, tdUsername, tdMail);
  tableUsers.append(trTable);
};

inputSearch.addEventListener("input", () => {
 filterData()
});

selectFilter.addEventListener('change', ()=>{
  filterData()
})

const filterData= async ()=>{
  const property= selectFilter.value
  const search= inputSearch.value.toLowerCase()
  const users= await getUsers()
  const filteredUsers= users.filter(user=> {
    if(!search){
      return true
    }
    const value= user[property].toLowerCase()
    return value.includes(search)
  })
  tableUsers.innerHTML=""
  if(filteredUsers.length===0){
    tableMain.innerHTML=""
     tableMain.innerText= `Utente non trovato tramite ${property}`
  }
  filteredUsers.forEach(user=> generateTable(user))
}
