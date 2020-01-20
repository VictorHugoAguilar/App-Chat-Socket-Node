const { io } = require('../server');
const { Usuarios } = require('../classes/Usuario');
const { crearMensaje } = require('../util/util');

const usuarios = new Usuarios();

io.on('connection', (client) => {

    // escuchamos los usuario que entran en la conexion
    client.on('entrarChat', (data, callback) => {

        console.log(data);

        // validamos los datos
        if (!data.nombre || !data.sala) {
            return callback({
                error: true,
                message: 'Nombre o Sala son necesario'
            });
        }

        client.join(data.sala);

        usuarios.agregarPersona(client.id, data.nombre, data.sala);

        // enviamos el mensaje de conexion nuevametne a todos los clientes
        client.broadcast.to(data.sala).emit('listaPersona', usuarios.getPersonaPorSala(data.sala));

        // enviamos un mensaje cuando un usario se conecta a la sala
        client.broadcast.to(data.sala).emit('crearMensaje', crearMensaje('Admin', `${data.nombre} entró en el chat`));

        callback(usuarios.getPersonaPorSala(data.sala));
    });

    // escuchamos los mensajes
    client.on('crearMensaje', (data, callback) => {

        let persona = usuarios.getPersona(client.id);

        let mensaje = crearMensaje(persona.nombre, data.mensaje);

        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);

        callback(mensaje);
    });


    // para la desconexion eliminamos el usaurio desconectado
    client.on('disconnect', () => {

        let personaBorrada = usuarios.borrarPersona(client.id);

        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Admin', `${personaBorrada.nombre} abandonó el chat`));

        // enviamos el mensaje de conexion nuevametne a todos los clientes
        client.broadcast.to(personaBorrada.sala).emit('listaPersona', usuarios.getPersonaPorSala(personaBorrada.sala));

    });


    // envio de mensajes privados
    client.on('mensajePrivado', (data) => {

        let persona = usuarios.getPersona(client.id);

        // Para enviar un mensaje privado utilizamos el .to()
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));

    });


});