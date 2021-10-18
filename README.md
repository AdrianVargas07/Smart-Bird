# **Smart Bird Game**

_Smart Bird_ es una variante en versión web del juego de mesa denominado _Hoot Owl Hoot_, ha sido creado con fines académicos para aprender conceptos de desarrollo de aplicaciones web. Dicha variante, forma parte de un proyecto de la Universidad de Costa Rica que puede ser consultado en el siguiente enlace: http://jeisson.ecci.ucr.ac.cr/appweb/2021a/proyecto.

![Match Screen](/design/wireframes/MatchPage.svg)

## **Adaptaciones**

El juego de mesa únicamente fue tomado como base sobre la cuál se definieron un conjunto de adaptaciones o funcionalidades nuevas por implementar para así mejorar la experiencia de usuario durante el juego. Las variantes que incluye _Smart Bird_ son listadas a continuación:

### **Trivia**

1.  El creador de la sesión puede habilitar/deshabilitar por completo esta funcionalidad para cada partida.
2.  La dinámica del juego será competitiva y colaborativa.
3.  Cada jugador posee un ávatar y solo puede manipular su ávatar.
4.  El juego contiene un mazo con cartas de distintos colores las cuales definen una serie de preguntas de selección única relacionadas a cada color específico disponible en el mazo.
5.  Cada vez que un jugador toma una carta de color (el jugador solo posee una carta por turno y esta corresponde a la que tomó en dicho turno), se le mostrará una pregunta de selección única que debe responder para así poder avanzar, en este caso, a la casilla disponible más próxima con el color de la carta tomada.
6.  Cada color está asociado a una categoría de preguntas, por lo tanto, cuando se toma una carta de color, el contenido de la pregunta estará relacionado a la categoría representada por ese color.
7.  El juego finaliza cuando el primer jugador llegue al destino en el centro del tablero. El segundo y tercer lugar lo obtendrán los jugadores que estén más próximos al destino.
8.  El host puede configurar la partida para que exista un castigo por fallo de preguntas. En caso de responder incorrectamente, el jugador deberá retroceder hasta la casilla más próxima del color mostrado en la carta y además, la ficha del Sol avanzará una posición si el modo colaborativo se encuentra activo.
9.  El creador de la sesión del juego puede deshabilitar categorías de preguntas durante el juego para evitar las preguntas relacionadas a esa categoría dentro de la partida. Los colores del tablero se mantienen en cada partida, al igual que el mazo de cartas.
10. El creador de la sesión puede configurar la complejidad de las preguntas de 2 maneras:

        i. Al azar.
        ii. Según la posición en que se encuentren los jugadores. Es decir, conforme el jugador avanza en el tablero y se acerca al destino final, la dificultad de las preguntas va incrementando. De tal manera que, al inicio las preguntas van a ser sencillas para permitir a los jugadores salir del punto de partida y conforme estén cerca a ganar, las preguntas sean más dificiles.

### **Tiempo**

1. El creador de la sesión podrá definir si agregar factor de tiempo a las preguntas, las cuales ya poseen un tiempo de respuesta asignado. En caso de omitirse la asignación de este dato, el valor será asignado en 0, es decir, las preguntas no tendrán límite de tiempo para ser respondidas.

### **Colaborativo**

1. El juego permite habilitar modo colaborativo, en el cual la ficha del Sol irá avanzando conforme cada participante vaya fallando las preguntas de su turno. Una vez que el Sol llega al amanacer, el juego termina automáticamente y se considera perdida la partida en general, es decir, no hay ningún ganador. Es importante que entre todos eviten fallar preguntas para evitar que amanezca y el juego termine, esto a pesar de que todos sean rivales dentro del juego.

# **Mapa del Sitio**

1. Link al mapa del sitio: https://github.com/AdrianVargas07/Smart-Bird/blob/master/design/design.md

# **Wireframes**

