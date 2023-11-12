
  function loadLeaderboards() {
    loadLeaderboardForGame('jeu1', 'leaderboardJeu1');
    loadLeaderboardForGame('jeu2', 'leaderboardJeu2');
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
  