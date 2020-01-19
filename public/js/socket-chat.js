var socket = io();

// configuracion de leer por parametro
var params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala') || params.get('sala').trim().length === 0) {
    window.location = 'index.html';
    throw new Error('El nombre y la sala es necesario');
}

// obtenemos el usuario
var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala').trim().toLocaleLowerCase()
}


socket.on('connect', function() {

    console.log('Conectado al servidor');

    // escuchamos los usuarios que se conectan y ejecutamos una respuesta 
    socket.emit('entrarChat', usuario, (resp) => {
        console.info('Usuarios conectados', resp);
    });

});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});

// Enviar información
socket.emit('enviarMensaje', {
    mensaje: 'Hola Mundo'
}, function(resp) {
    console.log('respuesta server: ', resp);
});

// Escuchar información
socket.on('crearMensaje', function(mensaje) {

    console.log('Servidor:', mensaje);

});

// Escuchar cambios de usuarios
// Cuando un usuario entra o sale del chat
socket.on('listaPersona', (personas) => {

    console.log(personas);

});


// creando mensajes privados
socket.on('mensajePrivado', (mensaje) => {

    console.log('mensaje privado ', mensaje);
})