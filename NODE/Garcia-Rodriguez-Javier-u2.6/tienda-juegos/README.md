# tienda-juegos

Panel web de GameZone, la tienda de videojuegos del instituto, hecho con Node.js, Express, EJS y `express.Router` (Práctica U2.6).

## Cómo ejecutarla

```bash
npm install
npm run dev     # o: npm start
```

Después abre http://localhost:3000

## Rutas

URL final = prefijo de `app.use` + ruta del router.

| URL final | Prefijo en app.js | Ruta en el router | Fichero |
|-----------|-------------------|-------------------|---------|
| `/` | `/` | `/` | `routes/web.js` |
| `/contacto` | `/` | `/contacto` | `routes/web.js` |
| `/juegos` | `/juegos` | `/` | `routes/juegos.js` |
| `/juegos/baratos` | `/juegos` | `/baratos` | `routes/juegos.js` |
| `/plataformas` | `/plataformas` | `/` | `routes/plataformas.js` |
| cualquier otra | — | — | 404 al final de `app.js` |

## Estructura

```
tienda-juegos/
├── app.js
├── package.json
├── public/css/estilos.css
├── routes/
│   ├── web.js
│   ├── juegos.js
│   └── plataformas.js
└── views/
    ├── index.ejs
    ├── contacto.ejs
    ├── juegos.ejs
    ├── plataformas.ejs
    ├── 404.ejs
    └── partials/
        ├── cabecera.ejs
        └── pie.ejs
```
