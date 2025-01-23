AFRAME.registerComponent("static-video-clone", {
    init: function () {
      this.video = document.querySelector(this.el.getAttribute("src"))
      this.el.sceneEl.addEventListener("arReady", this.onARReady.bind(this))
    },
  
    onARReady: function () {
      const scene = this.el.sceneEl
      const targetEntity = this.el.parentElement
  
      targetEntity.addEventListener("targetFound", () => {
        // Clonar el video y fijarlo en la escena
        const clonedVideo = this.el.cloneNode(true)
        clonedVideo.setAttribute("id", "cloned-video")
  
        // Obtener la posición mundial del target
        const worldPosition = new THREE.Vector3()
        targetEntity.object3D.getWorldPosition(worldPosition)
  
        // Fijar el video clonado en la posición del target
        clonedVideo.setAttribute("position", worldPosition)
  
        // Añadir el video clonado a la escena
        scene.appendChild(clonedVideo)
  
        // Iniciar la reproducción del video clonado
        const videoElement = document.querySelector(clonedVideo.getAttribute("src"))
        videoElement.play()
  
        // Ocultar el video original
        this.el.setAttribute("visible", false)
  
        // Detener el seguimiento del target
        scene.systems["mindar-image-system"].stop()
      })
    },
  })
  
  