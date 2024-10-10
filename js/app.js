// Selectores
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

const formulario = document.querySelector('#formulario-cita');  // Cambiar a 'formulario'
const formularioInput = document.querySelector('#formulario-cita input[type="submit"]');  // Cambiar el texto del btn cuando se este editando
const contenedorCitas = document.querySelector('#citas');  // Selector del contenedor de citas




// Objeto de la cita
const citaObj = {
    id: generarId(),
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}

// Eventos
mascotaInput.addEventListener('change', datosCita);
propietarioInput.addEventListener('change', datosCita);
telefonoInput.addEventListener('change', datosCita);
fechaInput.addEventListener('change', datosCita);
horaInput.addEventListener('change', datosCita);
sintomasInput.addEventListener('change', datosCita);

formulario.addEventListener('submit', submitCita);

let editando = false;


//clases
class Notificacion {
    constructor(texto, tipo) {
        this.texto = texto;
        this.tipo = tipo;

        this.mostrar();
    }

    mostrar() {
        // Eliminar alerta previa si existe
        const alertaPrevia = document.querySelector('.alert');
        if (alertaPrevia) {
            alertaPrevia.remove();
        }

        // Crear notificación
        const alerta = document.createElement('div');
        alerta.classList.add('text-center', 'w-100', 'p-3', 'text-white', 'my-5', 'alert', 'uppercase', 'font-bold', 'text-sm');

        // Si el tipo es error, agrega la clase correspondiente
        this.tipo === 'error' ? alerta.classList.add('bg-danger') : alerta.classList.add('bg-success');

        // Mensaje de error
        alerta.textContent = this.texto;

        // Insertar en el DOM
        formulario.parentElement.insertBefore(alerta, formulario);

        //quitar depues de 5 segundos
        setTimeout(()=>{
            alerta.remove();
        }, 3000);
    }
}

class AdminCitas {
    constructor() {
        this.citas=[];
        
        
    }
    agregar(cita){
        this.citas = [...this.citas,cita];

        this.mostrar();
        
    }

    editar(citaActualizada){
        this.citas = this.citas.map(cita => cita.id === citaActualizada.id ? citaActualizada: cita);
        this.mostrar();
    }
    eliminar(id) {
        this.citas = this.citas.filter(cita => cita.id !== id);  // Eliminar la cita
        this.mostrar();  // Actualizar el DOM para que no se muestre más la cita eliminada
    }
    
    mostrar(){
        //limpiar el html
        while (contenedorCitas.firstChild) {
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }

        //generando las citas
        this.citas.forEach(cita =>{
            const divCita = document.createElement("div");
            divCita.classList.add('mx-5','mt-10','bg-white', 'shadow-md', 'px-5', 'py-10', 'rounded-xl');

            const mascota = document.createElement("p");
            mascota.classList.add('font-normal','mb-3','text-gray-700', 'normal-case');
            mascota.innerHTML=`<span class="font-bold uppercase">Paciente</span> ${cita.mascota}`;

            const propietario = document.createElement("p");
            propietario.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            propietario.innerHTML = `<span class="font-bold uppercase">Propietario: </span> ${cita.propietario}`;

            const telefono = document.createElement("p");
            telefono.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case');
            telefono.innerHTML = `<span class="font-bold uppercase">Telefono: </span> ${cita.telefono}`;

            const fecha = document.createElement('p');
            fecha.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case');
            fecha.innerHTML = `<span class="font-bold uppercase">Fecha: </span> ${cita.fecha}`;

            const hora = document.createElement('p');
            hora.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case');
            hora.innerHTML = `<span class="font-bold uppercase">Hora: </span>${cita.hora}`;

            const sintomas = document.createElement('p');
            sintomas.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case');
            sintomas.innerHTML = `<span class="font-bold uppercase">Sintomas: </span>${cita.sintomas}`;

            const btnEditar = document.createElement('button');
            btnEditar.classList.add('py-2', 'px-10', 'bg-indigo-600', 'hover:bg-indigo-700', 'text-white', 'font-bold', 'uppercase', 'rounded-lg', 'flex', 'items-center', 'gap-2', 'btn-editar');
            btnEditar.innerHTML = 'Editar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>'
            const clone = structuredClone(cita)
            btnEditar.onclick = () => cargarEdicion(clone);

            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('py-2', 'px-10', 'bg-red-600', 'hover:bg-red-700', 'text-white', 'font-bold', 'uppercase', 'rounded-lg', 'flex', 'items-center', 'gap-2');
            btnEliminar.innerHTML = 'Eliminar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
            btnEliminar.onclick = () => this.eliminar(cita.id);

            const contenedorBotones = document.createElement('div');
            contenedorBotones.classList.add('flex','justify-between', 'mt-10');

            contenedorBotones.appendChild(btnEditar);
            contenedorBotones.appendChild(btnEliminar);


            divCita.appendChild(mascota);
            divCita.appendChild(propietario);
            divCita.appendChild(telefono);
            divCita.appendChild(fecha);
            divCita.appendChild(hora);
            divCita.appendChild(sintomas);
            divCita.appendChild(contenedorBotones);


            //añadir al html
            contenedorCitas.appendChild(divCita);
        })
    }
}

// Funciones
function datosCita(e) {
    citaObj[e.target.name] = e.target.value;//esto es lo que hace que vaya mapeando en cada input del html y los coloce en el citaObj
}

const citas = new AdminCitas();

function submitCita(e) {
    e.preventDefault();

    // Validar si hay campos vacíos
    if (Object.values(citaObj).some(valor => valor.trim() === '')) {
       new Notificacion('Todos los campos son obligatorios', 'error');
        
        return;
    }

    if (editando) {
        citas.editar({...citaObj});
        new Notificacion('Guardado correctamente', 'exito');  
        
    }else{
        citas.agregar({...citaObj});
        new Notificacion('Paciente registrado', 'exito');   
    }

   
    formulario.reset();
    reiniciarObjetoCita();
    // citas.mostrar();
    // formularioInput.value = 'Registrar paciente';
    editando = false;

}


function reiniciarObjetoCita() {
    //reiniciar el obj
    citaObj.id= generarId();
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}

//generar id unico
function generarId() {
    return Math.random().toString(36).substring(2) + Date.now();
}

function cargarEdicion(cita) {
    Object.assign(citaObj,cita);
    mascotaInput.value = cita.mascota;
    propietarioInput.value = cita.propietario;
    telefonoInput.value = cita.telefono;
    fechaInput.value = cita.fecha;
    horaInput.value = cita.hora;
    sintomasInput.value = cita.sintomas;
    
    editando = true;

    // formularioInput.value = 'Guardar Cambios';
}