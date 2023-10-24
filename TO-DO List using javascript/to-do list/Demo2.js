const input = document.getElementById("inputText");
const addBtn = document.getElementById("addBtn");
const btnText = addBtn.innerText;
const taskDisplay = document.getElementById('tasks');
const deleteAllBtn = document.getElementById("deleteAllBtn");


let userArray = [];
let edit_id = null;

let objAbc = localStorage.getItem('users');
if (objAbc != null) {
    userArray = JSON.parse(objAbc);
}



ShowItems();
addBtn.onclick = () => {
    const name = input.value;
    if (edit_id != null) {
        userArray.splice(edit_id, 1, { 'name': name })
        edit_id = null;
    } else {
        const name = input.value;
        userArray.push({ 'name': name });
    }
    SaveItems(userArray);
    input.value = '';
    addBtn.innerText = btnText;
}

function SaveItems(userArray) {
    let abc = JSON.stringify(userArray)
    localStorage.setItem('users', abc);
    ShowItems();
}

function ShowItems() {
    let statement = '';
    userArray.forEach((users, i) => {
        statement += `<tr>
    <td><span class="sno">${i+1}.</span> <input type="checkbox" class="xyz" id="check${i}" onclick="done(${i})"/></td>
    <td> <span class=" h5" id="text${i}"> ${users.name} </span> </td>
    <td> 
    <button class=" btn btn-dark" onclick="deleteList(${i})">Delete</button>
    <button class=" btn btn-dark" onclick="editList(${i})">Edit</button>
    </td>
  </tr>`;
        i++;
    })
    taskDisplay.innerHTML = statement;
}

function done(listId) {
    let checkbox = document.getElementById(`check${listId}`);
    let current = document.getElementById(`text${listId}`);
    let classExit = current.classList.contains("text-decoration-line-through");
    if (classExit == true) {
        current.classList.remove("text-decoration-line-through");
    } else {
        current.classList.add("text-decoration-line-through");
    }
}

function editList(listId) {

    if (confirm("Do you really want to Edit this?")) {
        edit_id = listId;
        input.value = userArray[listId].name;
        addBtn.innerText = 'EDIT';
    }
}


function deleteList(listId) {
    if (confirm("Warning !!! This Data will be Deleted")) {
        userArray.splice(listId, 1);
        SaveItems(userArray);
    } else {
        SaveItems(userArray);
    }
};


deleteAllBtn.addEventListener("click", function() {
    let objAbc = localStorage.getItem('users');
    userArray = JSON.parse(objAbc);
    if (objAbc == null) {
        userArray = [];
    } else {
        userArray = JSON.parse(objAbc);
        if (confirm("Warning whole list will be deleted")) {
            userArray = [];
        }
    }
    localStorage.setItem('users', JSON.stringify(userArray));
    ShowItems();
})