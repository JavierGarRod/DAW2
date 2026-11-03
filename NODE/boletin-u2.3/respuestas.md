# Boletín U2.3: El core de Node.js

**Nombre:**
**Curso:** 2º DAM

---

## 1.- La documentación y los ficheros de una carpeta

### a) Nivel de estabilidad de `querystring` y de `new Buffer()`

La documentación de Node.js define cuatro niveles de estabilidad (índice de estabilidad, *Stability index*):

| Nivel | Nombre | Significado |
|-------|--------|-------------|
| 0 | Deprecated | La función puede emitir avisos y no se garantiza la compatibilidad hacia atrás. |
| 1 | Experimental | No sigue el versionado semántico. Puede cambiar o eliminarse en cualquier versión y no se recomienda en producción. |
| 2 | Stable | Es estable y la compatibilidad con el ecosistema npm es una prioridad alta. |
| 3 | Legacy | Es poco probable que se elimine y sigue cubierta por el versionado semántico, pero ya no se mantiene activamente y existen alternativas. |

**Módulo `querystring`: Stability 3 – Legacy.**
Es un módulo que todavía funciona y no se va a retirar, pero ya no se desarrolla ni se corrigen sus fallos. La documentación indica que el código nuevo debe usar la API **`URLSearchParams`**.

**Constructor `new Buffer()`: Stability 0 – Deprecated** (obsoleto desde Node 6.0.0, código de obsolescencia DEP0005).
A partir de Node 10 es una obsolescencia en tiempo de ejecución: Node muestra un aviso cuando se usa en código que está fuera de `node_modules`. El constructor se comporta de forma distinta según el tipo de argumento (con un número puede devolver memoria sin inicializar), lo que causaba problemas de seguridad y de uso. La documentación propone crear los buffers con:

- `Buffer.from(...)`: a partir de un array, otro buffer o un string.
- `Buffer.alloc(tamaño)`: buffer de ese tamaño con la memoria inicializada a ceros.
- `Buffer.allocUnsafe(tamaño)`: buffer más rápido pero con memoria sin inicializar.

### b) Parámetros de `fs.readdir(path[, options], callback)`

- **Obligatorios:** `path` y `callback`.
- **Opcional:** `options`.

Se sabe por la notación de la firma en la documentación: lo que va **entre corchetes** (`[, options]`) es opcional y lo que no lleva corchetes es obligatorio. Por eso se puede llamar a `fs.readdir(ruta, callback)` sin `options`: Node detecta que el segundo argumento es la función. Además, la ficha de cada parámetro indica su tipo y, en los opcionales, su valor por defecto (por ejemplo, `options.withFileTypes` es `false` por defecto).

---

## 2.- Temporizador de cocina

### e) ¿Por qué el programa termina solo después de `clearInterval`? ¿Qué pasaría si no lo llamaras?

Node mantiene el proceso vivo mientras haya algo pendiente en el bucle de eventos (temporizadores activos, conexiones abiertas, etc.). Un `setInterval` es un temporizador que se vuelve a programar solo una y otra vez, así que mientras siga activo el bucle de eventos nunca queda vacío. El `setTimeout` de la mitad se ejecuta una sola vez y, cuando ya ha saltado, deja de mantener vivo el proceso.

Al llamar a `clearInterval` se elimina el último temporizador pendiente, no queda nada por hacer y Node termina por sí mismo.

Si no lo llamáramos, el programa **no terminaría nunca**: la cuenta atrás seguiría con números negativos (`Quedan -1 s`, `Quedan -2 s`…) hasta que lo paráramos a mano con `Ctrl+C`.

---

## 3.- Caracteres y bytes

### b) Tabla con los resultados de `bytes.js`

| Texto  | Caracteres | Bytes |
|--------|-----------:|------:|
| hola   | 4 | 4 |
| España | 6 | 7 |
| 5 €    | 3 | 5 |
| 😀     | 2 | 4 |

