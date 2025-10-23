<template>
  <div id="app relative isolate">
    
    <div class="absolute 
    text-gray-700
    flex h-screen w-screen z-10 bg-transparent justify-center">

      <div class="flex flex-col items-center justify-center size-fit
      self-center relative">
        <div class="size-[240px] text-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-full">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z" />
          </svg>
        </div>
        <div class="font-light text-[2rem] rounded-xl px-2 py-1">
          Escanea tu QR
        </div>

        <div class="absolute size-full">
          <div class="relative size-full bg-red-200/200">

            <div class="left-top border-t-[8px] border-s-[8px] size-[35%] border-blue-400 rounded-tl-3xl absolute -left-6 -top-6 animate-breath"></div>
            <div class="right-top border-t-[8px] border-e-[8px] size-[35%] border-blue-400 rounded-tr-3xl absolute -right-6 -top-6 animate-breath"></div>
            
            <div class="left-bottom border-b-[8px] border-s-[8px] size-[35%] border-blue-400 rounded-bl-3xl absolute -bottom-6 -left-6 animate-breath"></div>
            <div class="left-bottom border-b-[8px] border-e-[8px] size-[35%] border-blue-400 rounded-br-3xl absolute -bottom-6 -right-6 animate-breath"></div>
  
            <div class="absolute w-[140%] h-[8px] -left-[20%] bg-blue-400 rounded-xl animate-scan"></div>

          </div>

        </div>

      </div>
    </div>

    <div class="absolute inset-0 inline-flex flex-row z-0 overflow-hidden">
      <div class="absolute inset-0 justify-center inline-flex flex-row">
        <div class="bg-teal-300 opacity-50 blur-[80px] size-[400px] rounded-full relative animate-uno"></div>
        <div class="bg-blue-300 opacity-50 blur-[80px] size-[400px] rounded-full relative animate-dos"></div>
        <div class="bg-purple-300 opacity-50 blur-[80px] size-[400px] rounded-full relative animate-tres"></div>
      </div>
    </div>
    

  </div>
</template>

<script>
import Swal from 'sweetalert2'



