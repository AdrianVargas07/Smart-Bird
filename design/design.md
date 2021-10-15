# **Estructura del sitio**
En esta sección se muestra de manera gráfica las pantallas de la aplicación y las interacciones entre ellas según el rol de anfitrión o invitado.

![Mapa del sitio](/design/wireframes/Sitemap.svg)

# **Diseño de interfaz**
Un aspecto importante es que el diseño de este juego para dispositivos móviles fue implementado para su uso en el modo que se conoce como _landscape_ (posición horizontal), especialmente la página donde se desarrolla la partida. Lo anterior para proveer una mejor experiencia de usuario dada la naturaleza del juego a nivel visual.

A continuación se detalla cada uno de los wireframes construidos para el diseño de la aplicación.

## Home Page
Esta es la pantalla inicial del sitio. Al igual que todas las pantallas del juego, en la parte inferior derecha se encuentra el botón de ayuda, que al presionarlo presenta un overlay con la explicación sobre el contenido y componentes de esa página en específico.

![Homepage](/design/wireframes/HomePage.svg)

El usuario puede realizar 1 de 2 acciones (adicionales a consultar ayuda):

1. **Create Session:** Al presionar este botón, se le presentará un overlay al jugador donde se le solicita la información requerida para crear una nueva sesión de juego.

Se le solicita al jugador indicar su nombre de usuario y confirmar la creación de la nueva sessión dando clic en el botón **Join**, lo que lo redireccionará a la página del lobby para el anfitrión. Al presionar el botón **Cancel**, el overlay desaparece.

![Host Registry](/design/wireframes/HostRegistryOverlay.svg)

2. **Join Session:** Al presionar este botón, se le presentará un overlay al jugador donde se le solicita información requerida para unirse a una partida de manera exitosa.

Se le solicita al jugador indicar su nombre de usuario, el id de la sesión a la que quiere unirse y por último confirmar la acción dando clic en el botón **Confirm**, lo que lo redireccionaría a la página del lobby para el invitado. Al presionar el botón **Cancel**, el overlay desaparece.
![Guest Registry](/design/wireframes/GuestRegistryOverlay.svg)


## Host Lobby Page
Esta es la pantalla que visualizará el anfitrión a la hora de crear una sesión nueva. Desde esta página es posible realizar las siguientes configuraciones para una partida:
1. Habilitar o deshabilitar la modalidad de trivia. 
2. Ingresar en un campo de texto el factor de tiempo a utilizar al contestar las preguntas.
3. Habilitar o deshabilitar la penalización al contestar mal una pregunta. Cuando la opción se encuentra deshabilitada, el botón se presenta en color rojo con etiqueta _disabled_, de lo contrario se presenta de color verde con la etiqueta _enabled_.
4. Habilitar o deshabilitar el modo colaborativo. Cuando la opción se encuentra deshabilitada, el botón se presenta en color rojo con etiqueta _disabled_, de lo contrario se presenta de color verde con la etiqueta _enabled_.
5. Determinar el grado de dificultad de las preguntas de la partida. Puede seleccionar el modo incremental, donde la dificultad de la pregunta avanza conforme se acerca el jugador al destino. O podría selecciona el modo aleatorio, donde las dificultad de las preguntas se determina al azar durante la partida.
6. Seleccionar los colores de las categorías de preguntas con las que se desea jugar. Cuando se selecciona una categoría, un símbolo de_check_ se presenta en la parte inferior de la categoría y se resalta más en color. Al deshabilitar las preguntas, el símbolo de _check_ desaparece y el color de la categoría se torna opaco.

Al lado izquierdo se muestra el ID de la sessión, los jugadores que se han unido y dos botones: **Play** para iniciar el juego y **Leave** para dejar la sessión y volver a la página principal. 

![Host Lobby](/design/wireframes/HostLobbyPage.svg)


## Guest Lobby Page
La siguiente página es lo que visualizará el jugador invitado al unirse a una sesión mientras espera que el jugador anfitrión inicie la partida.
De la misma forma que en el lobby del anfitrión, el jugador invitado podrá ver la configuración del juego, sin embargo este no podrá editarla, ya que estas configuraciones pueden ser únicamente modificadas por el anfitrión antes de iniciar la partida. 

Al lado izquierdo se muestra el id de la sesión, los demás invitados dentro de la sesión y el botón **Leave** para salirse de la sesión y regresar a la página principal del juego.

![Guest Lobby](/design/wireframes/GuestLobbyPage.svg)

