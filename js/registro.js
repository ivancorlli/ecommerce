
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

/* enviar email */

var params= {
    from: 'crisz_zanesky@hotmail.com',
    to: 'criszanesky18@gmail.com',
    message: 'Nuevo Usuario Creado Nombre: Pepe Apellido: Luis Email: luis@hotmail.com Contraseña: 1234',
};
 
emailjs.send('service_9n5wu8g', 'template_zy2hlk8', params)
    .then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
       console.log('FAILED...', error);
    });

