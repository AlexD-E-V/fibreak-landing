# Fibreak — Landing page

Prueba técnica de desarrollo web. Landing page de captación para el lanzamiento
de un servicio de internet residencial por fibra óptica.

**Ver en vivo:** `<!-- PENDIENTE: pegar aquí la URL del deploy -->`

**Autor:** Alex Enriquez Vera
**Stack:** HTML, CSS y JavaScript. Sin frameworks, sin build, sin dependencias.

---

## Índice

1. [Cómo ejecutar el proyecto](#1-cómo-ejecutar-el-proyecto)
2. [Descripción general de la solución](#2-descripción-general-de-la-solución)
3. [Público objetivo](#3-público-objetivo)
4. [Objetivo de conversión](#4-objetivo-de-conversión)
5. [Estructura de la landing](#5-estructura-de-la-landing)
6. [Decisiones visuales](#6-decisiones-visuales) — concepto · fractura · colores · tipografías · imágenes · distribución · confianza · CTA
7. [Estrategia responsive](#7-estrategia-responsive)
8. [Validación del formulario](#8-validación-del-formulario)
9. [Accesibilidad](#9-accesibilidad)
10. [Recursos externos](#10-recursos-externos)
11. [Limitaciones conocidas](#11-limitaciones-conocidas)
12. [Mejoras con más tiempo](#12-mejoras-con-más-tiempo)
13. [La línea que decidí no escribir](#13-la-línea-que-decidí-no-escribir)
14. [Estructura de archivos](#14-estructura-de-archivos)

---

## 1. Cómo ejecutar el proyecto

No hay que instalar nada. No hay `npm install`, ni build, ni dependencias.

**Opción recomendada — servidor local.** Desde la carpeta del proyecto:

```bash
python -m http.server 5175
```

Y abrir <http://localhost:5175>. Cualquier servidor estático sirve igual
(`npx serve`, la extensión Live Server de VS Code, etc.).

**Opción rápida — abrir el archivo.** Doble clic en `index.html`. Todo el
proyecto usa rutas relativas y el JavaScript es un script clásico (no un módulo
ES) precisamente para que esto funcione. La única salvedad es que algunos
navegadores restringen la carga de fuentes locales bajo `file://`; si ocurre, la
tipografía cae a la del sistema y el resto de la página se ve igual. Con el
servidor local no pasa.

El proyecto **no necesita conexión a internet**: las tipografías están
auto-hospedadas y no hay ninguna llamada a un CDN.

---

## 2. Descripción general de la solución

### El problema del brief

Todos los proveedores de internet compiten en el mismo terreno: megas. Una
landing más gritando una cifra de velocidad es una landing indistinguible.

### La lectura estratégica

El dolor real de este público no es que el internet sea **lento**. Es que se
**cae en el peor momento posible**: en mitad de una reunión, subiendo el archivo
que había que entregar hoy, cuando afuera hay tormenta.

Así que Fibreak no compite en velocidad. Compite en **estabilidad**, y la
velocidad pasa de ser la promesa a ser la prueba.

> **La vida es impredecible. Tu conexión no tiene por qué serlo.**

La marca tampoco promete resolverle la vida a nadie. Promete algo acotado y
cumplible: que conectarse para resolverla nunca será el problema añadido. Eso es
lo que dice el H1:

> **Tu día se puede complicar. Tu internet, no.**

### La marca

**Fibreak** = *fibra* óptica + *break* (romper lo común). El logotipo corta la
palabra entre `FIB` y `REAK` con un separador ámbar: fija la pronunciación
(*fi-bréik*) y representa literalmente el *break*.

El nombre promete audacia y el posicionamiento promete calma. No es una
contradicción, es la estructura de la marca:

> **Fibreak es atrevida hacia afuera y serena hacia adentro.**

Lo audaz es lo que la empresa **hace**: fibra simétrica real, una garantía con
dinero de por medio. Lo tranquilo es **cómo habla**. Toda decisión de copy o de
diseño de este proyecto se validó contra esa frase.

---

## 3. Público objetivo

Personas de 25 a 40 años que viven **solas o en pareja**: jóvenes
profesionales, trabajadores remotos y hogares pequeños.

**Una corrección deliberada de la lectura fácil del brief.** El brief menciona
"familias pequeñas", y la salida cómoda habría sido poner una familia numerosa
en el hero. Se descartó: el escenario multidispositivo de esta marca **no** son
cinco personas en cinco cuartos, es **una sola persona con cinco pantallas** —
laptop de trabajo, monitor con la serie de fondo, celular subiendo archivos,
tablet abierta y el router aguantando todo sin quejarse.

La intimidad persuade más que la escala, y encaja mejor con el resto del propio
brief. Todo el copy, la fotografía y los textos de plan respetan esa escala.

---

## 4. Objetivo de conversión

**Generar solicitudes de contacto** de personas interesadas en contratar.

Todo el recorrido apunta a un único formulario:

| Punto de entrada | Dónde |
|---|---|
| CTA persistente | Header sticky, visible en todo momento |
| CTA principal | Hero — *Solicitar instalación gratis* |
| CTA por plan | Los tres planes — *Quiero el plan…* |
| CTA del pie | Footer — *Solicitar instalación* |
| Canal alternativo | WhatsApp, junto al formulario y en el footer |

El CTA principal es **"Solicitar instalación gratis"**: amarra la promoción a la
acción y nombra el beneficio dentro del propio botón. Se descartaron
"Contáctanos" y "Más información", que no comunican valor ni crean urgencia.

El CTA secundario del hero es **"Ver los planes"** y no un segundo botón hacia
el formulario: quien todavía no está listo para dejar sus datos necesita una
salida que no sea abandonar la página.

---

## 5. Estructura de la landing

El orden responde al recorrido de alguien que ya fue defraudado antes por su
proveedor: primero reconocer el problema, después probarlo con números, después
explicarlo, y solo entonces pedir los datos.

| # | Sección | Qué resuelve | Requisito |
|---|---|---|---|
| 1 | **Header** | Logotipo, navegación, CTA y menú móvil | 5.1 |
| 2 | **Hero** | H1, subtítulo, CTA, imagen y badge de instalación $0 | 5.2 |
| 3 | **Métricas** | 99,7 % de disponibilidad · 4 min de respuesta · +12.000 hogares | 5.5 |
| 4 | **Beneficios** | Cuatro beneficios con título, descripción e icono | 5.3 |
| 5 | **Planes** | Velocidad, dispositivos, router, tipo de conexión, beneficios incluidos y precio | 5.4 |
| 6 | **Garantía** | Si se cae más de 4 h en el mes, ese mes no se paga — banda naranja a sangre | 5.5 |
| 7 | **Preguntas** | Cinco preguntas: instalación, cobertura, respuesta, equipos, cancelación | 5.6 |
| 8 | **Contacto** | Formulario con validación propia | 5.7 |
| 9 | **Footer** | Empresa, contacto, legales, redes y copyright | 5.8 |

Dos decisiones de orden merecen explicación:

**Las métricas van justo después del hero, no al final.** Este público llega
desconfiando. La cifra de disponibilidad es la prueba que sostiene la promesa
del H1, y una prueba que aparece tres pantallas más abajo ya no sostiene nada.

**El beneficio de fibra simétrica va en segundo lugar, no en el último.** "Sube
tan rápido como baja" es el diferenciador real: la mayoría de proveedores
esconde su velocidad de subida porque es su punto débil, y es exactamente lo que
le importa a alguien que trabaja desde casa enviando archivos pesados.

---

## 6. Decisiones visuales

### 6.1 El concepto: tormenta afuera, brasa adentro

Toda la identidad sale de una escena concreta: **afuera hay tormenta y
oscuridad; adentro hay una lámpara encendida y alguien tranquilo frente a una
pantalla.**

Ese contraste no es una metáfora decorativa: **es** el sistema de diseño.

| Elemento de la escena | Traducción al sistema |
|---|---|
| La tormenta | Bandas oscuras (`--color-ink`) |
| El interior | Bandas claras (`--color-canvas`, `--color-canvas-soft`) |
| La luz encendida | Color de acción (`--color-primary`) |
| El halo de la lámpara | Gradiente cálido (`--color-glow`) |

La página alterna bandas oscuras y claras siguiendo ese ritmo. El layout es la
escena de marca convertida en estructura, y por eso la jerarquía se construye
con bandas de color en lugar de con sombras difusas.

### 6.2 El dispositivo de marca: la fractura

Una identidad de campaña necesita **un gesto visual que se repita en todas
partes**. Es lo que hace que seis secciones distintas se lean como una sola
pieza en lugar de como una plantilla con contenidos diferentes.

El de Fibreak estaba en el nombre desde el principio: el *break*. Es el corte
del logotipo entre `FIB` y `REAK`, y se convierte en **la fractura**: un mismo
ángulo diagonal de 8°, siempre en la misma dirección, aplicado a seis escalas
distintas.

| Dónde | Cómo aparece |
|---|---|
| Wordmark | La barra ámbar entre `FIB` y `REAK`, ahora inclinada |
| Todos los eyebrows | Barra vertical de 3 px con el mismo sesgo |
| Fondo del hero | Diagonal ámbar al 20 % cruzando por detrás del titular |
| Foto del hero | Corte en la esquina inferior izquierda, sustituyendo al radio |
| Imagen de la garantía | El mismo corte, espejado a la derecha |
| Tarjeta de plan destacada | Corte en la esquina inferior izquierda |
| Entrada a las bandas clave | Segmento diagonal alineado con el contenido |
| Iconos de beneficio | El corte recorta el cuadrado de fondo |

```css
--fracture-angle: 8deg;   /* el mismo en todo el sitio, sin excepción */
--fracture-width: 4px;
--fracture-cut: 48px;
```

**El ángulo nunca cambia entre secciones.** Un ángulo inconsistente no se lee
como variedad, se lee como error.

Dos apuntes de implementación que costaron una corrección cada uno:

- **La regla diagonal no puede ir a todo el ancho.** Con 8° sobre 1200 px el
  desnivel es de unos 168 px: la diagonal se sale de la banda en lugar de
  coserla, y la mitad queda recortada. Es un segmento de 280 px alineado con el
  borde izquierdo del contenido, donde el desnivel baja a 39 px y se lee entera.
- **El corte de la tarjeta destacada no usa `clip-path`.** Recortar la tarjeta
  recortaría también el anillo de foco del botón que lleva dentro. El corte se
  dibuja con un pseudoelemento del color de la banda.

### 6.3 Colores

```css
--color-ink:          #0B1220;  /* tormenta: azul noche          */
--color-ink-soft:     #172436;  /* superficie elevada            */
--color-primary:      #C2410C;  /* brasa: naranja quemado        */
--color-primary-dark: #9A330A;  /* hover / active                */
--color-glow:         #FFC46B;  /* halo cálido, nunca con texto  */
--color-canvas:       #FFFFFF;
--color-canvas-soft:  #F7F4F0;  /* blanco cálido, nunca gris frío */
--color-ink-body:     #55606E;  /* texto de cuerpo               */
```

**Contraste verificado (WCAG 2.1 AA):**

| Combinación | Ratio | Cumple |
|---|---|---|
| `primary` sobre blanco | 5.18:1 | AA texto normal |
| `primary-dark` sobre blanco | 7.36:1 | AAA |
| blanco sobre `ink` | 18.72:1 | AAA |
| `ink-body` sobre blanco | 6.39:1 | AA texto normal |
| `ink-body` sobre `canvas-soft` | 5.83:1 | AA texto normal |
| `danger` sobre blanco | 5.63:1 | AA texto normal |

El naranja inicial era `#D9480F`, pero dio **4.3:1** sobre blanco: por debajo
del 4.5:1 que exige AA para texto normal. Se corrigió a `#C2410C`, verificado
en 5.18:1.

**Tres reglas de uso que se respetan sin excepción:**

- **El ámbar nunca lleva texto encima.** Existe solo para halos, gradientes y
  acentos. Cuando aparece con texto (el badge de promoción), el texto es `ink`,
  no al revés.
- **El badge de promoción aparece una sola vez en toda la página.** La escasez
  es lo que lo hace funcionar como señal de urgencia; un acento repetido deja de
  ser un acento.
- **Sobre fondo oscuro, el naranja solo aparece como relleno sólido de botón.**
  `primary` sobre `ink` da 3.62:1, suficiente para componentes de interfaz pero
  no para texto de cuerpo. Por eso los botones secundarios sobre banda oscura
  usan borde y texto blancos, no naranjas.

**La jerarquía cromática: una sola banda de color completo.** La sección de
Garantía —y solo ella— se sirve sobre `--color-primary` a sangre, con el
titular en blanco a 72 px y la fotografía de lluvia multiplicada encima al
25 % de opacidad.

Es la afirmación central de la marca, la que pone dinero de por medio, y recibe
el tratamiento más audaz del sitio. Además rompe la alternancia
oscuro → crema → oscuro → crema, que era justo lo que hacía que la página se
leyera como «una más». La escasez del recurso es lo que le da el peso: si dos
secciones llevaran banda de color, ninguna sería el momento que se recuerda.

Blanco sobre `#C2410C` da 5.18:1, así que cumple AA sin ajustes. El texto legal
de esa sección sí necesitó uno: en blanco al 82 % daba 3.98:1, por debajo del
mínimo, y pasó a blanco puro. La jerarquía la marca el tamaño, no la opacidad.

**Descartado:** el rojo `#e60000` de la referencia de inspiración — es el activo
visual más reconocible de Vodafone, y usarlo convierte la inspiración en calco.
También el gris frío `#f2f2f2` como superficie suave: rompía el concepto de
"interior encendido", y se sustituyó por un blanco cálido.

### 6.4 Tipografías

| Rol | Familia | Pesos |
|---|---|---|
| Display | Archivo Expanded | 700, 800 |
| Texto | Inter | 400, 500, 600 |

**Archivo Expanded** es ancha y sólida: se lee como una afirmación firme, no
como un grito. Encaja con una marca que nace de romper lo común sin caer en lo
caricaturesco. **Inter** sostiene el cuerpo y, sobre todo, el formulario, donde
la legibilidad manda por encima del carácter.

Se descartó usar Inter para todo: es el default de la industria y no habría dado
nada que justificar aquí.

**Las dos fuentes están auto-hospedadas** en `assets/fonts/` como `.woff2`. Es
una decisión deliberada, no una comodidad: si el proyecto dependiera del CDN de
Google Fonts, alguien que lo abriera sin conexión vería la landing rota.

Ambas son fuentes variables, así que **un solo archivo por subconjunto cubre
todos los pesos usados**: cuatro archivos en total, 195 KB, de los cuales
`latin-ext` solo se descarga si el texto lo necesita gracias a `unicode-range`.
Archivo se sirve con el eje `wdth` fijado en 125 %, que es la instancia
*Expanded*.

**Escala.** Los tres tamaños display escalan de forma fluida con `clamp()` entre
390 px y 1440 px; el resto usa breakpoints. El display del hero llega a 72 px en
escritorio, no a 144 px: en una landing de conversión con un solo *fold* útil, un
titular de ese tamaño empuja el CTA fuera de la pantalla.

Ese límite se midió, no se supuso. Con la imagen a sangre ocupando la mitad
derecha, el titular vive en poco más de media columna, y Archivo Expanded es una
tipografía muy ancha. A 1440 px: **96 px da seis líneas y deja el CTA en 1023 px**,
fuera de pantalla incluso con 900 px de alto; 80 px da cinco líneas y lo deja en
850 px, ya invisible en un portátil de 768 px; **72 px da tres líneas limpias y
el CTA en 735 px**, visible en cualquier pantalla. El impacto de campaña lo
aportan la imagen a sangre, la banda naranja y la fractura — no hacía falta
pagarlo con el objetivo de conversión.

Ningún `line-height` baja de 1.0 — los interlineados menores al cuerpo tipográfico son recurso de
póster y en un texto corrido destruyen la legibilidad.

### 6.5 Imágenes

La dirección de arte responde a un criterio único: **interiores nocturnos con
luz cálida, una sola persona, brillo de pantalla sobre el rostro, escritorio
real y postura relajada.** La foto tiene que comunicar el suspiro de alivio.

Lo que queda explícitamente fuera: grupos y familias numerosas, oficinas
corporativas, luz diurna plana, sonrisas de stock a cámara y **routers como
protagonistas** — el producto es la tranquilidad, no el equipo.

Hay dos fotografías en todo el sitio, y las dos hacen un trabajo concreto:

- **Hero** — una persona con auriculares trabajando de noche, lámpara encendida
  a un lado y la ciudad al fondo. Es la escena de marca literal.
- **Garantía** — lluvia en una ventana de noche, a sangre bajo un velo oscuro.
  Es la tormenta, justo detrás de la promesa que la contradice.

Todo lo demás es CSS: el halo de la lámpara del hero es un `radial-gradient` en
un pseudoelemento, y los iconos son SVG en línea trazados con `currentColor`.
Ninguno de los dos añade una sola petición ni un solo kilobyte de imagen.

**Tratamiento técnico:** `.webp` con fallback `.jpg` vía `<picture>`, `width` y
`height` declarados para reservar el espacio y evitar saltos de layout,
`loading="lazy"` en todo excepto el hero, `alt` descriptivo en las imágenes de
contenido y `alt=""` en las decorativas para que un lector de pantalla no las
anuncie.

### 6.6 Distribución del contenido

- **Ancho máximo de 1200 px** con gutters de 24 px, que bajan a 16 px en móvil.
- **Bandas alternadas** según el concepto: la jerarquía la marca el color de
  fondo, no la sombra. La única sombra de todo el sistema es la del header al
  scrollear y la del menú móvil desplegado.
- **La sección de garantía es la única centrada** de toda la página. Todo lo
  demás está alineado a la izquierda, así que el centrado la separa del resto y
  hace que se lea como una declaración y no como un bloque más de contenido.
- **Una palabra en outline por titular, como máximo.** Tres titulares llevan
  una sola palabra en contorno vacío: *velocidad*, *megas*, *preguntan*. El
  contraste entre hueco y lleno es lo que hace el trabajo; aplicado a cada
  palabra dejaría de ser un recurso y pasaría a ser ruido. Es una restricción
  autoimpuesta, y explicarla dice más que usarlo en todas partes.
  `-webkit-text-stroke` no es estándar, así que va acompañado de un `@supports`
  obligatorio: sin él, un navegador sin soporte pinta el texto transparente y
  la palabra desaparece.
- **Cifras gigantes donde antes había hueco.** Los encabezados de Beneficios y
  Planes dejaban vacío el 55 % derecho, y eso no leía como respiro editorial
  sino como sección sin terminar. Ahora lo ocupan `99,7%` y `$0` en outline, que
  además refuerzan dos datos de conversión. Van marcadas con `aria-hidden`
  porque duplican información ya presente en la página, y su etiqueta sí es
  texto sólido y legible.
- **Las tarjetas se alinean con `subgrid`.** En beneficios y en planes, las
  filas internas de cada tarjeta se alinean con las de sus vecinas, de modo que
  un título de dos líneas no descuelga la descripción y el distintivo "El más
  elegido" no descuadra los precios. Va dentro de un `@supports`: sin soporte,
  cada tarjeta sigue siendo un flex column y solo se pierde esa alineación fina.

### 6.7 Elementos de confianza

El requisito 5.5 admite testimonios, estadísticas, garantías, certificaciones o
logos de clientes. Se eligieron dos, y se descartó explícitamente el recurso por
defecto:

- **Métricas verificables**, no adjetivos: `99,7 %` de disponibilidad, `4 min`
  de respuesta de soporte, `+12.000` hogares.
- **La Garantía Fibreak**, que pone dinero de por medio: *si tu conexión se cae
  más de 4 horas en un mes, ese mes no lo pagas.*

**Descartados:** logos de clientes y sellos de certificación genéricos. Son lo
que hace todo el mundo y no dicen absolutamente nada sobre este producto en
particular.

---

### 6.8 CTA

**El principal:** *Solicitar instalación gratis.* Amarra la promoción a la
acción y nombra el beneficio dentro del propio botón, en lugar de dejarlo en un
texto que hay que haber leído antes. Se descartaron *Contáctanos* y *Más
información*: no comunican valor y no crean ninguna urgencia.

**El secundario:** *Ver los planes.* No es un segundo botón hacia el
formulario. Quien todavía no está listo para dejar sus datos necesita una salida
que no sea abandonar la página, y llevarlo a los precios es la que más cerca lo
deja de volver.

**Los de plan:** *Quiero el plan…* en primera persona, continuando la voz del
resto de la página. Los tres muestran el mismo texto visible para que ninguno
envuelva a dos líneas y la fila de botones quede pareja; el nombre del plan va
en un `<span>` oculto, así que cada enlace conserva un nombre accesible
distinto.

**Tratamiento visual.** Un único color de acción en toda la página,
`--color-primary`, sin excepciones: si dos elementos compiten por ser *el*
botón, ninguno lo es. Forma de píldora, 48 px de alto mínimo, y sobre banda
oscura el secundario pasa a borde y texto blancos, porque el naranja sobre
`ink` da 3.62:1 — suficiente para un componente de interfaz, no para texto.

**Dónde aparece.** El CTA nunca queda a más de una pantalla de distancia: vive
en el header sticky, en el hero, en cada una de las tres tarjetas de plan y en
el pie. Es el mismo destino desde cinco sitios, no cinco ofertas distintas.

## 7. Estrategia responsive

**Mobile-first en el contenido, sistema de tokens en la implementación.**

### Breakpoints

| Nombre | Ancho | Qué cambia |
|---|---|---|
| `sm` | ≤ 480 px | Gutter a 16 px; footer a una columna |
| `md` | ≤ 768 px | Menú hamburguesa; columna única; `--section-gap` a 64 px |
| `lg` | ≤ 1024 px | Grids de 4 → 2 columnas; FAQ y contacto apilados |
| `hero` | ≤ 900 px | La imagen del hero vuelve al flujo; desaparecen las cifras gigantes |
| `xl` | ≥ 1440 px | Sin cambios de layout: solo más aire lateral |

### Cómo está construido

El breakpoint de 900 px es el único que no responde a una familia de
dispositivos sino a una restricción tipográfica: por encima de él el titular
del hero convive con la imagen a sangre en media columna; por debajo necesita
el ancho completo para no desbordar.

**Los tokens también son responsive.** `--section-gap`, `--gutter`,
`--header-height` y los tamaños de texto cambian de valor en el breakpoint. Los
componentes que los consumen no se tocan: se adaptan porque su token cambió.

**Los media queries viven junto al componente que modifican**, no en un
`responsive.css` aparte. Separarlos obliga a saltar entre archivos para entender
un solo bloque.

**Escalado tipográfico con `clamp()`** en los tres tamaños display, interpolando
entre 390 px y 1440 px. Entre esos dos extremos no hay saltos, solo un ajuste
continuo.

**Grid y Flexbox según lo que hace falta.** CSS Grid para las estructuras
bidimensionales (hero, tarjetas, FAQ, contacto, footer); Flexbox para las
unidimensionales (barra de navegación, fila de CTAs, interior de cada tarjeta).

**El menú móvil es el mismo `<nav>` del escritorio**, no un menú duplicado.
Cerrado significa `display: none`, no opacidad cero: así el contenido sale
también del árbol de accesibilidad y del orden de tabulación, en lugar de
quedarse tabulable pero invisible.

### Verificación

Probado a **1440 / 1024 / 768 / 390 px**. En los cuatro anchos: sin scroll
horizontal, sin ningún elemento desbordando el viewport, y todos los botones y
campos por encima del objetivo táctil de 48 px.

---

## 8. Validación del formulario

### Por qué es propia y no nativa

El `<form>` lleva `novalidate` y el envío se intercepta con `preventDefault()`.
La validación nativa del navegador no permite controlar ni el texto ni el estilo
de los mensajes, y además los presenta de forma distinta en cada navegador. El
brief pide mensajes de error visibles y comprensibles, así que la validación es
propia.

### Reglas

| Campo | Regla |
|---|---|
| Nombre completo | Obligatorio, mínimo 2 caracteres |
| Correo electrónico | Obligatorio y con formato válido |
| Número telefónico | Obligatorio, entre 9 y 15 dígitos |
| Plan de interés | Obligatorio (incluye la opción *"todavía no lo sé"*) |
| Política de privacidad | Casilla obligatoria |

**El teléfono cuenta dígitos e ignora el formato.** Espacios, guiones,
paréntesis y el prefijo `+593` se descartan antes de contar: la gente escribe su
número de muchas formas y todas son correctas.

**La expresión regular del correo es deliberadamente permisiva.** Su trabajo es
descartar erratas evidentes, no decidir si una dirección existe — eso solo lo
puede comprobar un envío real, y rechazar un correo válido es peor error que
dejar pasar uno inválido.

### Cuándo valida

1. **Al enviar**, siempre, y **todos los campos a la vez**: el usuario ve de una
   sola vez todo lo que tiene que corregir, en lugar de descubrir los errores de
   uno en uno.
2. **Al salir de un campo (`blur`), solo si ese campo ya falló antes.** Marcar
   en rojo a alguien que todavía está escribiendo su correo es mala experiencia;
   confirmarle que ya lo corrigió es buena.
3. **Al cambiar (`change`) el selector o la casilla**, que no se "escriben": en
   cuanto cambian, su error deja de tener sentido.

### Qué ocurre al enviar

**Si hay errores:** aparece el mensaje bajo cada campo afectado, el campo recibe
`aria-invalid="true"` y borde rojo, y **el foco salta al primer campo con
problema** para que quien navega con teclado o lector de pantalla no tenga que
buscarlo.

**Si es válido:**

1. **Todo el formulario** pasa a `disabled` durante 900 ms —los cinco campos y
   el botón, que además cambia su texto a "Enviando…"—, que es lo que haría un
   envío real y evita que se edite un campo con la petición en curso.
2. Se limpia el formulario y se borran los mensajes.
3. Aparece el mensaje de éxito y **el foco se mueve a él**.

Esos 900 ms simulados no están por capricho. La rúbrica evalúa los estados
`hover`, `focus` y `disabled`, y en una landing estática no hay ningún sitio
donde `disabled` aparezca de forma natural. Simular la latencia del envío hace
que el estado exista por un motivo real: es lo que ocurriría con un backend
detrás.

El mensaje de éxito se oculta en cuanto el usuario vuelve a escribir, porque
deja de corresponder a lo que tiene delante.

### Accesibilidad del formulario

- Todos los labels son **visibles** y están asociados por `for`/`id`. El
  placeholder no sustituye a ninguno: al escribir desaparece y el usuario pierde
  la referencia de qué le estaban pidiendo.
- Cada mensaje de error tiene `role="alert"` y está enlazado a su campo por
  `aria-describedby`.
- El mensaje de éxito usa `role="status"`, que se anuncia sin interrumpir.
- El campo inválido se marca con `aria-invalid`, no con el selector `:invalid`
  de CSS: `:invalid` coincide desde que carga la página y teñiría de rojo un
  formulario que el usuario todavía no ha tocado.

**La consola del navegador queda limpia**, sin errores ni advertencias.

---

## 9. Accesibilidad

No se trató como un extra al final, sino como una restricción de partida:

- **Un único `<h1>`** en el documento — el del hero. El logotipo es un `<a>`,
  no un encabezado.
- **Jerarquía `h1 → h2 → h3` sin saltos**, verificada en las dos páginas.
- **Skip link** como primer elemento enfocable.
- **`:focus-visible` propio** de 2 px, definido una sola vez y heredado por
  todos los componentes. En ningún sitio se usa `outline: none` a secas, y sobre
  banda oscura el anillo pasa a blanco porque el naranja no contrastaría.
- **Objetivo táctil mínimo de 48 px** en botones, campos y enlaces de
  navegación, incluidos el logotipo y los enlaces del pie. La única excepción
  es la casilla de privacidad, que mide 22 px por convención: su etiqueta
  asociada mide 48 px y la activa igual, que es el objetivo equivalente que
  admite el criterio WCAG 2.5.8. Los enlaces dentro de un párrafo quedan
  exentos por la excepción de destinos en línea del mismo criterio.
- **`aria-expanded`** sincronizado en el menú móvil y en el acordeón.
- **Escape cierra el menú y devuelve el foco** al botón que lo abrió.
- **`scroll-margin-top`** en las secciones ancladas, para que el header sticky
  no tape el título al que se acaba de saltar.
- **`prefers-reduced-motion`** respetado: desactiva el scroll suave y todas las
  transiciones.
- El acordeón sigue el patrón de WAI-ARIA: cada pregunta es un `<button>` real
  dentro de un encabezado, así que Tab, Enter y Espacio funcionan sin una sola
  línea de JavaScript dedicada al teclado.
- **El movimiento nace visible.** Las tarjetas entran con un desvanecido y un
  desplazamiento de 16 px, escalonadas 60 ms entre hermanas. El estado por
  defecto en CSS es *visible*: es el JavaScript el que añade la clase que oculta
  justo antes de observar el elemento. Si el script falla o el navegador no
  soporta `IntersectionObserver`, la página se ve entera. Ocultar por CSS y
  depender de JS para mostrar es un fallo de accesibilidad, no un efecto.
- **El contador de métricas no se lee a medias.** Las tres cifras cuentan desde
  cero al entrar en pantalla, una sola vez. El número animado lleva
  `aria-hidden` y el valor real vive en un `<span>` oculto a la vista pero
  presente en el árbol de accesibilidad, de modo que un lector de pantalla
  nunca anuncia una cifra a medio contar. El formato es el español —punto para
  los miles, coma para los decimales— y se deduce del propio texto en lugar de
  codificarse en el script.
- **Foco sobre la banda naranja.** El anillo de foco naranja sería invisible
  sobre fondo naranja: en esa sección pasa a blanco (5.18:1).
- Los tres CTA de plan muestran el mismo texto visible y llevan el nombre del
  plan en un `<span>` oculto para lectores de pantalla: cada enlace tiene un
  nombre accesible distinto, y el nombre accesible contiene al texto visible,
  como exige el criterio WCAG 2.5.3.

---

## 10. Recursos externos

El proyecto **no carga nada desde internet en tiempo de ejecución**. No hay CDN,
ni scripts de terceros, ni cookies, ni analítica. Todo lo externo se descargó y
vive en el repositorio.

### Tipografías — SIL Open Font License 1.1

| Fuente | Autoría | Uso |
|---|---|---|
| [Inter](https://fonts.google.com/specimen/Inter) | Rasmus Andersson | Texto de cuerpo e interfaz |
| [Archivo](https://fonts.google.com/specimen/Archivo) | Omnibus-Type | Display, instancia Expanded (`wdth` 125) |

Descargadas desde Google Fonts y auto-hospedadas en `assets/fonts/`.

### Imágenes — Unsplash License

| Archivo | Descripción | Autoría |
|---|---|---|
| `hero-noche.*` | Persona trabajando de noche con la ciudad al fondo | [Chirayu Trivedi](https://unsplash.com/photos/g_ra59rIXDk) |
| `lluvia-ventana.*` | Gotas de lluvia en una ventana de noche | [Thirsty Water](https://unsplash.com/photos/9eONWe8hZoQ) |

La licencia de Unsplash permite el uso comercial sin atribución obligatoria. Se
atribuye igualmente por buena práctica. Las dos imágenes se recortaron y
convirtieron a `.webp` con fallback `.jpg`.

### Todo lo demás

Escrito para este proyecto: el logotipo (CSS puro, sin SVG), el favicon, los
iconos de beneficios y el chevron del acordeón (SVG en línea) y la flecha del
selector (dibujada con bordes CSS, sin ningún archivo).

---

## 11. Limitaciones conocidas

- **Sin backend real.** El formulario valida y confirma en el cliente, pero no
  persiste ni envía nada. La demora de 900 ms es una simulación.
- **Marca y datos ficticios.** Fibreak, los precios, las métricas, la dirección,
  los teléfonos y los perfiles de redes sociales se inventaron para esta prueba.
  Los enlaces externos del footer no llevan a perfiles reales.
- **La cobertura no se verifica.** El formulario no comprueba si la dirección
  está dentro de una zona de servicio; en un caso real, ese es el primer filtro.
- **Sin internacionalización.** La landing está solo en español.
- **Sin analítica** ni seguimiento de eventos de conversión.
- **Sin pruebas automatizadas.** La verificación fue manual, a los cuatro anchos
  exigidos y con navegación por teclado.
- **Las imágenes se sirven en un solo tamaño.** No hay `srcset` por densidad ni
  por ancho de viewport, así que un móvil descarga la misma imagen que un
  escritorio.
- **La página legal no es un documento legal.** Está redactada de forma
  verosímil y estructurada como correspondería, pero no ha pasado por revisión
  jurídica y así se advierte en la propia página.

---

## 12. Mejoras con más tiempo

- **Conectar el formulario** a un CRM, con notificación al equipo comercial y
  correo de confirmación al usuario.
- **Verificador de cobertura** por dirección o sector, antes de pedir los datos:
  ahorra una llamada frustrante a ambas partes.
- **Optimización de imágenes** con `srcset` y `sizes`, sirviendo el recorte
  adecuado a cada ancho y densidad.
- **Tracking de eventos**: profundidad de scroll, clics por CTA y abandono de
  formulario campo a campo — el dato más útil para saber qué campo sobra.
- **Test A/B del H1 y del CTA principal**, que es donde una hipótesis vale menos
  que una medición.
- **Pruebas end-to-end** del flujo de formulario con Playwright, y una auditoría
  automatizada de accesibilidad en integración continua.
- **Modo oscuro**, aprovechando que el sistema de tokens ya está preparado para
  soportarlo.
- **Micro-interacciones de entrada** por sección, respetando
  `prefers-reduced-motion`.

---

## 13. La línea que decidí no escribir

Se consideró abrir la landing afirmando que Fibreak es **"la mejor fibra del
mercado"**. Se descartó, y la decisión de no escribirla explica el proyecto
mejor que casi cualquier cosa que sí está escrita.

Cuatro razones, en orden de peso:

1. **Legal.** La Ley Orgánica de Defensa del Consumidor del Ecuador sanciona la
   publicidad engañosa, y los superlativos comparativos sin respaldo caen ahí.
   Un proveedor real opera además bajo ARCOTEL y con revisión legal de cada
   pieza publicitaria.
2. **Estratégica.** Es exactamente lo que dice toda la competencia, así que ya
   no significa nada. Y choca de frente con un nombre que nace de romper lo
   común.
3. **De tono.** El brief pide una comunicación "comercial, pero no invasiva".
   El superlativo es invasivo por definición.
4. **De credibilidad.** Este público ya fue defraudado antes por su proveedor.
   Su reacción al superlativo no es confianza: es sospecha.

La superioridad se afirma igual, pero de tres formas defendibles:

- **Por métrica:** `99,7 % de disponibilidad medida en los últimos 12 meses`.
- **Por dimensión estrecha:** fibra **simétrica** real, que es justo el dato que
  la competencia esconde.
- **Por garantía:** *si se cae más de 4 horas en un mes, ese mes no lo pagas.*

Poner dinero de por medio es la afirmación de superioridad más fuerte que existe
sin riesgo legal, y es más difícil de imitar que un adjetivo.

---

## 14. Estructura de archivos

```
fibreak-landing/
│
├── index.html                  Landing completa
├── politica-privacidad.html    Política de privacidad y condiciones
├── README.md
│
├── css/
│   ├── tokens.css              @font-face y todas las variables del sistema
│   ├── base.css                Reset, estilos de elemento y primitivas de layout
│   ├── components.css          Piezas reutilizables y sus estados
│   └── sections.css            Composición de cada bloque de la página
│
├── js/
│   └── main.js                 Header, menú, navegación, acordeón y formulario
│
└── assets/
    ├── favicon.svg
    ├── fonts/                  Inter y Archivo Expanded (.woff2)
    └── img/                    Fotografías (.webp + .jpg) y créditos
```

### Por qué el CSS está en cuatro archivos

La separación es **por nivel de abstracción**, que es como se piensa el sistema:

- `tokens.css` — decisiones de diseño. Ningún valor de color, tipografía o
  espaciado se escribe literal fuera de aquí.
- `base.css` — cómo se ve el HTML sin clases, más las primitivas de layout
  (`.container`, `.section`, `.band-dark`).
- `components.css` — piezas que se reutilizan, cada una con sus estados
  (`hover`, `focus-visible`, `disabled`) y sus media queries **junto a ellas**.
- `sections.css` — composición. Los componentes ya están resueltos; aquí solo
  se los coloca.

Se descartó un `responsive.css` aparte por la misma razón: entender un
componente no debería obligar a saltar entre archivos.

### Por qué sin framework

- La rúbrica evalúa explícitamente variables CSS, reutilización de estilos y
  organización del código. Un framework de utilidades vuelve esos tres puntos
  imposibles de demostrar, porque esconde justo el CSS que se está evaluando.
- Quien evalúa abre `index.html` y funciona. Sin `npm install`, sin build, sin
  versiones de Node.
- Es el stack que el brief describe entre líneas en sus secciones 6, 7 y 8.
