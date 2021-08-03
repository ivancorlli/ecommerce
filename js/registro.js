
function registrarUsuario() {
    let oldUser = JSON.parse (localStorage.getItem("users")) || [];
    let nameUser = document.getElementById("nameUser").value;
    let subname= document.getElementById("subname").value;  
    let email= document.getElementById("email").value;
    let password= document.getElementById("password").value;
    let user = {
        nameUser,
        subname,
        email,
        password,
        status: "pending"
    }

    
    oldUser.push(user);
    localStorage.setItem('users',JSON.stringify(oldUser));
    
    let params= {
        from: 'crisz_zanesky@hotmail.com',
        to: 'criszanesky18@gmail.com',
        message: `Nuevo Usuario ${nameUser} ${subname} ${email} ${password}`,
    };
     
    emailjs.send('service_9n5wu8g', 'template_zy2hlk8', params)
        .then(function(response) {
           console.log('SUCCESS!', response.status, response.text);
        }, function(error) {
           console.log('FAILED...', error);
        });
    
   
}


  
        
    