1. Link a prototipo en Figma: https://www.figma.com/proto/PMVcP6YXCfkeTaA2wV3q1J/AppWeb21a---Wireframes?node-id=6%3A3687&scaling=scale-down&page-id=0%3A1

# **Anexos**

Esta sección de anexos incluye información sobre el juego original, así como adapataciones que son atractivas y podrían tomarse en cuenta en el futuro dado que el tiempo para el curso es limitado.

### **Adaptaciones Opcionales**

Esta sección detalla posibles variaciones que pueden incluirse al juego _Smart Bird_ además de las mencionadas anteriormente.

**Opción 1**: Se cuenta, de igual forma que en las variaciones explicadas anteriormente, con las cartas de color y la dinámica de preguntas. El juego mantiene un contador global de aciertos o fallos de preguntas consecutivas, de tal manera que al completar 3 preguntas de manera correcta y consecutiva entre todos los participantes, la ficha del sol podrá retroceder un espacio. Por otro lado, si los participantes fallan 3 veces de manera consecutiva, el sol deberá avanzar una posición.

**Opción 2**: No incluir ningún mazo adicional de cartas con preguntas, las cartas de Sol ahora contendrán la pregunta. Si se acierta la pregunta, la ficha del Sol no debe avanzar, de manera contraria, avanza una posición. Se incluirían más cartas de Sol que en la versión original, esto para aumentar el chance avanzar la ficha de Sol y equilibrar el juego dado que algunas veces se va a poder omitir el avance de la ficha del Sol, lo que resultaría ventajoso.

### **¡_Hoot Owl Hoot_!**

A continuación se muestra una breve descripción del juego original que fue tomando como base.

¡Juego cooperativo en el que los participantes comparten el objetivo del juego!

**avataros del juego:**

1. Tablero del juego.
2. Ficha del Sol.
3. 6 búhos.
4. 50 cartas (14 cartas de sol, 36 cartas de color).

**Objetivo del juego:**

1. Ayudarles a todos los búhos a volver a su nido antes de que salga el sol.

**Preparación del juego:**

1. La ficha del Sol es colocada en su casilla de salida (al inicio de la línea del amanecer).
2. Se reparten tres cartas aleatoriamente (de sol o color) a cada equipo o jugador, las cuales estarán boca arriba, por lo que todos los participantes podrán ver el contenido de las cartas. El resto de las cartas (color o sol) estarán en un montón boca abajo al lado del tablero.
3. Se colocan los búhos en las casillas de salida (las primeras 6 casillas).

**¿Cómo jugar?:**

1.  Dado que todos los jugadores trabajan para conseguir el mismo objetivo, todos los jugadores pueden mover el búho que deseen en su turno.
2.  En cada turno el jugador o equipo debe:

        2.1  Jugar una carta de su mano de 3 cartas.
        2.2  Mover el búho o la pieza del Sol según corresponda.
        2.3  Robar una carta de color o Sol del montón.
        2.4  Colocar la carta que se ha jugado en un montón de descarte, las cuales no serán utilizadas de nuevo durante la partida.


3.  Si se obtiene una carta de Sol del montón, la carta debe ser jugada obligatoriamente en el siguente turno, en la que la ficha del Sol será movida una posición en la línea del amanecer.
4.  Si no se posee una carta de Sol, se puede jugar cualquiera de las 3 cartas de color que se poseen, en donde se podrá mover cualquier búho al siguiente espacio del tablero del color que indica la carta que se ha escogido. Si un búho ya está posicionado en la casilla del color escogido, se pasa por encima hasta la siguiente casilla del mismo color.
5.  Cuando no hay espacios libres que concuerden con el color de la carta seleccionada, se vuela al nido.

**Fin del juego:**

1. Si todos los búhos llegan al nido antes de que la ficha del Sol llegue a la última casilla, es decir, antes de que amanezca, ¡has ganado!, pero si la ficha del Sol llega a su última casilla antes de que todos los búhos hayan llegado al nido, has perdido.
