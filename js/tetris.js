
document.addEventListener('DOMContentLoaded', () => {
    // Seleccianamos todo el contenedor de divs
    const grid = document.querySelector('.grid')
    //  Juntamos los 200 divs en un array
    let squares = Array.from(document.querySelectorAll('.grid div'))
    // Seleccionamos el span de los puntos
    const scoreDisplay = document.querySelector('#score')
    // Seleccionamos el btn
    const startBtn = document.querySelector('#start-button')
    const width = 10
    let nextRandom = 0
    let timerId //Es us controlador
    let score = 0
    const colors = [
      'orange',
      'red',
      'purple',
      'green',
      'blue'
    ]
    const bg = [
      '#e27b377c',
      '#bd173b74',
      '#c039b574',
      '#1cb8366e',
      '#2a324b4a'


    ]
  
    // Creamos los tetraminos(bloques del tetris)
    const lTetromino = [
      [1, width+1, width*2+1, 2],
      [width, width+1, width+2, width*2+2],
      [1, width+1, width*2+1, width*2],
      [width, width*2, width*2+1, width*2+2]
    ]
    const zTetromino = [
      [0,width,width+1,width*2+1],
      [width+1, width+2,width*2,width*2+1],
      [0,width,width+1,width*2+1],
      [width+1, width+2,width*2,width*2+1]
    ]
    const tTetromino = [
      [1,width,width+1,width+2],
      [1,width+1,width+2,width*2+1],
      [width,width+1,width+2,width*2+1],
      [1,width,width+1,width*2+1]
    ]
    const oTetromino = [
      [0,1,width,width+1],
      [0,1,width,width+1],
      [0,1,width,width+1],
      [0,1,width,width+1]
    ]
    const iTetromino = [
      [1,width+1,width*2+1,width*3+1],
      [width,width+1,width+2,width+3],
      [1,width+1,width*2+1,width*3+1],
      [width,width+1,width+2,width+3]
    ]

    // Juntamos todos los bloques en un array
    const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

    // posucuon de inicio en la que se va a pintar 
    let currentPosition = 4
    let currentRotation = 0
  
    // Seleccionar alguno de los blques aleatoriamente
    let random = Math.floor(Math.random()*theTetrominoes.length)
    console.log(random);
    // siempre se ingresa a la posicion 0 de cada tetramino
    let current = theTetrominoes[random][currentRotation]
    console.log(current);

    let body = document.body

    function bgColor (){
      body.style.backgroundColor = 'var(--color-1)'
      body.style.backgroundColor = bg[random]
    }



  
    // Dibujar el bloque anadiendo la clase tetramino
    function draw() {
        // accedemos a cada bloque
      current.forEach(index => {
          // Le agregamos la clase
        // squares[currentPosition + index].classList.add('tetromino')
        squares[currentPosition + index].style.backgroundColor = colors[random]
        bgColor()
      })
    }
  
    // Quitar el dibujo quitando la clase
    function undraw() {
      current.forEach(index => {
        // squares[currentPosition + index].classList.remove('tetromino')
        squares[currentPosition + index].style.backgroundColor = ''
      })
    }
  
    // Asignamos las funciones a los botones
    function control(e) {
      if(e.keyCode === 37) {
        moveLeft()
      } else if (e.keyCode === 38) {
        rotate()
      } else if (e.keyCode === 39) {
        moveRight()
      } else if (e.keyCode === 40) {
        moveDown()
      }
    }
    document.addEventListener('keyup', control)
  
    // Mover hacia abajo los bloques
    function moveDown() {
      undraw()
      currentPosition += width
      draw()
      freeze()
    }
  
    // Detener los bloques
    function freeze() {
        // Si alguna de las casillas de los bloques tinen la clase TAKEN
      if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
        //   entonces se la agrego
        current.forEach(index => squares[currentPosition + index].classList.add('taken'))

        //creamos un nuevo bloque para dejarlo caer
        random = nextRandom
            // Nuevo bleque aleatorio
        nextRandom = Math.floor(Math.random() * theTetrominoes.length)
            // Nueva posicion aleatoria
        current = theTetrominoes[random][currentRotation]
        currentPosition = 4
            //  Lo dibujamos
        draw()
        displayShape()
        addScore()
        gameOver()
      }
    }
  
    // Mover el bloque a a la iz si es que no hay un borde o un bloque
    function moveLeft() {
      undraw()
    //   Definimos que existe un borde si la posicion original(4) + el tetramino actual al dividirlos por el ancho (10) nos da 0, eso signofica que estamos en alguno de los bordes
      const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)
    //   Si no hay borde, le restamos 1 a la posicion original 4, haciando que se mueva a la iz
      if(!isAtLeftEdge) currentPosition -=1
      if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
        currentPosition +=1
      }
      draw()
    }
  
    //Mover el bloque a la derecha
    function moveRight() {
      undraw()
      const isAtRightEdge = current.some(index => (currentPosition + index) % width === width -1)
      if(!isAtRightEdge) currentPosition +=1
      if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
        currentPosition -=1
      }
      draw()
    }
  
    function isAtRight() {
      return current.some(index=> (currentPosition + index + 1) % width === 0)  
    }
    
    function isAtLeft() {
      return current.some(index=> (currentPosition + index) % width === 0)
    }
    
    function checkRotatedPosition(P){
      P = P || currentPosition       
      if ((P+1) % width < 4) {              
        if (isAtRight()){            
          currentPosition += 1    
          checkRotatedPosition(P) 
          }
      }
      else if (P % width > 5) {
        if (isAtLeft()){
          currentPosition -= 1
        checkRotatedPosition(P)
        }
      }
    }
    
    //Rotar el bloque
    function rotate() {
      undraw()
    //   al rotador le agregamos 1, para que pase a las otras formas dentro del array
      currentRotation ++
      if(currentRotation === current.length) { //Si la rotacion llega a 4 en algun momento, tenemos que volverla a 0 para volver a iniciar
        currentRotation = 0
      }
      // Le assignamos los nuevos valores al rotar
      current = theTetrominoes[random][currentRotation]
      checkRotatedPosition()
      draw()
    }
  
    
    
    //Mostrar el proximo bloque en la mini grilla
    const displaySquares = document.querySelectorAll('.mini-grid div')
    // Darle en tamanio a los cuadros de la mini grilla
    const displayWidth = 4
    const displayIndex = 0
  
  
    // Guardamos los bloques sin rotar su posicion
    const upNextTetrominoes = [
      [1, displayWidth+1, displayWidth*2+1, 2], //lTetromino
      [0, displayWidth, displayWidth+1, displayWidth*2+1], //zTetromino
      [1, displayWidth, displayWidth+1, displayWidth+2], //tTetromino
      [0, 1, displayWidth, displayWidth+1], //oTetromino
      [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1] //iTetromino
    ]
  
    // funcion para dibujar el proximo bloque
    function displayShape() {
      displaySquares.forEach(square => {
        // Le quitamos la clase y color para ser dibujado
        square.classList.remove('tetromino')
        square.style.backgroundColor = ''
      })
      // Creamos el nuevo bloque
      upNextTetrominoes[nextRandom].forEach( index => {
        displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom]
      })
    }
  
    // boton para iniciar el juego
    startBtn.addEventListener('click', () => {
      // Si el boton esta presionado 
      if (timerId) {
        // Se detiene el tiempo de caida de los bloques
        clearInterval(timerId)
        timerId = null
      } else {
        // Si el boton mo se presiona se reanuda el juego
        draw()
        timerId = setInterval(moveDown, 1000)
        nextRandom = Math.floor(Math.random()*theTetrominoes.length)
        displayShape()
      }
    })
  
    
    function addScore() {
      for (let i = 0; i < 199; i +=width) {
        const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]
  
        if(row.every(index => squares[index].classList.contains('taken'))) {
          score +=10
          scoreDisplay.innerHTML = score
          row.forEach(index => {
            squares[index].classList.remove('taken')
            squares[index].classList.remove('tetromino')
            squares[index].style.backgroundColor = ''
          })
          const squaresRemoved = squares.splice(i, width)
          squares = squaresRemoved.concat(squares)
          squares.forEach(cell => grid.appendChild(cell))
        }
      }
    }
  
    // fin del juego
    function gameOver() {
      if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
        scoreDisplay.innerHTML = 'end'
        clearInterval(timerId)
      }
    }
  
  })