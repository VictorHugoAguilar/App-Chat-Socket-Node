class Usuarios {

    constructor() {
        this.personas = [];
    }

    // Añadimos una persona a la lista de personas
    agregarPersona(id, nombre, sala) {

        let persona = {
            id,
            nombre,
            sala
        };

        // añadimos la persona al arreglo de personas
        this.personas.push(persona);

        // devolvemos todos las personas
        return this.personas;
    }

    // Obtener una persona
    getPersona(id) {

        let persona = this.personas.filter(persona => {
            return persona.id === id;
        })[0];

        return persona;

    }

    // retornamos todas las personas
    getPersonas() {
        return this.personas;
    }

    // Obtener personas por sala
    getPersonaPorSala(sala) {
        let personaPorSala = this.personas.filter((persona) => {
            return persona.sala === sala;
        });

        return personaPorSala;

    }

    // Eliminar una persona de la lista
    borrarPersona(id) {

        let personaEliminada = this.getPersona(id);

        this.personas = this.personas.filter(persona => {
            return persona.id !== id;
        });

        return personaEliminada;
    }
}


module.exports = {
    Usuarios
}