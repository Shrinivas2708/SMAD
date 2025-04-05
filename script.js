const dateElement = document.getElementsByClassName('date-time');
const dateArr = String(new Date()).split(' ');
const am_pm = new Date().toLocaleTimeString().split(' ')[1];
const time = dateArr[4].split(':').slice(0, 2).join(':');
dateElement[0].innerHTML = dateArr[0]+ " " + dateArr[1] + " " + dateArr[2]  +" " + time + " " + am_pm;
const appleLogo = document.querySelector('.apple-logo');
const loadingBar = document.querySelector('.loading-bar'); 
const loadingProgress = document.querySelector('.loading-progress');
const terminal = document.querySelector('.terminal');
const bootScreen = document.querySelector('.boot-screen');
const dock = document.getElementById('inner_dock')
const terminalIconAdd = document.getElementById('terminal_icon')
const seperator = document.getElementById('seperator_for_terminal')
const body = document.querySelector('body');
function hideCursor() {
    document.body.style.cursor = 'none';
  }
  
document.addEventListener("contextmenu", (e) => e.preventDefault());
window.onload = () => {
    const modal = document.getElementById('fullscreen-modal');
    const enterBtn = document.getElementById('enterBtn');
    const skipBtn = document.getElementById('skipBtn');
  
    enterBtn.addEventListener('click', () => {
        requestFullscreen().then(() => {
          modal.style.display = 'none';
          hideCursor();
          startBootAnimation();
        }).catch(err => {
          console.error("Fullscreen error:", err);
          modal.style.display = 'none';
          hideCursor();
          startBootAnimation();
        });
      });
      
      skipBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        hideCursor();
        startBootAnimation();
      });
      
  };
  
  function requestFullscreen() {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      return elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      return elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      return elem.msRequestFullscreen();
    }
  }
const lines = [
  `Last login: ${dateArr[0]} ${dateArr[1]} ${dateArr[2]} ${dateArr[4]} on console`,

  'MITUniversity@MacBook-Pro ~ % cd IT',
  '',
  'MITUniversity@MacBook-Pro ~/IT% cd SMAD',
  '',
  'MITUniversity@MacBook-Pro ~/IT/SMAD % ./IntroToSMAD.sh',
  ''
];


function startBootAnimation(){
    gsap.to(appleLogo, {
  delay: 0.5,
  duration: 1,
  opacity: 1,
  ease: "power2.inOut",
  onComplete: () => {
    gsap.to(loadingBar, {
      duration: 0.5,
      opacity: 1,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.to(loadingProgress, {
          duration: 4, 
          width: "100%",
          ease: "power2.inOut",
          onComplete: () => {
            gsap.to([appleLogo, loadingBar,bootScreen], {
              delay: 1,
              duration: 1,
              opacity: 0,
              backgroundColor: "transperent",
              ease: "power2.inOut",
              onComplete: () => {
               moveCursorAndClick();
                

              }
            });
          }
        });
      }
    });
  }
});}

const typedText = document.getElementById("typed-text");

const commands = ['cd ./IT', 'cd ./SMAD', './IntroToSMAD.sh'];

let commandIndex = 0;
let charIndex = 0;

function initTerminal() {
    const lastLogin = `Last login: ${dateArr[0]} ${dateArr[1]} ${dateArr[2]} ${dateArr[4]} on console\n\n`;
  
    let i = 0;
    function typeLoginLine() {
      if (i < lastLogin.length) {
        typedText.textContent += lastLogin[i++];
        setTimeout(typeLoginLine, 70);
      } else {
        setTimeout(() => {
          typeCommand(); 
        }, 600); 
      }
    }
  
    typedText.textContent = ''; 
    typeLoginLine();
  }
  

function typeCommand() {
  if (commandIndex >= commands.length) return;

  const currentCommand = commands[commandIndex];
  const prompt = `MITUniversity@MacBook-Pro ${getPath(commandIndex)} % `;

  if (charIndex === 0) {
    typedText.textContent += prompt; 
  }

  if (charIndex < currentCommand.length) {
    typedText.textContent += currentCommand[charIndex++];
    setTimeout(typeCommand, 150);
  } else {
    typedText.textContent += '\n\n';
    charIndex = 0;
    commandIndex++;
    setTimeout(typeCommand, 600);
  }
}

function getPath(index) {
  if (index === 0) return '~';
  if (index === 1) return '~/IT';
  if (index === 2) return '~/IT/SMAD';
  return '~';
}

const fakeCursor = document.getElementById("fake-cursor");
const terminalIcon = document.querySelector('.apps');
function moveCursorAndClick() {
  const rect = terminalIcon.getBoundingClientRect();
  const targetX = rect.left + rect.width / 2;
  const targetY = rect.top + rect.height / 2;

  gsap.set(fakeCursor, { x: 0, y: 0, opacity: 1 });

  gsap.to(fakeCursor, {

    x: targetX,
    y: targetY,
    duration: 1,
    delay: 1, 
    ease: "power2.out",
    onComplete: () => {
      gsap.to(fakeCursor, {
        scale: 0.8,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power1.inOut",
        onComplete: () =>{
            gsap.set(fakeCursor,{opacity:0, delay:1})
        }
      });
      gsap.fromTo(terminalIcon, { scale: 1 }, {
    
        scale: 0.9,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        delay: 0.5, 
        ease: "power1.inOut",
        onComplete: () => {
          // Show Terminal window
          addTerminalIcon();
          gsap.to(terminal, {
            duration: 1.5,
            opacity: 1,
            scale: 1,
            delay: 0.5,
            ease: "power2.out",
            onComplete: initTerminal
          });
        }
      });
    }
  });
}
const lenis = new Lenis();
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);




function addTerminalIcon(){
    terminalIconAdd.style.display = 'block';
    seperator.style.display = 'block';
}