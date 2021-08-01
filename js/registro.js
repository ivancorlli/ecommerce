
function registrarUsuario() {
    let oldUser = JSON.parse (localStorage.getItem("users")) || [];
    let name = document.getElementById("name").value;
    let subname= document.getElementById("subname").value;  
    let email= document.getElementById("email").value;
    let password= document.getElementById("password").value;
    console.log(name,subname,email,password) ;
    let user = {
        name,
        subname,
        email,
        password,
    }
    oldUser.push(user);
    localStorage.setItem('users',JSON.stringify(oldUser));

}

