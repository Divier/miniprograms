import capitalize from '../../dependencies/node_modules/capitalize-the-first-letter'

Page({
  data: { //ES UN OBJETO DE TIPO DATA, ALMACENA LOS DATOS NECESARIOS DE LA PAGINA, GUARDA LAS VARIABLES QUE SE DEBEN USAR EN LA INTERFAZ,SE PUEDE ACCEDER DESDE CUALQUIER PARTE DE LA PAGINA Y SE VINCULA DIRECTAMENTE CON EL AXML USANDO {{Variables}}
    formData: { // Es un subobjeto que almacena los datos del formulario, mantiene los 3 campos principales juntos
      nombre: '', //Variable
      edad: 10, //Variable
      aceptaTerminos: false //Variable
    },
    progress: 0, // Variable para la barra de progreso
    submitted: false, // Se inicia en false, controla el envio del formulario y cambia a true cuando se envia exitosamente
    error: false // Se inicia en false, controla los errores en el envio del formulario y cambia a true cuando hay problemas en el envio
  },

  calcularProgreso() { //Funcion CalcularProgreso
    let completado = 0; // Variable que se inicializa en 0 y se ira incrementando segun se llenen los datos del formulario hasta llegar a 100.
    const { nombre, edad, aceptaTerminos } = this.data.formData; // extrae los valores actuales del formulario, toma la foto del estado actual.
    if (nombre.trim().length >= 3) {
      completado += 33.33; //Revisa si el nombre tiene mas de 3 caracteres de ser asi suma a la variable completado el 33.33%
    }

    if (edad >= 10) {
      completado += 33.33; //Revisa si la edad es mayor a 10 y si es valido suma otro 33.33% a la variable completado.
    }

    if (aceptaTerminos) {
      completado += 33.34; //Revisa si acepto los terminos y de ser asi suma a la variable completado otro 33.33%
    }

    this.setData({
      progress: Math.round(completado) //Actualiza el progreso en el data y con la funcion match.round redondea al numero entero superior mas cercano para evitar los decimales.
    });
  },

  handleNameInput(e) { //Es una funcion que da manejo a cuando el usuario escribe en el campo nombre, e es el evento donde se almacena lo que el usuario escribio,
    this.setData({ //Metodo para actualizar los datos
      'formData.nombre': e.detail.value //formData.nombre: Indica que variable vamos a actualizar, e.detail.value: es el texto que el usuario va a actualizar
    },
      () => {
        this.calcularProgreso(); // esta funcion se ejecuta despues de guardar el nombre y llama a calcularProgreso para actualizar la barra de progreso.
      });
  },

  handleAgeChange(e) { //Es una funcion que se ejecuta cuando el usuario mueve el slider, e es el evento que contiene el valor seleccionado en el slider
    this.setData({ // Metodo para actualizar datos
      'formData.edad': e.detail.value //formData.edad: Indica que actualizaremos la edad con e.detail.value: el numero que selecciono el usuario en el slider
    },
      () => { //Toma los datos guardados y los envia a la funcion calcularProgreso
        this.calcularProgreso(); // esta funcion se ejecuta despues de guardar la edad y llama a calcularProgreso para actualizar la barra de progreso.
      });
  },

  handleTermsChange(e) { //Es una funcion que maneja cuando el usuario activa o desactiva el switch, e: el evento que contiene el estado del switch true/false.
    this.setData({ // Metodo para actualizar los datos
      'formData.aceptaTerminos': e.detail.value // formData.aceptaTerminos: Indica que actualizaremos el estado de los terminos/ e.detail.value indica el estado el switch si es true o false
    },
      () => { // Despues de guardar el estado de los terminos llama a la funcion calcular progreso para actualizar la barra de progreso
        this.calcularProgreso();
      });
  },

  handleSubmit() { //Esta funcion se ejecuta cuando el usuario presiona el boton enviar.
    if (this.data.progress === 100) { //Valida que el progreso sea del 100%. y de ser asi
      this.setData({ //Asigna los valores
        submitted: true, //Marca submmited como true
        error: false //Marca error como false
      });
      my.showToast({ // Mensaje de exito muestra una notificacion flotante
        type: 'success', //Define que es un mensaje de exito
        content: this.convertString('enviado ok'),
        duration: 3000 // Se muestra durante 2 segundos
      });
    } else { //Si no esta correcto
      this.setData({
        error: true, //muestra el mensaje de error
        submitted: false //marca como no enviado
      });
    }
  },

  convertString(str) {
    return capitalize(str);
  }
});