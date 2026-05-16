# 日本語 Organizer 🦊🌸

App de organización personal que enseña japonés mientras la usas.

## 🚀 Cómo publicarla (gratis, sin tarjeta) — 10 minutos

### Opción más fácil: Vercel (recomendado)

1. **Crea cuenta en GitHub**: https://github.com/signup (si no tienes)

2. **Crea cuenta en Vercel**: https://vercel.com/signup
   - Elige "Continue with GitHub" (es lo más fácil)

3. **Sube el proyecto a GitHub**:
   - En GitHub, clic en el "+" arriba a la derecha → "New repository"
   - Nombre: `nihongo-organizer` (o el que quieras)
   - Marca como "Public"
   - Clic en "Create repository"
   - En la página que aparece, busca la sección **"uploading an existing file"** y haz clic
   - Arrastra TODOS los archivos de esta carpeta (excepto `node_modules` si la tienes)
   - Clic en "Commit changes"

4. **Conecta Vercel con GitHub**:
   - Ve a https://vercel.com/new
   - Busca tu repositorio `nihongo-organizer` y clic en "Import"
   - **NO toques nada**, Vercel detecta todo solo
   - Clic en "Deploy"
   - Espera ~1 minuto...
   - **¡LISTO!** Te dará un link tipo: `nihongo-organizer.vercel.app`

5. **Comparte el link** por WhatsApp a tus amigos. Lo abren desde el celular y funciona.

---

## 🔊 Sobre el audio japonés

- **Funciona en**: Chrome, Safari, Edge (la mayoría de celulares)
- **Cómo asegurar que se escuche**: la primera vez que tus amigos toquen un botón 🔊, el navegador activará el audio
- Si alguien no escucha, debe verificar:
  - Volumen del teléfono encendido
  - Permitir audio del sitio (algunos navegadores piden permiso)
  - Probar en Chrome si está en Firefox

---

## 💻 Probar la app localmente antes de publicar

```bash
npm install
npm run dev
```

Abre http://localhost:5173

---

## 📁 Estructura del proyecto

```
nihongo-app/
├── src/
│   ├── App.jsx          ← El código principal
│   ├── main.jsx         ← Punto de entrada
│   └── index.css        ← Estilos base
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

---

## 🎨 Personalización

- **Cambiar colores**: edita los valores `#ff8fa3`, `#ffb088` en `App.jsx`
- **Agregar palabras**: añade objetos al array `VOCAB`
- **Agregar frases de turismo**: añade items a las categorías en `TURISMO`

---

¡Disfruta enseñando japonés a tus amigos! 一歩ずつ 🌸