## Match Page
Esta es la pantalla del juego, la única manera de entrar a esta página es perteneciendo a una sesión de juego cuya partida ya haya sido iniciada. Se muestra el tablero con casillas de colores, en la esquina inferior derecha se encuentra el mazo de cartas del juego. Debajo del tablero vemos la línea del Sol y debajo de esta, se encuentra la lista de jugadores según las posiciones que llevan en el juego. Al lado inferior izquierdo se ve el botón **Leave** que sirve para dejar la partida y regresar a la página del lobby correspondiente según sea host o invitado.

![Match Page](/design/wireframes/MatchPage.svg)

A continuación se describen generalidades que forman parte del flujo de una partida con jugadores:

1. Los jugadores comienzan desde un mismo punto en el tablero. Cada jugador va a ir apareciendo en el tablero según les vaya tocando su turno, el cual es decido al azar por el juego.
2. Cada jugador es diferenciado por un avatar distinto que le fue asignado de manera aleatoria por el juego al inicar la partida.
3. En la sección del _leaderboard_ se va indicando quien se encuentra a la cabeza del juego en todo momento y la posición del resto de los jugadores. Así mismo, se muestra información relacionada a quién posee el turno en ese momento con un indicador que lo diferencia del resto en la lista. En este mismo _leaderboard_ los jugadores podrán visualizar el nombre de usuario que escogieron y una representación del avatar que le pertenece, para así lograr establecer esa identificación.
4. Cada jugador en su turno debe realizar la acción de tomar una carta de las que se encuentran en el mazo. La carta revelará un color y mostrará un overlay con una pregunta de selección única que se asocia a la categoría representada por el color de la carta (modo trivia debe estar habilitado).

![Question Overlay](/design/wireframes/QuestionOverlay.svg)

5. El jugador no avanza aún por el tablero, primero debe contestar la pregunta de manera correcta para poder avanzar a la siguiente casilla disponible con el color que le tocó en la carta tomada. La implicación del desacierto de una pregunta va a depender de la configuración establecida por el anfitrión. Si la partida tiene habilitado el castigo por fallo de pregunta, el jugador deberá retroceder a la casilla disponible del color de la pregunta. Si el anterior modo se encuentra deshabilitado, el jugador no se mueve de donde se encontraba en caso de fallar la pregunta. 
6. Las preguntas cuentan con un temporizador para limitar el tiempo de turno de cada jugador durante la partida. Además, el tiempo para contestar la pregunta se encuentra asociado con la dificultad de la misma, es decir, entre mayor dificultad en las preguntas, mayor será el tiempo que se otorga para respuesta. Este temporizador podría ser afectado por la configuración del factor de tiempo, el cual alteraría el tiempo de respuesta que se mencionó anteriormente.
7. El jugador puede seleccionar únicamente una de las opciones que se le presentan como posibles respuestas, cuando ya se decidió por una de ellas, debe presionar el botón **Answer**. Si el jugador acierta la respuesta, un símbolo de _check_ de color verde se le mostrará al lado de su respuesta, esto para hacer notar que la respuesta es correcta. En caso de fallar la respuesta, aparecerá una equis de color rojo, lo que representaría un desacierto. Para ambos casos, el overlay donde aparece la pregunta desaparece al cabo de 5 segundos. Cabe recalcar que las opciones de cada una de las preguntas son barajadas de manera aleatoria para así evitar que los jugadores memoricen la respuesta a una pregunta.

![Correct Question](/design/wireframes/AnsweredQuestion.svg)

8. Una vez desaparece el overlay del punto anterior, el avatar del jugador se mueve automáticamente a la casilla del color de la pregunta, ya sea avanzando, retrocediendo su posición y avanzando la del Sol (colaborativo y castigo habilitado) o manteniendo su posición del tablero (castigo deshabilitado), esto va a depender de la configuración establecida por el anfitrión como se ha mencionado anteriormente.
9. El turno de un jugador termina cuando el avatar se movió al lugar que le correspondía luego de contestar la pregunta. Inmediatamente, el indicador en el _leadrboard_ ahora se posiciona sobre la información del jugador a quien corresponde el turno en ese determinado momento. El jugador repite las mismas acciones mencionadas en puntos anteriores.

![Change Turn](/design/wireframes/MovedToPosition.svg)

