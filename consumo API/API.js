let usersData = []; // Array local para almacenar los usuarios

document.getElementById("loadDataBtn").addEventListener("click", loadUsers);
document.getElementById("userForm").addEventListener("submit", addUser);

function loadUsers() {
    // Si ya se han cargado usuarios, solo se muestran
    if (usersData.length > 0) {
        displayUsers(usersData);
        return;
    }

    // Si no, se cargan desde la API
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => {
            usersData = data;
            displayUsers(usersData);
        })
        .catch(error => console.error("Error al cargar los datos:", error));
}

function displayUsers(users) {
    const userList = document.getElementById("userList");
    userList.innerHTML = ''; // Limpiar la lista antes de mostrar nuevos usuarios

    users.forEach(user => {
        const userDiv = document.createElement("div");
        userDiv.classList.add("user");
        userDiv.innerHTML = `
            <h3>${user.name}</h3>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Ciudad:</strong> ${user.address.city}</p>
        `;
        userList.appendChild(userDiv);
    });
}

function addUser(event) {
    event.preventDefault(); // Prevenir que el formulario recargue la página

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const city = document.getElementById("city").value;

    const newUser = {
        name: name,
        email: email,
        address: {
            city: city
        }
    };

    fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
        .then(response => response.json())
        .then(data => {
            alert("Usuario agregado");
            // Agregar el nuevo usuario al array local y actualizar la vista
            usersData.push(data);
            displayUsers(usersData);
            // Opcional: limpiar el formulario
            document.getElementById("userForm").reset();
        })
        .catch(error => console.error("Error al agregar el usuario:", error));
}