document.addEventListener('DOMContentLoaded', function () {
    const gameContainer = document.getElementById('game-container');
    const pen = document.getElementById('pen');
    let isMouseDown = false;
    let throwPower = 0;
    let throwAngle = 0;
    let mouseXStart = 0;
    let mouseYStart = 0;
  
    gameContainer.addEventListener('mousedown', function (event) {
      isMouseDown = true;
      mouseXStart = event.clientX;
      mouseYStart = event.clientY;
      pen.style.transform = `rotate(0deg)`; // Réinitialiser la rotation du stylo
      throwPower = 0; // Réinitialiser la puissance
    });
  
    gameContainer.addEventListener('mousemove', function (event) {
      if (isMouseDown) {
        // Calculez la puissance et l'angle ici en fonction du mouvement de la souris
        const mouseXCurrent = event.clientX;
        const mouseYCurrent = event.clientY;
        throwPower = Math.min(Math.sqrt(Math.pow(mouseXCurrent - mouseXStart, 2) + Math.pow(mouseYCurrent - mouseYStart, 2)) / 10, 5); // Limite la puissance à 5
        throwAngle = Math.atan2(mouseYCurrent - mouseYStart, mouseXCurrent - mouseXStart);
        pen.style.transform = `rotate(${-throwAngle}rad)`; // Oriente le stylo
      }
    });
  
    gameContainer.addEventListener('mouseup', function (event) {
      if (isMouseDown) {
        isMouseDown = false;
        launchPen(throwPower, throwAngle);
      }
    });
  
    function launchPen(power, angle) {
      // Utiliser la puissance et l'angle pour déterminer la trajectoire du stylo
      // Ceci est un exemple simplifié, vous devrez implémenter une simulation de physique
      const powerMultiplier = 10; // Ajustez ce multiplicateur pour la simulation
      const initialPosX = pen.offsetLeft;
      const initialPosY = pen.offsetTop;
  
      // Calculer la position finale basée sur la puissance et l'angle
      const finalPosX = initialPosX + Math.cos(angle) * power * powerMultiplier;
      const finalPosY = initialPosY + Math.sin(angle) * power * powerMultiplier;
  
      // Animation de lancer
      pen.style.transition = 'left 1s, bottom 1s, transform 1s';
      pen.style.left = `${finalPosX}px`;
      pen.style.bottom = `${720 - finalPosY}px`; // 720 est la hauteur du container
  
      // Réinitialiser la position du stylo après l'animation
      setTimeout(() => {
        pen.style.transition = '';
        pen.style.left = `${initialPosX}px`;
        pen.style.bottom = `${initialPosY}px`;
        pen.style.transform = 'rotate(0)';
      }, 1000);
    }
  });
  