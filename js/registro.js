
function registrarUsuario() {
    let oldUser = JSON.parse (localStorage.getItem("users")) || [];
    let name = document.getElementById("name").value;
    let subname= document.getElementById("subname").value;  
    let email= document.getElementById("email").value;
    let password= document.getElementById("password").value;
    let user = {
        name,
        subname,
        email,
        password,
    }

    
    oldUser.push(user);
    localStorage.setItem('users',JSON.stringify(oldUser));
    
    let params= {
        from: 'crisz_zanesky@hotmail.com',
        to: 'criszanesky18@gmail.com',
        message: `Nuevo Usuario ${name} ${subname} ${email} ${password}`,
    };
     
    emailjs.send('service_9n5wu8g', 'template_zy2hlk8', params)
        .then(function(response) {
           console.log('SUCCESS!', response.status, response.text);
        }, function(error) {
           console.log('FAILED...', error);
        });
    

function saveUser() {
    let newUser = {}
    for(el of oldUser) {        
        newUser[el.getAttribute('name')] = el.value;
    }
    console.log(oldUser);
    localStorage.setItem('newUser', JSON.stringify(newUser));
}

}
function validarLogIn(){
    var idemail, password1;
    idemail = document.getElementById("emailLogIn").value;
    password1 = document.getElementById("passwordLogIn").value;
    if(idemail=="" || password1==""){
      alert("Todos los campos son obligatorios. Por favor, completalos e intentá nuevamente");
      return false;
    }
    else{
        alert("¡Bienvenido Nuevamente "+  emailLogIn.value + "!")
        window.open(href="/pages/administrador/admin.html")
    }
}


        
    



