# Ejercicio 3 · Libro de visitas con GET y POST

## Pregunta 1. Para el servidor, vuelve a lanzarlo y visita `/firmas`. ¿Qué ha pasado con las firmas y por qué?

Han desaparecido: `/firmas` devuelve una lista vacía, `[]`.

Las firmas están guardadas en el array `firmas`, que es una variable del programa y vive **en la memoria RAM del proceso de Node**. Al parar el servidor, el proceso termina y su memoria se libera, y al volver a lanzarlo el programa empieza desde cero con un array vacío. Lo mismo ocurre con `node --watch`: cada vez que se guarda el fichero, el servidor se reinicia y se pierden las firmas.

Para que sobrevivan al reinicio habría que guardarlas fuera de la memoria, por ejemplo escribiéndolas en un fichero JSON con `fs` o usando una base de datos.

## Pregunta 2. ¿Por qué `let cuerpo = ''` tiene que declararse dentro de la función que atiende cada petición y no al principio del fichero?

Porque la función que atiende las peticiones se ejecuta **una vez por cada petición**, y cada ejecución crea su propia variable `cuerpo`. Así cada petición va acumulando solo sus propios datos.

Si se declarara al principio del fichero habría **una única variable compartida por todas las peticiones**:

- Una segunda firma empezaría con el texto de la primera ya dentro (porque nadie lo ha vaciado), y se mezclarían los datos de las dos.
- Si dos usuarios enviaran el formulario casi a la vez, sus trozos de datos se irían concatenando en la misma variable y se acabarían mezclando los datos de personas distintas.

## Pregunta 3. Si el formulario tuviera `required` en todos sus campos, ¿haría falta validar igualmente en el servidor? Razona la respuesta.

**Sí, hace falta.** La validación del navegador (`required`) solo sirve para ayudar al usuario; no es una garantía de seguridad, porque se ejecuta en el equipo del cliente, que el servidor no controla:

- Cualquiera puede quitar el atributo desde las herramientas de desarrollador (F12) y enviar el formulario vacío.
- No hace falta ni usar el navegador: se pueden mandar peticiones POST directamente con `curl`, Postman o un script, que se saltan el formulario por completo.
- Además, `required` solo comprueba que el campo no esté vacío: un nombre formado solo por espacios lo da por bueno, y tampoco limita la longitud del mensaje. Esas reglas (`.trim()` y 200 caracteres) solo las puede garantizar el servidor.

Por eso la regla es no fiarse nunca de los datos que llegan del cliente: la validación del navegador mejora la experiencia y la del servidor protege de verdad.

## Pregunta 4. Firma con el nombre `<h1 style="color:red">Hola</h1>`. ¿Qué aparece en la página de agradecimiento? ¿Por qué es un problema de seguridad?

**Sin escapar el texto**, el nombre se incrusta tal cual dentro del HTML de la respuesta, y el navegador lo interpreta como código en lugar de como texto. En la página aparecería «Gracias por firmar, » seguido de un título grande en color rojo que pone «Hola».

Es un problema de seguridad porque permite una **inyección de HTML / XSS (*cross-site scripting*)**: si el usuario puede colar etiquetas, también puede colar `<script>` u otros atributos con código JavaScript (por ejemplo `<img src=x onerror="...">`). Ese código se ejecutaría en el navegador de quien vea la página, dentro del sitio de confianza, y podría robar sesiones o cookies, redirigir a una web falsa o modificar lo que ve la víctima. Es especialmente grave si el texto se guarda y se muestra a otros usuarios, o si se engaña a alguien para que envíe un formulario con ese contenido.

**Con la ampliación** (`escaparHTML`), el servidor sustituye `&`, `<` y `>` por `&amp;`, `&lt;` y `&gt;` antes de escribir el nombre en el HTML. Así el navegador ya no lo interpreta como etiquetas y en la página se ve el texto literal `<h1 style="color:red">Hola</h1>`: queda como simple texto y no hace nada. El primer carácter que hay que cambiar es `&`; si se dejara para el final, se volverían a transformar los `&lt;` y `&gt;` ya creados.