10. Si el nuevo jugador en su turno, acierta o falla la pregunta, y la posición a la que debe trasladarse se encuentra ocupada, el avatar indentificará la posición consecutiva a la original (ya sea avanzando o retrocediendo en el tablero) y así sucesivamente hasta encontra un lugar desocupado. Si todas las casillas hacia adelante se encuentran ocupadas, el jugador avanza al destino y gana la partida. Por el contrario, si todas hacia atrás se encuentran ocupadas, el jugador tendrá que volver a la posición de inicio. Si el jugador no acertara ninguna pregunta desde la posición inicial, este deberá mantenerse en ese lugar, hasta lograr acertar una pregunta.
11. El tablero siempre mantiene los mismos colores en cada partida, aún caundo el anfitrión ha deshabilitado alguno de los colores para evitar ciertas preguntas. En caso de caer en una casilla de alguno de los colores deshabilitados, ninguna pregunta será desplegada y el jugador podrá avanzar con la misma naturaleza que como si hubiese logrado un acierto.
12. Finalmente, el jugador que llegue de primero a la última casilla que representa la  meta, será el ganador del juego y automáticamente hará que este finalice. Una vez el jugador se posiciona el última casilla, el juego calcula la posición de los jugadores restantes y presenta en un overlay el podium de los 3 primeros lugares. Al cabo de unos cuantos segundos, el overlay del podium se desvanece y se redirecciona a cada uno de los jugadores a su respectivo lobby.

## Results Overlay
Una vez finalizado la partida, ya sea porque algún jugador ganó o porque todos los jugadores perdieron (en caso de que el colaborativo esté activado), se despliega automáticamente un overlay con el podio donde se muestran los primeros 3 lugares según la próximidad a la meta. 

Esta pantalla cuenta con dos botones:
1. **Continue:** Permite al jugador continuar en la sesión actual del juego, de tal forma que es regresado al lobby de invitado o anfitrión según corresponda.
2. **Quit session:** Permite que el jugador abandone la sesión del juego en la que se encuentra actualmente y así regresar a la página inicial del sitio (Home Page).

![Results Page](/design/wireframes/ResultsPage.svg)

Si sucediera que el Sol sale antes que todos los jugadores lleguen a la meta, la partida se pierde y todos los jugadores verán la siguiente pantalla. Al igual que la pantalla de podio anterior, esta cuenta con dos botones:
1. **Continue:** Permite al jugador continuar en la sesión actual del juego, de tal forma que es regresado al lobby de invitado o anfitrión según corresponda.
2. **Quit session:** Permite que el jugador abandone la sesión del juego en la que se encuentra actualmente y así regresar a la página inicial del sitio (Home Page).

![Gameover](/design/wireframes/GameOver.svg)

## Help Overlay
Este componente representa una visualización estándar para mostrar información de ayuda a lo largo de todas las páginas. Al dar clic en el botón inferior derecho con signo de pregunta, se despliega un overlay que brinda ayuda e información sobre la página en la que se encuentra el jugador. Se cierra la ventana con la X que aparece en la esquina superior derecha. En la pantalla MatchScreen el botón de ayuda se encuentra en la esquina superior derecha.

![Help Screen](/design/wireframes/HelpOverlay.svg)

# **Diseño de comunicación entre el cliente - servidor**

## Autómata

A continuación el autómata de la aplicación:

![StateMachine](/design/StateMachine.svg)

## Pase de mensajes JSON
A continuación se listan los escenarios y mensajes que interactuan dentro de dichos escenarios en las distintas pantallas del juego.

### Home Page
--- 
Caso 1: El cliente quiere crear una sesión.

El cliente envía un mensaje al servidor con el nombre de usuario y rol.
```json
    {
        "type": "newSession",
        "username": "gamer99",
        "role": "host"
    }
```

El servidor debe retornar el ID de la sesión creada.

```json
    {
        "type": "newSessionResponse",
        "sessionID": "8kjix133"
    }
```

Caso 2: El cliente quiere unirse a una sesión existente.

El cliente envía un mensaje al servidor con el nombre de usuario, sessionID, role.

```json
    {
        "type": "joinSession",
        "username": "birdman13",
        "role": "guest",
        "sessioID": "8kjix133"
    }
```
### Lobby
---
Caso 1: El cliente se ha unido a una sesión y representa un nuevo jugador.

El servidor envia un mensaje al cliente con la información de los jugadores en el lobby.

```json
{
	"type": "lobbyPlayers",
	"player_list": [
		{
			"username": "gamer99",
			"role": "host"
		}, 
		{
			"username": "birdman13",
			"role": "guest"
		}
	]
}
```

Caso 2: El cliente quiere iniciar la partida.

El cliente envía un mensaje al servidor con las configuraciones de la partida.

