const mario = document.querySelector('.mario');


const pipe = document.querySelector('.pipe');
let isSherekPhase = false; // Fase especial após pegar árvore
let nextObstacleIsTree = false; // Alterna entre cano e árvore


// Cria elemento árvore (pipe_sherek)
const tree = document.createElement('img');
tree.src = './imagens/pipe_sherek.png';
tree.className = 'tree';
tree.style.position = 'absolute';
tree.style.bottom = '0';
tree.style.left = '100%';
tree.style.width = '80px';
tree.style.display = 'none';
document.querySelector('.game-board').appendChild(tree);


const jump = () => {
    mario.classList.add('jump');
    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
}




const loop = setInterval(() => {
    // Alternância de obstáculos
    if (!isSherekPhase) {
        if (nextObstacleIsTree) {
            // Esconde cano, mostra árvore
            pipe.style.display = 'none';
            tree.style.display = 'block';
            tree.style.left = pipe.style.left || '100%';
            tree.style.animation = pipe.style.animation || 'pipe-animation 1.5s infinite linear';
        } else {
            // Mostra cano, esconde árvore
            pipe.style.display = 'block';
            tree.style.display = 'none';
        }
    } else {
        // Fase Sherek: só árvore
        pipe.style.display = 'none';
        tree.style.display = 'block';
        tree.style.animation = 'pipe-animation 1.5s infinite linear';
    }


    // Posição dos obstáculos
    const pipePosition = pipe.offsetLeft;
    const treePosition = tree.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');


    // Colisão com cano
    if (!isSherekPhase && !nextObstacleIsTree && pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        pipe.style.animation = 'none';
        pipe.style.left =  `${pipePosition}px`;
        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;
        mario.src = '../imagens/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';
        clearInterval(loop);
    }


    // Colisão com árvore (fase 1: desbloqueio, fase 2: morte)
    if ((nextObstacleIsTree || isSherekPhase) && treePosition <= 120 && treePosition > 0 && marioPosition < 80) {
        if (!isSherekPhase) {
            // Exibe tela de encantamento e pausa o jogo
            clearInterval(loop);
            document.getElementById('encantamento-screen').style.display = 'flex';
            // Salva pontos, etc. (implementação posterior)
        } else {
            // Fase Sherek: colisão com árvore mata
            tree.style.animation = 'none';
            tree.style.left = `${treePosition}px`;
            mario.style.animation = 'none';
            mario.style.bottom = `${marioPosition}px`;
            mario.src = '../imagens/game-over.png';
            mario.style.width = '75px';
            mario.style.marginLeft = '50px';
            clearInterval(loop);
        }
    }


    // Alterna obstáculo após passar
    if (!isSherekPhase && (pipePosition < -80 || treePosition < -80)) {
        nextObstacleIsTree = !nextObstacleIsTree;
    }
}, 10);




// Função para seleção de personagem especial
window.escolherPersonagemEspecial = function(personagem) {
    // Troca sprite do personagem
    let gif = '';
    if (personagem === 'burro_sherek') gif = '_media/burro_sherek.gif';
    if (personagem === 'gato_de_botas') gif = '_media/gato_de_botas.gif';
    if (personagem === 'sherek') gif = '_media/sherek.gif';
    mario.src = gif;
    // Troca cenário
    document.body.style.backgroundImage = "url('imagens/cenario_sherek.png')";
    document.body.style.backgroundSize = 'cover';
    // Ativa fase Sherek
    isSherekPhase = true;
    document.getElementById('encantamento-screen').style.display = 'none';
    // Reinicia loop
    setTimeout(() => {
        setInterval(loopTick, 10);
    }, 100);
}


// Refatora loop para permitir reinício após encantamento
function loopTick() {
    // ...código do loop copiado daqui...
}


document.addEventListener('keydown', jump);




