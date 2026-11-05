# Ejercicio 2 · Una web servida desde ficheros

## Pregunta 1. Al cargar `/` aparecen dos peticiones en la terminal. ¿Cuáles son y por qué?

Son:

```
GET /
GET /estilos.css
```

1. `GET /`: la que escribe el usuario al abrir la dirección. El servidor responde con `index.html`.
2. `GET /estilos.css`: la hace el navegador **automáticamente**. Al leer el HTML encuentra la etiqueta `<link rel="stylesheet" href="/estilos.css">` y, como necesita esa hoja de estilos para pintar la página, la pide al servidor con una petición nueva.

Cada recurso que enlaza una página (CSS, imágenes, scripts…) es una petición HTTP distinta, y por eso nuestro servidor tiene una ruta para `/estilos.css`. Además, en el navegador puede aparecer una tercera, `GET /favicon.ico`, porque el navegador pide por su cuenta el icono de la pestaña (nuestro servidor le responde con el 404).

## Pregunta 2. ¿Qué problema tendría `fs.readFile` con un vídeo de 500 MB y qué alternativa de las vistas en clase usarías?

`fs.readFile` **lee el fichero entero y lo carga en memoria** antes de llamar al callback. Con un vídeo de 500 MB eso supone:

- Reservar unos 500 MB de RAM para una sola petición. Si llegan varias a la vez, la memoria se multiplica y el servidor puede quedarse sin recursos.
- Que el cliente no recibe **ningún byte** hasta que el servidor ha terminado de leer todo el fichero, así que el vídeo tarda en empezar a verse.

La alternativa son los **streams**: `fs.createReadStream(ruta).pipe(res)`. El fichero se lee y se envía **por trozos**: la memoria usada es pequeña y constante, sin importar el tamaño del fichero, y el cliente empieza a recibir datos enseguida. Además `pipe` se encarga de pausar la lectura si el cliente recibe más despacio de lo que el servidor lee (control de la presión de vuelta o *backpressure*).
