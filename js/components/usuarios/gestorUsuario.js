import Servicios from './servicios.js';
class GestorUsuarios {
    constructor() {
        this.servicios = new Servicios();
        //todas las variables que deben inicializarse
        this.token = '';
        this.usuarios = [];
        //LOS USUARIOS DE LA FUNCION GESTORUSUARIOS
        this.init();
    }
    login() {
        const usuario = $('#user').val();
        const contrasena = $('#pass').val();
        /*  
            call(error, succss) {
                if (error) { .. }
                else { .. }
            }
            this.servicios.autenticar(usuario, contrasena, call){

            }
        */
        this.servicios.autenticar(usuario, contrasena, (error, response) => {
            if (error) {
                alert('Usuario o contraseña incorrectos');
            } else {
                //this.usuarios.push(response.usuario);
                //agrega un campo al array
                console.log(response);
                if (response.status == 200) {
                    alert('¡Login exitoso!');
                    this.token = response.token;
                    this.cleanMain();
                    this.mostrarUsuarios(this.token);
                }
            }
        });
    }
    mostrarUsuarios(token) {
        this.servicios.obtenerUsuarios(token, (error, response) => {
            if (error) {
                console.error('Error al obtener usuarios:', error);
            } else {
                console.log(response);
                this.renderizarUsuarios(response);
            }
        });
    }
    cleanMain() {
        $("#mainlogin").html("");
    }
    renderizarUsuarios(usuarios) {
        //usuarios ==> Array
        $('#mainlogin').append(`
        <table>
            <tr>
                <th>Nombre</th>
                <th>Edad</th>
                <th>DNI</th>
                <th>Estado Civil</th>
                <th>Foto</th>
            </tr>
    `);
    
    usuarios.forEach(usuario => {
        const color = usuario.edad < 18 ? "red" : "blue";
        $('#mainlogin table').append(`
            <tr>
                <td>${usuario.name}</td>
                <td style="color:${color};">${usuario.edad}</td>
                <td>${usuario.dni}</td>
                <td>${usuario.estado_civil}</td>
                <td class="usuario"><img src="${usuario.img}" alt=""></td>
            </tr>
        `);
    });
    
    $('#mainlogin').append(`</table>`);
    
    }
    renderLogin() {
        const templatelogin = `<div class="inputLogin">
            <div class="input">
                <label>Usuario</label>
                <input type="text" id="user" />
            </div>
            <div class="input">
                <label>Password</label>
                <input type="password" id="pass" />
            </div>
            <div class="input">
                <button type="submit" class="btn" id="btLogin">Logear</button>
            </div>
        </div>`;
        $("#mainlogin").append(templatelogin);
    }
    // funciones para IMPRIMIR vistas
    render() {
        this.renderLogin();
    }
    init() {
        this.render();
        //otras funcionalidades
        $('#btLogin').on('click', () => {
            this.login();
        });
    }
}

export default GestorUsuarios;