```json
    {
        "type": "matchSettingsSelected",
        "settings": {
            
            "trivia": "Enabled",
            "timeFactor": "1.0",
            "difficulty": "Random",
            "punishment": "Disabled",
            "collaborative": "Enabled",
            "topics": {
                "math": true,
                "science": true,
                "history": true, 
                "language": true, 
                "computerScience": false
            }	
        }
    }
```

Caso 3: El cliente quiere abandonar la sesión.

3.1 El Host envía un mensaje al servidor con la información para finalizar la sesión dado que va a abandonar.

```json
    {
        "type": "leaveSession",
        "username": "gamer99",
        "role": "host",
        "sessionID": "8kjix133"
    }
```
El servidor envía un mensaje a los invitados indicando que el host se ha retirado y por ende la sesión ha terminado.

```json
    {
	"type": "leaveSessionResponse",
	"username": "gamer99",
}
```

3.2 El invitado envía un mensaje al servidor con la información para abandonar la sesión

```json
    {
        "type": "leaveSession",
        "username": "birdman13",
        "role": "guest"
        "sessionID": "8kjix133"
    }
```

El servidor envía un mensaje al resto de jugadores indicando quien abandonó la partida.

```json
    {
        "type": "leaveSessionResponse",
        "username": "birdman13",
    }
```

### Match Page 
---

Caso 1: Una partida ha sido iniciada.

El servidor envía un mensaje a los jugadores con el set-up del juego.

```json
    {
        "type": "gameSetUp",
        "settings": {
            "trivia": "Enabled",
            "timeFactor": "1.0",
            "difficulty": "Random",
            "punishment": "Disabled",
            "collaborative": "Enabled",
            "topics": {
                "math": true,
                "science": true,
                "history": true, 
                "language": true, 
                "computerScience": false
            }
        },
        "cards": [
            {
                "questionID": 1,
                "question": "Which is the largest number?",
                "time": "10",
                "color": "red",
                "options": [
                    {
                        "optionID": 1,
                        "option": "1",
                        "correctAnswer": false,
                    }
                    {
                        "optionID": 2,
                        "option": "6",
                        "correctAnswer": false,
                    }
                    {
                        "optionID": 3,
                        "option": "8",
                        "correctAnswer": true,
                    }
                    {
                        "optionID": 4,
                        "option": "2",
                        "correctAnswer": false,
                    }
                ]
            }
        ],
        "sun": {
            "maxPos": "14",
            "currentPos": "1"
        },
        "leaderBoard": {
        
            "players": [
            
                {
                    "username": "gamer99",
                    "role": "host",
                    "posInLeaderBoard": "1",
                    "activePlayer": true,
                }
                {
                    "username": "birdman13",
                    "role": "guest",
                    "posInLeaderBoard": "2",
                    "activePlayer": false,
                }
            ]
            
        },	
    }
```

Caso 2: Cambio de estado en el juego por turno.

Los jugadores envían mensajes al servidor para cambiar el estado del juego.

```json
    {
        "type": "answeredQuestion",
        "questionID": 1,
        "optionSelected": 2,
        "username": "gamer99",
        "currentPosition": 0,
        "cardColor": "red",
        "activePlayer": true,
	
    } 
```

El servidor envía mensajes al cliente con información para actualizar la partida después de una respuesta de alguno de los jugadores.
```json
    {
        "type": "gameUpdate",
        "username": "gamer99",
        "nextPosition": "5",
        "correctAnswer": true,
        "winner": false,
        "leaderBoard": {
        
            "players": [
            
                {
                    "username": "gamer99",
                    "role": "host",
                    "posInLeaderBoard": "1",
                    "activePlayer": false,
                }
                {
                    "username": "birdman13",
                    "role": "guest",
                    "posInLeaderBoard": "2",
                    "activePlayer": true,
                }
            ]
            
        },	

    }`
```

Caso 3: Algún jugador desea abandonar la partida.
Los jugadores envían mensajes al servidor con la información de la sesión para regresar al lobby.
```json
    {
        "type": "leaveMatch",
        "username": "gamer99",
        "sessionID": "8kjix133"
    }
```
El servidor envía mensajes al cliente para notificar que un jugador abandonó la partida.

```json
    {
        "type": "leaveMatchResponse",
        "username": "gamer99",
    }   