Los datos son la salida real de `node bytes.js` (los buffers en hexadecimal son `68 6f 6c 61`, `45 73 70 61 c3 b1 61`, `35 20 e2 82 ac` y `f0 9f 98 80`).

**¿Por qué no siempre coinciden caracteres y bytes?**

Porque miden cosas distintas:

- `length` cuenta las **unidades de código UTF-16** del string de JavaScript.
- `Buffer.byteLength` cuenta los **bytes** que ocupa el texto al codificarlo en **UTF-8**, que es la codificación por defecto de Node. UTF-8 usa un número de bytes variable según el carácter.

Los caracteres del alfabeto ASCII (letras sin tilde, números, espacio) ocupan 1 byte, y por eso `hola` coincide en ambos (4 y 4). En cambio:

- `ñ` ocupa 2 bytes (`c3 b1`), así que `España` tiene 6 caracteres pero 7 bytes.
- `€` ocupa 3 bytes (`e2 82 ac`), así que `5 €` tiene 3 caracteres y 5 bytes.
- `😀` ocupa 4 bytes (`f0 9f 98 80`). Además, `length` da 2 porque este carácter está fuera del rango básico de Unicode y JavaScript lo guarda como un par de unidades UTF-16 (par sustituto), aunque en pantalla se vea un único símbolo.

Coinciden solo cuando todo el texto es ASCII. Para saber el espacio real en disco o lo que se envía por la red hay que contar bytes, no caracteres.

---

## 4.- Copiar un fichero en mayúsculas

### e) ¿Por qué aquí no puedes usar directamente `lectura.pipe(escritura)`? ¿Por qué hace falta `process.exit()` al final?

**Por qué no `pipe`:** `pipe` conecta la lectura con la escritura y pasa cada trozo **tal cual lo lee**, sin posibilidad de tocarlo por el camino. Aquí hay que convertir cada trozo a mayúsculas antes de escribirlo y además contar los bytes leídos, así que necesitamos el evento `'data'` para procesar cada trozo y escribirlo nosotros con `escritura.write(...)`. (Con `pipe` solo se podría hacer metiendo un stream de tipo `Transform` en medio, y eso excede lo visto en este boletín.) Por la misma razón cerramos nosotros la escritura con `escritura.end()` cuando la lectura emite `'end'`.

**Por qué `process.exit()`:** al escuchar `process.stdin` para leer el nombre del fichero, la entrada estándar queda abierta y en modo flujo, esperando más datos del teclado. Eso mantiene vivo el bucle de eventos, así que aunque ya se haya terminado de copiar el fichero, el programa se quedaría esperando y no acabaría por sí solo. Con `process.exit()` lo terminamos explícitamente. En el caso de error usamos `process.exit(1)` para devolver un código de salida distinto de 0.

---

## 6.- Un servidor web con varias rutas

### e) ¿Por qué aparece también `GET /favicon.ico`? ¿Qué ocurre si arrancas el servidor dos veces en el mismo puerto?

**`GET /favicon.ico`:** el navegador, además de pedir la página que le has indicado, pide automáticamente `/favicon.ico` para intentar mostrar el icono de la pestaña. Nuestro servidor no tiene esa ruta, así que responde con el 404, pero la petición queda registrada en la terminal igual que cualquier otra. En las pruebas con `curl` no aparece porque `curl` no pide el icono.

**Dos servidores en el mismo puerto:** un puerto solo puede estar en uso por un proceso a la vez. El segundo servidor falla al hacer `listen` con un error parecido a:

```
Error: listen EADDRINUSE: address already in use 0.0.0.0:3000
```

Como el programa no gestiona el evento `'error'` del servidor, Node lanza la excepción y el segundo proceso termina (código de salida 1), mientras que el primero sigue funcionando sin problema. Para tener dos servidores a la vez hay que usar puertos distintos, por ejemplo `PORT=3001 node servidor.js` (en Windows PowerShell: `$env:PORT=3001; node servidor.js`), que es justo lo que permite leer el puerto de `process.env.PORT`.
