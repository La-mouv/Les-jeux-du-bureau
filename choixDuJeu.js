const messagesRef = firebase.database().ref('chat');
const chatBox = document.getElementById('chatBox'); // conteneur avec défilement
const chatMessages = document.getElementById('chatMessages'); // UL pour les messages
const chatInput = document.getElementById('chatInput');
const playerNameDisplay = document.getElementById('playerNameDisplay');
const playerName = sessionStorage.getItem('playerName') || 'Sans pseudo';
playerNameDisplay.textContent = playerName;

  function loadLeaderboards() {
    loadLeaderboardForGame('jeu1', 'leaderboardJeu1');
    loadLeaderboardForGame('jeu2', 'leaderboardJeu2');
    loadLeaderboardForGame('jeu3', 'leaderboardJeu3');
    loadLeaderboardForGame('jeu4', 'leaderboardJeu4');
    loadLeaderboardForGame('jeu5', 'leaderboardJeu5');
    loadLeaderboardForGame('jeu6', 'leaderboardJeu6');
  }
  
  function loadLeaderboardForGame(gameRef, leaderboardElementId) {
    const leaderboardElement = document.getElementById(leaderboardElementId);
    firebase.database().ref('/scores').orderByChild(gameRef).limitToLast(5).on('value', (snapshot) => {
      const scores = snapshot.val();
      if (scores) {
        const sortedScores = Object.keys(scores).map(player => ({ player, score: scores[player][gameRef] })).sort((a, b) => b.score - a.score);
        displayLeaderboard(sortedScores, leaderboardElement);
      }
    });
  }
  
  function displayLeaderboard(scores, element) {
    const leaderboardHtml = scores.map((score, index) => 
      `<p class="${index === 0 ? 'winner' : 'other'}">${index + 1}. ${score.player} - ${parseFloat(score.score).toFixed(1)}</p>`
    ).join('');
    element.innerHTML = leaderboardHtml;
  }
  

  // Appeler cette fonction au chargement de la page
  loadLeaderboards();
  
  function startGame(gamePage) {
    window.location.href = gamePage;
  }
  
  let currentGame = 0;

function move(step) {
  const games = document.querySelectorAll('.game-leaderboard');
  const totalGames = games.length;

  currentGame = (currentGame + step + totalGames) % totalGames;
  document.getElementById('game-slider').style.transform = `translateX(${-100 * currentGame}%)`;
}

function scrollToBottom() {
  chatBox.scrollTop = chatBox.scrollHeight;
}


// Envoyer un message
function sendMessage() {
  const text = chatInput.value.trim();
  if(text) {
    chatInput.value = '';
    messagesRef.push({ pseudo: playerName, message: text, timestamp: firebase.database.ServerValue.TIMESTAMP });
  }
}

// Écouter la touche Entrée dans le champ de saisie
chatInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendMessage();
  }
});

// Écouter les messages
messagesRef.on('child_added', (data) => {
  const message = data.val();
  const messageElement = document.createElement('li');
  // Créez un span pour le pseudo et appliquez la classe "pseudo"
  const pseudoElement = document.createElement('span');
  pseudoElement.textContent = message.pseudo;
  pseudoElement.className = 'pseudo';

      // Vérifiez si le pseudo est 'Alexis' et appliquez une couleur différente
    if (message.pseudo === 'Alexis') {
        pseudoElement.style.color = 'red';
    } else {
        pseudoElement.className = 'pseudo';
    }
  messageElement.appendChild(pseudoElement);
  messageElement.appendChild(document.createTextNode(": " + message.message));
  chatMessages.appendChild(messageElement);

  scrollToBottom();
});