```

## Algoritmos de las transiciones de la máquina de estados

### Click Credits
---
Se ejecuta cuando el usuario hace click en el botón "Credits" en el header de cualquiera de las páginas.

```
1. El usuario se redirecciona a la página de créditos donde se  encuentran  enlaces a recursos utilizados dentro del proyecto.
```

### Click Help
---
Se ejecuta cuando el usuario hace click en el botón con icono "?" en el footer de cualquiera de las páginas.
```
1. Desplegar un modal al usuario con la ayuda específica de la página en la que se encuentra.
```

### Click Create Session
---
Se ejecuta cuando el usuario hace click en el botón "Create Session" en la página principal.
```
1. Desplegar un modal al usuario, el cual solicita la información de nombre de usuario para crear una sesión.
```

### Click Confirm Create Session
---
Se ejecuta cuando el usuario hace click en el botón "Create" en el modal de creación de sesión.
```
1. El cliente envía al servidor un mensaje de tipo "newSession" que contiene su nombre de usuario.
2. Presentar mensaje de retroalimentación "Creando Partida..."
3 En caso de que el servidor construya la sesión de manera:
	3.1 Exitosa: El servidor envía un mensaje de tipo newSessionResponse al cliente y lo redirecciona al lobby del host.
	3.2 No exitosa: El servidor no contestó en un período de tiempo definido y redirecciona al cliente a la página principal.
```

### Click Join Session
---
Se ejecuta cuando el usuario hace click en el botón "Join Session" en la página principal.
```
1. Desplegar un modal al usuario, el cual solicita la información de nombre de usuario y número de sesión para unirse a dicha sesión.
```

### Click Confirm Join Session
---
Se ejecuta cuando el usuario hace click en el botón "Join" en el modal para unirse a una sesión existente.
```
1. El cliente envía al servidor un mensaje de tipo "joinSession" que contiene su nombre de usuario y número de sesión.
2. Presentar mensaje de retroalimentación "Uniendose a la sesión..."
3 En caso de que el servidor logre indentificar la sesión de manera:
	3.1 Exitosa: El servidor envía un mensaje de tipo joinSessionResponse al cliente y lo redirecciona al lobby del invitado.
	3.2 No exitosa: El servidor no contestó en un período de tiempo definido y redirecciona al cliente a la página principal.
```

### Click Leave Session
---
Se ejecuta cuando el usuario hace click en el botón "Leave" desde la página de alguno de los lobbys (Anfitrión o Invitado) o en el modal de resultados de una partida.
```
1. El cliente envía al servidor un mensaje de tipo "leaveSession" que contiene su nombre de usuario, número de sesión y rol dentro de la sesión.
2. Presentar mensaje de retroalimentación "Uniendose a la sesión..."
3. El servidor envía un broadcast de tipo "leaveSessionResponse" a los otros jugadores con el nombre de usuario del jugador que abandonó la sesión.
4. Se redirecciona al jugador que abandonó a la página principal
```

### Click Start Match
---
Se ejecuta cuando el usuario hace click en el botón "Play" desde el lobby del anfitrión.
```
1. El cliente envía un mensaje de tipo "matchSettingsSelected" al servidor con las configuraciones seleccionadas para esa partida.
2. El servidor hace un broadcast a los clientes con un mensaje de tipo "gameSetUp", el cual contiene todos los elementos que deben ser cargados para una partida y es redireccionado a la página de juego.
```

### Click Take Card
---
Se ejecuta cuando el usuario hace click en la carta con etiqueta "Take Card" desde la página de juego.
```
1. La carta cambia de color y se despliega un modal con la pregunta que fue seleccionada de manera aleatoria.
```

### Click Answer Question
---
Se ejecuta cuando el usuario hace click en el botón "Answer" desde el modal de la pregunta.
```
1. El cliente envía un mensaje de tipo "answeredQuestion" al servidor con la información de la pregunta y la respuesta seleccionada.
2. El servidor envía un mensaje de tipo "gameUpdate" al cliente para reflejar el cambio de estado despues del turno del jugador.
3. El jugador avanza o retrocede en el tablero según su respuesta
4. Se otorga el turno al siguiente jugador.
```

### Click Leave Match
---
Se ejecuta cuando el usuario hace click en el botón "Leave" desde la página de juego.
```
1. El cliente envía un mensaje de tipo "leaveMacth" al servidor con la información de su nombre de usuario y sesión a la que pertenece.
2. El servidor envía un broadcast de tipo "leaveMacthResponse" a los clientes para notificar quién abandonó la partida.
3. La partida finaliza sin ganador y todos los jugadores son redireccionados a los lobbys correspondientes.
```

### Click Return to Lobby
---
Se ejecuta cuando el usuario hace click en el botón "Return lobby" desde el modal de resultados de la partida.
```
1. El cliente es redireccionado a su correspondiente lobby.
```