export default {

  name: 'App',
  components: {

  },
  data() {
    return {
      buffer: "",    // guarda los caracteres del lector
      ultimoQR: null, // guardamos el último QR completo
      alumno: {
        nombre_completo: '',
        hora_inicio: '',
        hora_fin: '',
        plantel: '',
        matricula: '',
        salon: '',
        nivel: '',
        mensaje_descuento: '',
      },
      puedePostear: true,
    };
  },
  methods: {
    manejarTecla(e) {
      if (e.key === "Enter") {
        // Se completó un QR
        this.ultimoQR = this.buffer;
        console.log("QR completo:", this.ultimoQR);

        // Aquí puedes disparar un evento o llamar a un método

        this.procesarQR(this.ultimoQR)
        // Limpiar buffer para la siguiente lectura
        this.buffer = "";
      } else {
        this.buffer += e.key;
      }
    },

    procesarQR(valor) {
        // const valor = event.target.value.trim();

        if (valor) {
          console.log('Código leído:', valor);
          // event.target.value = ''; // limpia el input para el siguiente escaneo

          if(this.puedePostear){
            this.puedePostear = false
            return this.$http.post("asistencia.qr", { id_alumno: valor }).then((response) => {
  
              console.log( response.data )
              this.alumno = response.data
              
              const [horaInicio, minutosInicio] = this.alumno.hora_inicio.split(":");
              this.alumno.hora_inicio = `${ horaInicio }:${ minutosInicio }`;
              
              const [horaFin, minutosFin] = this.alumno.hora_fin.split(":");
              this.alumno.hora_fin = `${ horaFin }:${ minutosFin }`;

              // Si no tiene el proximo ciclo pagado
              if( this.alumno.proximo_ciclo_pagado === 0 ){

                const descuento = this.calcularDescuentoYDias( response.data.fecha_inicio_ciclo )
                console.log( descuento )

                if( descuento.descuento !== 0 ){
                  this.alumno.mensaje_descuento = 
                  `Aprovecha el ${ descuento.descuento }% de descuento en el pago de tu próximo ciclo, aún tienes ${ descuento.diasRestantes } ${ descuento.diasRestantes === 1 ? 'día': 'dias'}.`
                } else this.alumno.mensaje_descuento = ''

              }else this.alumno.mensaje_descuento = ''

              const duracion = 30000; // 30 segundos
              let tiempoRestante = duracion / 1000; // en segundos
              let intervalo; // para guardar el setInterval
  
              // Mostrar alerta de éxito
              Swal.fire({
                title: '¡Asistencia registrada!',
                timer: duracion,
                timerProgressBar: true,
                showConfirmButton: false,
                icon: 'success',
                html: `<div class='bg-gray-50 size-full text-gray-600 text-left flex flex-col justify-center items-center p-4 space-y-2'>
                  <div class='flex'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>

                    <p class='pl-4'>${this.alumno.nombre_completo}</p>
                  </div>
                  
                  <div class='flex'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
                    </svg>
                    
                    <p class='pl-4'>${this.alumno.matricula}</p>
                    
                  </div>
                  
                  <p>${this.alumno.nivel}</p>
  
                  <div class='flex'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                    </svg>
                    <p class='pl-4'>${this.alumno.plantel}</p>
                  </div>

                  <div class='flex'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
                    </svg>
                    
                    <p class='pl-4'>${this.alumno.salon}</p>
                  </div>
                  
                  <div class='flex'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <p class='pl-4'>Horario: ${this.alumno.hora_inicio} - ${this.alumno.hora_fin}</p>
                  </div>

                  <div class='text-center py-4 font-semibold text-blue-500 text-[1.6rem]'>
                    ${ this.alumno.mensaje_descuento }
                  </div>
                  
                  <div class='pt-4 text-sm text-gray-500 '>
                    Esta ventana se cerrará en <span id="contador-segundos">${tiempoRestante}</span> segundos...
                  </div>
                </div>`,
                
                didOpen: () => {
                  const contadorEl = document.getElementById("contador-segundos");
                  intervalo = setInterval(() => {
                    tiempoRestante--;
                    if (contadorEl) contadorEl.textContent = tiempoRestante;
                  }, 1000);
                },
                willClose: () => {
                  clearInterval(intervalo); // limpia el contador
                },
                didClose: () => {
                  // Reactivar los POST cuando se cierre la alerta
                  this.puedePostear = true;
                }
              })
            })
            .catch( error =>{
              console.log( error )
              // Mostrar alerta de error
          Swal.fire({
            title: 'Error',
            text: error.response?.data?.message || 'Algo salió mal',
            icon: 'error',
            timer: 5000,
            timerProgressBar: true,
            showConfirmButton: false,
            didClose: () => {
              // Reactivar los POST cuando se cierre la alerta
              this.puedePostear = true;
            }
          })
            }).finally( () => { this.cargar = false })
          }

        }
    },

    calcularDescuentoYDias(fecha_inicio_ciclo) {
      const hoy = new Date();
      const inicioCiclo = new Date(fecha_inicio_ciclo.replace(' ', 'T'));

      // Diferencia en milisegundos y convertir a días
      const diffMs = hoy - inicioCiclo;
      const diasPasados = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      let descuento = 0;
      let diasRestantes = 0;

      if (diasPasados >= 0 && diasPasados <= 14) {
        descuento = 20;
        diasRestantes = 14 - diasPasados;
      } else if (diasPasados >= 15 && diasPasados <= 21) {
        descuento = 10;
        diasRestantes = 21 - diasPasados;
      } else {
        descuento = 0;
        diasRestantes = 0;
      }

      return {
        descuento,
        diasRestantes
      };
    }

  },
  mounted() {
    // Registramos el listener global cuando se monta el componente
    document.addEventListener("keypress", this.manejarTecla);
  },
  beforeDestroy() {
    // Eliminamos el listener cuando el componente se destruye
    document.removeEventListener("keypress", this.manejarTecla);
  }
}
</script>

<style>
.swal-popup-custom {
  max-height: none !important;
  overflow: visible !important;
  width: auto !important;
  height: 100vw;
  max-width: 90vw; /* para pantallas pequeñas */
}
</style>


