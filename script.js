(function(){
  "use strict";

  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------- Scroll cue ---------- */
  document.getElementById('scrollCue').addEventListener('click', function(){
    document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
  });

  /* ---------- Hero triforce subtle tilt ---------- */
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hero = document.getElementById('hero');
  var triforce = document.getElementById('heroTriforce');
  if(!reduceMotion){
    hero.addEventListener('mousemove', function(e){
      var r = hero.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      triforce.style.transform = 'perspective(600px) rotateY(' + (x*10) + 'deg) rotateX(' + (-y*10) + 'deg)';
    });
    hero.addEventListener('mouseleave', function(){
      triforce.style.transform = 'perspective(600px) rotateY(0deg) rotateX(0deg)';
    });
  }

  /* ---------- Timeline data ---------- */
  var games = [
    { year: 1986, title: "The Legend of Zelda", blurb: "El original: un reino visto desde arriba, sin instrucciones, donde explorar por cuenta propia era la única guía." },
    { year: 1987, title: "Zelda II: The Adventure of Link", blurb: "Un giro hacia la acción lateral y el sistema de experiencia, la entrega más atípica de la saga." },
    { year: 1991, title: "A Link to the Past", blurb: "Consolidó la fórmula clásica: dos mundos paralelos, un mapa denso y mazmorras memorables." },
    { year: 1993, title: "Link's Awakening", blurb: "Una historia íntima en una isla soñada, fuera de Hyrule por primera vez." },
    { year: 1998, title: "Ocarina of Time", blurb: "El salto a las tres dimensiones y al viaje en el tiempo como mecánica central." },
    { year: 2000, title: "Majora's Mask", blurb: "Tres días en bucle constante y una atmósfera más oscura que cualquier entrega anterior." },
    { year: 2002, title: "The Wind Waker", blurb: "Un océano por explorar y una dirección de arte de trazos limpios y colores vivos." },
    { year: 2006, title: "Twilight Princess", blurb: "Un tono más adulto y la transformación de Link en lobo como eje de la aventura." },
    { year: 2011, title: "Skyward Sword", blurb: "Islas flotantes sobre las nubes y controles de movimiento pensados para el combate." },
    { year: 2017, title: "Breath of the Wild", blurb: "Hyrule se abre por completo: un mundo para recorrer en cualquier orden, sin rutas fijas." },
    { year: 2023, title: "Tears of the Kingdom", blurb: "El mismo reino, ahora también hacia el cielo y las profundidades, con la fusión como herramienta." }
  ];

  var rail = document.getElementById('timelineRail');
  games.forEach(function(g){
    var li = document.createElement('li');
    li.className = 'timeline-item';
    li.innerHTML =
      '<div class="timeline-year">' + g.year + '</div>' +
      '<h3>' + g.title + '</h3>' +
      '<p>' + g.blurb + '</p>';
    rail.appendChild(li);
  });

  /* ---------- Virtues ---------- */
  var virtues = {
    power: {
      label: "Poder",
      title: "Din, la fuerza que forjó la tierra",
      text: "La diosa Din dio forma al suelo de Hyrule con sus manos ardientes. Su virtud, el Poder, suele terminar en manos de quienes buscan dominar el reino en lugar de protegerlo: quien la reclama con el corazón desequilibrado se convierte en la amenaza que el resto de la leyenda debe enfrentar."
    },
    wisdom: {
      label: "Sabiduría",
      title: "Nayru, la mente que trazó las leyes",
      text: "Nayru vertió su sabiduría sobre el mundo recién creado, dándole leyes y orden. Su fragmento del Triforce suele recaer en la línea real de Hyrule: gobernar el reino exige entender sus riesgos tanto como amarlo, y esa virtud rara vez se transmite sin sacrificio."
    },
    courage: {
      label: "Coraje",
      title: "Farore, el espíritu que sembró la vida",
      text: "Farore sembró la vida y el espíritu de quienes habitarían Hyrule. El Coraje, su virtud, aparece una y otra vez en un héroe que no elige la aventura: simplemente no puede mirar hacia otro lado cuando el reino lo necesita."
    }
  };

  var grid = document.getElementById('virtueGrid');
  var detail = document.getElementById('virtueDetail');
  var buttons = {};

  Object.keys(virtues).forEach(function(key){
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'virtue-tile';
    btn.setAttribute('aria-pressed', 'false');
    btn.dataset.virtue = key;
    btn.innerHTML = '<span class="mini-tri" aria-hidden="true"></span>' + virtues[key].label;
    btn.addEventListener('click', function(){ selectVirtue(key); });
    grid.appendChild(btn);
    buttons[key] = btn;
  });

  function selectVirtue(key){
    Object.keys(buttons).forEach(function(k){
      buttons[k].setAttribute('aria-pressed', k === key ? 'true' : 'false');
    });
    var v = virtues[key];
    detail.innerHTML = '<h3>' + v.title + '</h3><p>' + v.text + '</p>';
  }

  /* ---------- Trivia quiz ---------- */
  var questions = [
    {
      q: "En Ocarina of Time, ¿cómo se llama la hada compañera de Link?",
      options: ["Tatl", "Navi", "Ciela", "Fi"],
      answer: 1,
      fact: "Navi acompaña a Link desde el Bosque Kokiri durante toda su primera aventura en tres dimensiones."
    },
    {
      q: "En Breath of the Wild, ¿qué dispositivo usa Link para escanear el entorno y activar poderes?",
      options: ["La Lente de la Verdad", "La Sheikah Slate", "El Pictobox", "El Escudo Espejo"],
      answer: 1,
      fact: "La Sheikah Slate funciona como mapa, escáner y llave para las bombas y demás habilidades de Link."
    },
    {
      q: "¿Cómo se llaman las tres diosas creadoras de Hyrule que dejaron el Triforce?",
      options: [
        "Din, Nayru y Farore",
        "Farore, Eldin y Lanayru",
        "Naboris, Ruta y Medoh",
        "Impa, Purah y Robbie"
      ],
      answer: 0,
      fact: "Din, Nayru y Farore aparecen resumidas en la canción de apertura de casi todos los juegos principales."
    },
    {
      q: "En The Wind Waker, ¿qué usa Link principalmente para cruzar el océano?",
      options: ["Una hoja gigante", "Un Loftwing", "El Rey de los Leones Rojos, un bote parlante", "Un transbordador"],
      answer: 2,
      fact: "El Rey de los Leones Rojos no es solo transporte: guarda un vínculo directo con la historia del reino hundido."
    },
    {
      q: "¿Cómo se llama la identidad alternativa de Zelda en Ocarina of Time?",
      options: ["Tetra", "Sheik", "Impa", "Midna"],
      answer: 1,
      fact: "Bajo el nombre de Sheik, Zelda guía a Link durante los siete años que pasa dormido tras tomar la Espada Maestra."
    }
  ];

  var quizState = { index: 0, score: 0, answered: false };
  var quizCard = document.getElementById('quizCard');

  function renderQuestion(){
    var qData = questions[quizState.index];
    quizState.answered = false;

    var progressHTML = '';
    for(var i=0;i<questions.length;i++){
      progressHTML += '<span class="' + (i <= quizState.index ? 'done' : '') + '"></span>';
    }

    var optionsHTML = qData.options.map(function(opt, i){
      return '<button class="quiz-option" data-i="' + i + '">' + opt + '</button>';
    }).join('');

    quizCard.innerHTML =
      '<div class="quiz-progress">' + progressHTML + '</div>' +
      '<p class="quiz-question">' + (quizState.index + 1) + '. ' + qData.q + '</p>' +
      '<div class="quiz-options">' + optionsHTML + '</div>' +
      '<div class="quiz-fact-slot"></div>';

    var optionButtons = quizCard.querySelectorAll('.quiz-option');
    optionButtons.forEach(function(btn){
      btn.addEventListener('click', function(){
        if(quizState.answered) return;
        quizState.answered = true;
        var chosen = parseInt(btn.dataset.i, 10);
        optionButtons.forEach(function(b){ b.disabled = true; });

        if(chosen === qData.answer){
          btn.classList.add('correct');
          quizState.score++;
        } else {
          btn.classList.add('incorrect');
          optionButtons[qData.answer].classList.add('correct');
        }

        var factSlot = quizCard.querySelector('.quiz-fact-slot');
        factSlot.innerHTML =
          '<p class="quiz-fact">' + qData.fact + '</p>' +
          '<button class="quiz-next" type="button">' +
            (quizState.index < questions.length - 1 ? 'Siguiente pregunta' : 'Ver resultado') +
          '</button>';

        factSlot.querySelector('.quiz-next').addEventListener('click', function(){
          if(quizState.index < questions.length - 1){
            quizState.index++;
            renderQuestion();
          } else {
            renderResult();
          }
        });
      });
    });
  }

  function renderResult(){
    var score = quizState.score;
    var total = questions.length;
    var message;
    if(score === total){
      message = "Portador de la Trifuerza completa. No se te escapa ni un detalle del reino.";
    } else if(score >= total - 1){
      message = "Un héroe con muy buena memoria. Hyrule confiaría en ti sin dudarlo.";
    } else if(score >= Math.ceil(total/2)){
      message = "Conoces bien el camino, aunque algún cofre se te resistió.";
    } else {
      message = "Buen comienzo de aventura: todavía quedan mazmorras por explorar.";
    }

    quizCard.innerHTML =
      '<div class="quiz-result">' +
        '<h3>' + score + ' de ' + total + ' correctas</h3>' +
        '<p>' + message + '</p>' +
        '<button class="quiz-next" type="button" id="quizRestart">Intentar de nuevo</button>' +
      '</div>';

    document.getElementById('quizRestart').addEventListener('click', function(){
      quizState = { index: 0, score: 0, answered: false };
      renderQuestion();
    });
  }

  renderQuestion();

})();