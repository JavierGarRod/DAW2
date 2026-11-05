# Ejercicio 1 · Rutas y códigos de estado

## Pregunta 1. ¿Quién hace la petición `GET /favicon.ico` y qué le responde tu servidor?

La hace **el navegador**, no la página ni el usuario. Cada vez que abre un sitio, el navegador pide por su cuenta `/favicon.ico` para intentar mostrar el icono de la pestaña. Por eso aparece en la terminal aunque nosotros no hayamos escrito ningún enlace a ese fichero. No sale siempre porque el navegador guarda el resultado de esa petición durante un tiempo y no la repite en cada recarga.

Nuestro servidor no tiene esa ruta en el objeto `rutas`, así que le responde como a cualquier ruta desconocida: **código 404** con la página HTML de «Error 404: la ruta no existe». El navegador simplemente no muestra icono y no pasa nada más.

## Pregunta 2. Si escribes la hora directamente como valor dentro del objeto de rutas, siempre sale la misma. ¿Por qué?

Porque el objeto `rutas` se construye **una sola vez, cuando arranca el servidor**. Si escribimos algo como `'/hora': pagina('Hora', new Date().toLocaleTimeString('es-ES'))`, la expresión `new Date()` se ejecuta en ese momento y lo que se guarda en el objeto es un texto ya calculado: la hora del arranque. Después, cada petición devuelve ese mismo texto sin volver a calcular nada.

La solución es guardar **una función** en lugar del texto (`'/hora': () => pagina(...)`) y llamarla dentro del manejador de la petición (`generarPagina()`). Así el código de la función, incluido `new Date()`, se ejecuta de nuevo en cada petición y la hora cambia en cada recarga. Es lo que hace `servidor.js`.
