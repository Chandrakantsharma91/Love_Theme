(function(){
  const heartsRoot = document.getElementById('hearts');
  const toggleBtn = document.getElementById('toggleHearts');
  const surpriseBtn = document.getElementById('surprise');
  const messageEl = document.getElementById('message');

  let heartsRunning = true;
  let heartInterval = null;

  function rand(min, max){ return Math.random()*(max-min)+min }

  function createHeart(){
    const el = document.createElement('div');
    el.className = 'heart';
    const bottom = document.createElement('div'); bottom.className = 'bottom';
    el.appendChild(bottom);

    const startX = rand(5,95); // percent of width
    const startY = rand(80,110); // start below the bottom sometimes
    const scale = rand(0.45,1.05);
    const drift = rand(-50,50).toFixed(2) + 'px';
    const duration = rand(4.8,9.2).toFixed(2) + 's';

    el.style.left = startX + 'vw';
    el.style.top = startY + 'vh';
    el.style.setProperty('--s', scale);
    el.style.setProperty('--drift', drift);
    el.style.setProperty('--x', '0px');
    el.style.setProperty('--y', '0px');
    el.style.animationDuration = duration;
    el.classList.add('floatUp');

    heartsRoot.appendChild(el);

    // remove after animation
    setTimeout(()=>{ el.remove(); }, (parseFloat(duration)*1000) + 400);
  }

  function startHearts(){
    if(heartInterval) return;
    heartInterval = setInterval(createHeart, 420);
    heartsRunning = true;
    toggleBtn.textContent = 'Pause Hearts';
  }
  function stopHearts(){
    clearInterval(heartInterval); heartInterval=null; heartsRunning=false; toggleBtn.textContent = 'Play Hearts';
  }

  toggleBtn.addEventListener('click', ()=>{
    heartsRunning ? stopHearts() : startHearts();
  });

  surpriseBtn.addEventListener('click', ()=>{
    // A simple typed-text animation for the message and a quick burst of hearts
    typeMessage("soory Disha baby and i love you so much");
    burstHearts(24);
  });

  function burstHearts(count){
    for(let i=0;i<count;i++){
      setTimeout(createHeart, i*40 + Math.random()*160);
    }
  }

  // Typed-text effect (keeps the exact user text)
  function typeMessage(text){
    messageEl.textContent = '';
    let i=0;
    const t = setInterval(()=>{
      messageEl.textContent += text[i++];
      if(i>=text.length) clearInterval(t);
    }, 60);
  }

  // start background hearts by default
  startHearts();

  // small accessibility: allow space key to trigger surprise
  window.addEventListener('keydown', (e)=>{
    if(e.code === 'Space'){
      e.preventDefault();
      surpriseBtn.click();
    }
  });
})();
