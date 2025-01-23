AFRAME.registerComponent("static-video", {
    init: function () {
      this.video = document.querySelector(this.el.getAttribute("src"))
      this.el.sceneEl.addEventListener("arReady", this.onARReady.bind(this))
    },
  
    onARReady: function () {
      const scene = this.el.sceneEl
      const targetEntity = this.el.parentElement
      let videoFixed = false
  
      targetEntity.addEventListener("targetFound", () => {
        if (!videoFixed) {
          // Fijar el video en la posición actual del target
          const worldPosition = new THREE.Vector3()
          const worldRotation = new THREE.Quaternion()
          const worldScale = new THREE.Vector3()
  
          targetEntity.object3D.getWorldPosition(worldPosition)
          targetEntity.object3D.getWorldQuaternion(worldRotation)
          targetEntity.object3D.getWorldScale(worldScale)
  
          // Crear una nueva entidad para el video fijo
          const fixedVideoEntity = document.createElement("a-entity")
          fixedVideoEntity.setAttribute("position", worldPosition)
          fixedVideoEntity.setAttribute("rotation", {
            x: THREE.MathUtils.radToDeg(worldRotation.x),
            y: THREE.MathUtils.radToDeg(worldRotation.y),
            z: THREE.MathUtils.radToDeg(worldRotation.z),
          })
          fixedVideoEntity.setAttribute("scale", worldScale)
  
          // Clonar el video y añadirlo a la nueva entidad
          const clonedVideo = this.el.cloneNode(true)
          clonedVideo.removeAttribute("static-video")
          fixedVideoEntity.appendChild(clonedVideo)
  
          // Añadir la nueva entidad a la escena
          scene.appendChild(fixedVideoEntity)
  
          // Iniciar la reproducción del video
          const videoElement = clonedVideo.components.material.material.map.image
          videoElement.play()
  
          // Ocultar el video original
          this.el.setAttribute("visible", false)
  
          // Marcar el video como fijado
          videoFixed = true
  
          // Detener el seguimiento del target
          scene.systems["mindar-image-system"].stop()
        }
      })
    },
  })
  