document.addEventListener("DOMContentLoaded", function() {
    const video = document.querySelector("#video");
    const video_element = document.querySelector("#video-element");
    const link_button = document.getElementById('link-button');
    const start_button = document.getElementById('start-button');
    const overlay = document.getElementById('overlay');
  
    video_element.setAttribute('visible', false);
  
      // Solicitar interacción inicial del usuario
      start_button.addEventListener('click', function () {
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
          DeviceOrientationEvent.requestPermission()
            .then(permissionState => {
              if (permissionState === 'granted') {
                // Permiso concedido, puedes añadir el listener aquí si es necesario
                window.addEventListener('deviceorientation', event => {
                  // Procesar los datos de orientación
                });
              }
            })
            .catch(() => {
              // Manejar errores si es necesario
            });
        }
        video.play(); // Requiere esta interacción para habilitar reproducción
        video.pause(); // Pausa inmediatamente hasta que se detecte el target
        video.currentTime = 0;
        video.muted = false;
        video_element.setAttribute('visible', true);
        overlay.style.display = 'none';
      });
  
  
      // Registro del componente A-Frame
      AFRAME.registerComponent('mytarget', {
        init: function () {
          this.el.addEventListener('targetFound', () => {
            video.play();  // Reproduce el video
            video_button.style.display = 'block';
          });
          
          this.el.addEventListener('targetLost', () => {
            video.pause();  // Pausa el video
            video_button.style.display = 'none';
          });
        }
      });
  
      // Mostrar el botón cuando el video termine por primera vez
      video.addEventListener('ended', function () {
        link_button.style.display = 'block';
        video.loop = true;
      });
  
  
  });
  