# Fibreak — Landing page

Prueba técnica de desarrollo web. Landing page de captación para el lanzamiento
de un servicio de internet residencial por fibra óptica.

**Ver en vivo:** `<!-- PENDIENTE: pegar aquí la URL del deploy -->`

**Stack:** HTML, CSS y JavaScript. Sin frameworks, sin build, sin dependencias.

> Este README responde a los doce puntos del apartado 10 del brief, en su
> mismo orden y con su misma numeración. Lo que va después de ellos son
> anexos: material que no se pedía y se añade aparte para no alterar la
> correspondencia.

---

## Índice

**Los doce puntos que pide el brief**

1. [Nombre del candidato](#1-nombre-del-candidato)
2. [Instrucciones para ejecutar el proyecto](#2-instrucciones-para-ejecutar-el-proyecto)
3. [Descripción general de la solución](#3-descripción-general-de-la-solución)
4. [Público objetivo considerado](#4-público-objetivo-considerado)
5. [Objetivo de conversión](#5-objetivo-de-conversión)
6. [Estructura de la landing](#6-estructura-de-la-landing)
7. [Justificación de las decisiones visuales](#7-justificación-de-las-decisiones-visuales)
   — [7.1 Colores](#71-colores) · [7.2 Tipografías](#72-tipografías) · [7.3 Imágenes](#73-imágenes) · [7.4 Distribución del contenido](#74-distribución-del-contenido) · [7.5 CTA](#75-cta)
8. [Estrategia responsive](#8-estrategia-responsive)
9. [Validación del formulario](#9-validación-del-formulario)
10. [Recursos externos utilizados](#10-recursos-externos-utilizados)
11. [Limitaciones conocidas](#11-limitaciones-conocidas)
12. [Mejoras que implementaría con más tiempo](#12-mejoras-que-implementaría-con-más-tiempo)

**Anexos** — material adicional, fuera de los doce puntos

- [A · Accesibilidad](#anexo-a--accesibilidad)
- [B · La línea que decidí no escribir](#anexo-b--la-línea-que-decidí-no-escribir)
- [C · El 3D que no se implementó](#anexo-c--el-3d-que-no-se-implementó)
- [D · Verificación](#anexo-d--verificación)
- [E · Estructura de archivos](#anexo-e--estructura-de-archivos)

---

## 1. Nombre del candidato

**Alex Denylson Enriquez Vera**

---

## 2. Instrucciones para ejecutar el proyecto

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

---

## 3. Descripción general de la solución

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

---

## 4. Público objetivo considerado

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

---

## 5. Objetivo de conversión

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

---

## 6. Estructura de la landing

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
| 6 | **Garantía** | Si se cae más de 5 h en el mes, ese mes no se paga — banda naranja a sangre | 5.5 |
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

### Los elementos de confianza

El requisito 5.5 admite testimonios, estadísticas, garantías, certificaciones o
logos de clientes. Se eligieron dos, y se descartó explícitamente el recurso por
defecto:

- **Métricas verificables**, no adjetivos: `99,7 %` de disponibilidad, `4 min`
  de respuesta de soporte, `+12.000` hogares.
- **La Garantía Fibreak**, que pone dinero de por medio: *si tu conexión se cae
  más de 5 horas en un mes, ese mes no lo pagas.*

**Descartados:** logos de clientes y sellos de certificación genéricos. Son lo
que hace todo el mundo y no dicen absolutamente nada sobre este producto en
particular.

---

## 7. Justificación de las decisiones visuales

Antes de los cinco apartados, conviene explicar de dónde sale todo lo demás,
porque ninguna de las decisiones que siguen es independiente: todas derivan de
una sola escena y de un solo gesto.

**La escena: tormenta afuera, brasa adentro.** Toda la identidad nace de una
imagen concreta — afuera hay tormenta y oscuridad; adentro hay una lámpara
encendida y alguien tranquilo frente a una pantalla. Ese contraste no es una
metáfora decorativa: **es** el sistema de diseño, y de él salen la paleta, el
ritmo de bandas y hasta la forma de construir la jerarquía.

| Elemento de la escena | Traducción al sistema |
|---|---|
| La tormenta | Bandas oscuras (`--color-ink`) |
| El interior | Bandas claras (`--color-canvas`, `--color-canvas-soft`) |
| La luz encendida | Color de acción (`--color-primary`) |
| El halo de la lámpara | Gradiente cálido (`--color-glow`) |

La página alterna bandas oscuras y claras siguiendo ese ritmo. El layout es la
escena de marca convertida en estructura, y por eso la jerarquía se construye
con bandas de color en lugar de con sombras difusas.

**El gesto: la fractura.** Una identidad de campaña necesita un elemento visual
que se repita en todas partes; es lo que hace que siete secciones distintas se
lean como una sola pieza y no como una plantilla rellenada. El de Fibreak
estaba en el propio nombre: el *break*. Es el corte del logotipo entre `FIB` y
`REAK`, y se convierte en **la fractura** — un mismo ángulo de 8°, siempre en
la misma dirección, aplicado a ocho escalas distintas: el wordmark, todos los
eyebrows, el fondo del hero, las dos fotografías, la tarjeta de plan destacada,
la entrada a las bandas clave y los iconos de beneficio.

```css
--fracture-angle: 8deg;   /* el mismo en todo el sitio, sin excepción */
--fracture-width: 4px;
--fracture-cut: 48px;
```

**El ángulo nunca cambia entre secciones.** Un ángulo inconsistente no se lee
como variedad, se lee como error. Dos apuntes de implementación que costaron
una corrección cada uno: la regla diagonal no puede cruzar todo el ancho —con
8° sobre 1200 px el desnivel es de unos 168 px y la línea se sale de la banda
en lugar de coserla—, y el corte de la tarjeta destacada no usa `clip-path`,
porque recortaría también el anillo de foco del botón que lleva dentro.

Con eso en la mano, los cinco apartados que pide el brief:

### 7.1 Colores

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

### 7.2 Tipografías

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

**Y van precargadas.** Sin `<link rel="preload">`, el navegador no descubre que
necesita las fuentes hasta terminar de parsear el CSS, así que la descarga
arranca encadenada al final de la hoja de estilos en lugar de en paralelo.
Medido: las fuentes pasaban de estar listas a los 954 ms a estarlo a los
**508 ms**, justo cuando termina el CSS, lo que cierra una ventana de unos
330 ms en la que el titular se veía con la tipografía del sistema.

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

### 7.3 Imágenes

La dirección de arte responde a un criterio único: **interiores nocturnos con
luz cálida, una sola persona, brillo de pantalla sobre el rostro, escritorio
real y postura relajada.** La foto tiene que comunicar el suspiro de alivio.

Lo que queda explícitamente fuera: grupos y familias numerosas, oficinas
corporativas, luz diurna plana, sonrisas de stock a cámara y **routers como
protagonistas** — el producto es la tranquilidad, no el equipo.

Hay dos fotografías en todo el sitio, y las dos hacen un trabajo concreto:

- **Hero** — un escritorio nocturno junto a un ventanal: una persona con
  auriculares, dos monitores (uno con una videollamada, otro con código) y el
  celular descargando un archivo, con la lámpara encendida y la ciudad al
  fondo. No es una escena parecida a la de la marca: es exactamente **una sola
  persona con cinco pantallas**, que es la corrección de público del punto 4 hecha imagen.

  La fotografía es panorámica y su tercio izquierdo es ventana oscura, es
  decir, espacio negativo a medida para el titular. Por eso ocupa el hero
  entero como fondo en lugar de media columna: encajarla en un hueco vertical
  habría recortado a un tercio del encuadre justo la parte que cuenta la
  historia. Dos velos superpuestos —uno horizontal para que el texto se lea,
  otro vertical para asentarla contra la franja de métricas— la oscurecen sin
  llegar a tapar la escena.
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

### 7.4 Distribución del contenido

- **Ancho máximo de 1200 px** con gutters de 24 px, que bajan a 16 px en móvil.
- **Bandas alternadas** según el concepto: la jerarquía la marca el color de
  fondo, no la sombra. La única sombra de todo el sistema es la del header al
  scrollear y la del menú móvil desplegado.
- **La sección de garantía es la única centrada** de toda la página. Todo lo
  demás está alineado a la izquierda, así que el centrado la separa del resto y
  hace que se lea como una declaración y no como un bloque más de contenido.
- **El hilo de fibra.** Un trazo continuo baja por el margen izquierdo
  cruzando de sección en sección, y se dibuja a medida que se scrollea. Es
  literal: el hilo *es* la fibra óptica. Misma familia visual que la fractura,
  papel opuesto — la fractura corta, el hilo conecta.

  Va en `--color-primary` y no en el ámbar del resto del sistema, y el motivo
  es de contraste, no de gusto: el trazo atraviesa bandas opuestas, y el ámbar
  sobre las claras da 1.43:1, o sea desaparece. Medido sobre las cuatro bandas
  que cruza, el naranja quemado es el único que se sostiene en todas (3.62
  sobre `ink`, 3.02 sobre `ink-soft`, 4.72 sobre `canvas-soft`, 5.18 sobre
  `canvas`). En la banda naranja de la garantía se funde con el fondo; es un
  tramo corto y no se fuerza.

  Solo aparece a partir de 1280 px, donde el margen lateral da espacio real: su
  ancho se calcula como la mitad del espacio libre, así que el trazo termina
  exactamente donde empieza el texto y nunca se le monta encima.
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
- **Las tarjetas de plan responden al señalarlas.** Halo cálido del color de
  marca, borde encendido y 4 px de elevación. Es la única sombra difusa del
  sistema fuera del header y el menú, y la excepción tiene motivo: es el
  momento de decidir la compra, y conviene que el usuario sepa sin dudar qué
  tarjeta está mirando. El mismo estado se alcanza por tres vías —puntero, foco
  de teclado (`:focus-within`) y toque— para que ningún modo de navegación se
  quede sin la señal.
- **Las tarjetas se alinean con `subgrid`.** En beneficios y en planes, las
  filas internas de cada tarjeta se alinean con las de sus vecinas, de modo que
  un título de dos líneas no descuelga la descripción y el distintivo "El más
  elegido" no descuadra los precios. Va dentro de un `@supports`: sin soporte,
  cada tarjeta sigue siendo un flex column y solo se pierde esa alineación fina.

### 7.5 CTA

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

---

## 8. Estrategia responsive

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

---

## 9. Validación del formulario

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

1. **Todo el formulario** pasa a `disabled` durante 1,3 s —los cinco campos y
   el botón—, que es lo que haría un envío real y evita que se edite un campo
   con la petición en curso. El botón muestra un aro girando y su etiqueta pasa
   a "Enviando…". Se cambia solo la etiqueta y no el contenido entero del
   botón: reescribir `textContent` se llevaría por delante el indicador.
2. El formulario **se desvanece y cede su sitio** al mensaje, en lugar de
   quedarse vacío debajo. Un formulario en blanco bajo un "listo, te
   contactamos" invita a rellenarlo otra vez, que es lo contrario de lo que se
   acaba de confirmar.
3. Aparece el mensaje de éxito con su propia entrada y **el foco se mueve a él**.
4. El mensaje incluye un botón **Enviar otra solicitud**. La vía de vuelta
   existe, pero como decisión explícita del usuario y no como estado por
   defecto; al pulsarlo, el foco entra directamente en el primer campo, porque
   quien vuelve aquí lo hace para escribir.

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

---

## 10. Recursos externos utilizados

El proyecto **no carga nada desde internet en tiempo de ejecución**. No hay CDN,
ni scripts de terceros, ni cookies, ni analítica. Todo lo externo se descargó y
vive en el repositorio.

### Tipografías — SIL Open Font License 1.1

| Fuente | Autoría | Uso |
|---|---|---|
| [Inter](https://fonts.google.com/specimen/Inter) | Rasmus Andersson | Texto de cuerpo e interfaz |
| [Archivo](https://fonts.google.com/specimen/Archivo) | Omnibus-Type | Display, instancia Expanded (`wdth` 125) |

Descargadas desde Google Fonts y auto-hospedadas en `assets/fonts/`.

### Imágenes

| Archivo | Descripción | Origen |
|---|---|---|
| `hero-fibreak.*` | Escritorio nocturno con videollamada, código y descarga a la vez | **Generada con inteligencia artificial** |
| `lluvia-ventana.*` | Gotas de lluvia en una ventana de noche | Fotografía de [Thirsty Water](https://unsplash.com/photos/9eONWe8hZoQ) · Unsplash License |

**La imagen del hero está generada con IA, y se declara aquí por transparencia.**
Se eligió ese camino porque la escena que pedía el concepto de marca —una sola
persona con cinco pantallas encendidas a la vez: videollamada, código y una
descarga en curso, de noche y con la ciudad al fondo— no aparecía en los bancos
de imágenes libres. Lo que se encontraba eran fotos de personas ante *una*
pantalla, que ilustran el teletrabajo pero no el argumento de esta landing, que
es justamente el uso simultáneo.

La fotografía de la sección de garantía sí es real y de stock. La licencia de
Unsplash permite el uso comercial sin atribución obligatoria; se atribuye
igualmente por buena práctica.

Ambas se sirven en `.webp` con fallback `.jpg` vía `<picture>`. El `.jpg` del
hero se generó localmente a partir del `.webp` original.

### Todo lo demás

Escrito para este proyecto: el logotipo (CSS puro, sin SVG), el favicon, los
iconos de beneficios y el chevron del acordeón (SVG en línea) y la flecha del
selector (dibujada con bordes CSS, sin ningún archivo).

---

---

## 11. Limitaciones conocidas

- **Sin backend real.** El formulario valida y confirma en el cliente, pero no
  persiste ni envía nada. La demora de 900 ms es una simulación.
- **Marca y datos ficticios.** Fibreak, los precios, las métricas, la dirección,
  los teléfonos y los perfiles de redes sociales se inventaron para esta prueba.
  Los enlaces externos del footer no llevan a perfiles reales.

  Los teléfonos están construidos a propósito con dígitos repetidos
  —`+593 99 999 9999` y `04 000 0000`— para que sean sintácticamente válidos
  pero prácticamente imposibles de estar asignados a nadie: un número ficticio
  verosímil corre el riesgo de existir de verdad, y quien pruebe la landing
  acabaría llamando a un desconocido. El dominio `fibreak.ec` está verificado
  como no registrado.
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

---

## 12. Mejoras que implementaría con más tiempo

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

---

## Anexo A · Accesibilidad

No se trató como un extra al final, sino como una restricción de partida.

**Recorrido de teclado verificado.** Se tabuló la página entera: **39 elementos
alcanzables**, todos reciben foco, en orden lógico — enlace de salto, header,
hero, planes, preguntas, formulario y pie. Ningún elemento decorativo (el hilo
de fibra, la diagonal del hero, los iconos) entra en el recorrido. El menú
móvil cerrado deja sus cinco enlaces fuera del orden de tabulación, porque se
oculta con `display: none` y no con opacidad.

Un fallo que salió de esa revisión y que conviene contar: al saltar a una
sección desde el menú, el script le da foco para que quien navega con teclado
continúe desde ahí. En la banda naranja de la garantía, el anillo de foco
—naranja— quedaba **invisible sobre fondo naranja**. La regla que lo corregía
existía, pero cubría solo los descendientes de la sección: `.guarantee
:focus-visible` no alcanza a la propia `<section>`, que no es descendiente de
sí misma. Ahora el selector incluye ambas formas, y el anillo se verificó
contra los cinco destinos del menú.

El resto de garantías del sistema:

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
- **La apertura del hero es CSS puro, sin JavaScript.** El primer fold tiene su
  propia secuencia al cargar: la fotografía aparece con un acercamiento muy leve
  que se resuelve solo, y sobre ella entran en cascada el eyebrow, el titular, el
  subtítulo, el badge y los botones, en el orden en que se leen. El escalonado
  es corto a propósito —el CTA termina de entrar antes de los 900 ms— porque es
  el objetivo de conversión de la página y no puede hacerse esperar.

  Que sea CSS y no JavaScript importa por dos motivos. Arranca en cuanto se
  aplica la hoja de estilos, sin esperar a descargar y ejecutar un script. Y el
  `opacity: 0` vive **únicamente dentro del fotograma inicial**, nunca como
  estado base: un navegador que no soporte animaciones ignora la regla entera y
  pinta el hero visible, en lugar de dejarlo transparente esperando una
  animación que no va a ocurrir. Verificado forzando `animation: none` sobre
  todo el documento: las seis piezas del hero quedan a opacidad 1 y sin
  desplazar.

  Toda la secuencia se declara dentro de
  `@media (prefers-reduced-motion: no-preference)`, así que con movimiento
  reducido no hay nada que anular: la regla sencillamente no existe.
- **La fotografía del hero es la excepción: no entra por tiempo, entra cuando
  ha cargado.** El resto del hero puede animarse con retardos fijos porque su
  contenido ya está en el HTML. La imagen no: es un archivo que tarda en
  llegar, y ese detalle rompía el efecto.

  Medido en local, el archivo terminaba de descargarse a los **897 ms** y su
  animación de opacidad acababa a los **900 ms**. La animación se gastaba
  entera sobre un elemento todavía sin píxeles, y la imagen se pintaba de golpe
  justo al final: exactamente el salto que se quería evitar. En una red real la
  diferencia es mayor, no menor.

  La solución no es alargar el retardo, que sería apostar contra la red. La
  entrada espera a **dos condiciones a la vez**: que la imagen haya cargado de
  verdad (evento `load`, o `complete` si venía de caché) y que haya pasado un
  retardo secuencial de 420 ms. Cada una cubre un escenario: en la primera
  visita manda la carga, que es lo lento; con la imagen ya cacheada manda el
  retardo, que es lo que conserva la secuencia y hace que la escena se revele
  **detrás** del texto y no a la vez.

  Si la imagen falla, el evento `error` la revela igual: mejor un hueco visible
  que un hero atascado esperando un archivo que no va a llegar. Y como el
  estado oculto lo añade el script y nunca el CSS, sin JavaScript la fotografía
  se ve desde el primer momento, solo que sin transición.
- **El acordeón se pliega y despliega animado, sin medir alturas con
  JavaScript.** El panel es un grid cuyo track pasa de `1fr` a `0fr`, que es la
  única forma de interpolar hasta "la altura del contenido" sin calcularla. Al
  cerrarse añade además `visibility: hidden`: un panel plegado solo con altura
  cero seguiría siendo tabulable y legible para un lector de pantalla.
  `visibility` se interpola de forma discreta, así que espera al final de la
  transición para ocultar y se aplica al instante al abrir.

  Los cinco paneles **nacen abiertos** en el CSS y es el JavaScript el que los
  pliega al arrancar. Antes nacían con el atributo `hidden` y, sin JavaScript,
  las respuestas quedaban inalcanzables: el botón no hacía nada y no había forma
  de llegar al contenido. Ahora, sin script, se leen las cinco.
- **El movimiento nace visible.** Doce bloques de la página —encabezados,
  métricas, beneficios, planes, garantía, preguntas, formulario y pie— entran
  con un desvanecido y un desplazamiento de 18 px; dentro de cada grupo, los
  hermanos van escalonados 70 ms, de modo que aparecen en cascada y no en
  bloque. Solo se animan `opacity` y `transform`, las dos propiedades que el
  navegador resuelve en el compositor sin recalcular el layout.

  El estado por defecto en CSS es **visible**: es el JavaScript el que añade la
  clase que oculta, justo antes de observar el elemento. Si el script falla, si
  no hay `IntersectionObserver` o si el usuario pidió movimiento reducido, la
  página se ve entera. Está verificado sirviendo el HTML sin el `<script>`: se
  muestran las 622 palabras y **cero elementos invisibles**. Ocultar por CSS y
  depender de JS para mostrar no es un efecto, es dejar media página en blanco
  ante el primer fallo.

  Hay además un respaldo para impresión: al imprimir no existe scroll que
  dispare nada, así que una regla `@media print` fuerza la visibilidad de todo.
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

---

## Anexo B · La línea que decidí no escribir

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
- **Por garantía:** *si se cae más de 5 horas en un mes, ese mes no lo pagas.*

Poner dinero de por medio es la afirmación de superioridad más fuerte que existe
sin riesgo legal, y es más difícil de imitar que un adjetivo.

---

---

## Anexo C · El 3D que no se implementó

Se evaluó incorporar una escena 3D —del tipo que se ve en landings de
telecomunicaciones— y se descartó. Las razones son las mismas que sostienen el
resto del proyecto:

**Contradice la premisa técnica.** El argumento del punto 2 es que no hay
build, ni dependencias, y que quien evalúa abre `index.html` y funciona.
Incorporar una librería de 3D (~600 KB) invalida esa frase. Y cargarla por CDN
rompe la página sin conexión, que es exactamente el problema que motivó
auto-hospedar las tipografías.

**Cambia criterios evaluados por criterios que no lo están.** Un canvas 3D
introduce riesgo de errores en consola, caída de rendimiento en móvil,
comportamiento impredecible del foco por teclado y complicaciones con
`prefers-reduced-motion`. Los cuatro **están** en la rúbrica. El 3D **no**.

Lo que sí se conservó de esa idea es una inclinación de grado y medio en la
tarjeta de plan destacada al señalarla, en CSS puro. Suficiente para que la
tarjeta se despegue del plano; más ángulo deja de leerse como sofisticación y
empieza a leerse como truco.

Todo el movimiento del sitio se resolvió con SVG nativo, CSS e
`IntersectionObserver`: ni una sola dependencia externa,
`prefers-reduced-motion` respetado en cada efecto, y ningún contenido que
dependa de JavaScript para ser visible.

---

---

## Anexo D · Verificación

Todo lo que sigue está comprobado sobre la página en ejecución, no asumido.

### Requerimientos de HTML — sección 6 del brief

| Criterio | Resultado |
|---|---|
| Etiquetas semánticas | `header`, `nav` ×2, `main`, `footer`, `section` ×7, `dl` ×3, `address` |
| Jerarquía de encabezados | Sin saltos de nivel |
| Un único H1 | 1 |
| Labels asociados | 0 campos sin `label[for]`; 5 con `aria-describedby` |
| `alt` en imágenes | 0 sin `alt`; 0 sin `width`/`height` |
| Botones y enlaces | 0 enlaces sin destino, 0 `<button>` sin `type`, 0 `a[role=button]`, 0 `div` clicables |
| Orden lógico de navegación | 39 elementos, todos alcanzables y en orden |
| Accesible por teclado | Menú, acordeón y formulario operables; Escape cierra y devuelve el foco |

### Requerimientos de CSS — sección 7 del brief

Probado a **1440 / 1024 / 768 / 390 px**, recorriendo la página entera en cada uno:

| Criterio | Resultado |
|---|---|
| Ausencia de scroll horizontal | Sin scroll y **0 elementos desbordados** en los cuatro |
| Legibilidad | Cuerpo 16–18 px, notas 14 px; lo único por debajo son los eyebrows y el distintivo de plan, a 12 px, que son etiquetas en versalitas con tracking y no texto de lectura |
| Tamaño de botones y campos | 0 controles por debajo de 44 px; el mínimo del sistema es 48 px |
| Flexbox y Grid | Grid para estructuras bidimensionales, Flexbox para las unidimensionales, `subgrid` para alinear tarjetas |
| Variables CSS | Todo el sistema en `tokens.css`; ningún color ni espaciado literal fuera |
| Estados hover, focus y disabled | Los tres con uso real — `disabled` bloquea los cinco campos durante el envío |
| Menú móvil | Hamburguesa solo ≤768 px; panel correcto |
| Consistencia entre secciones | Mismos componentes y tokens en las dos páginas |

### Requerimientos de JavaScript — sección 8 del brief

| Criterio | Resultado |
|---|---|
| Abrir y cerrar el menú | `aria-expanded` sincronizado, Escape cierra y devuelve el foco |
| Desplazar a las secciones | Con foco al destino, no solo scroll |
| Validar el formulario | `novalidate` + `preventDefault` |
| Mensajes de error | Los 5 mínimos, con textos específicos por tipo de fallo |
| Mensaje de éxito | `role="status"`, sustituye al formulario, con vuelta atrás |
| Evitar envío si hay errores | Verificado: foco al primer campo inválido |
| Evitar la recarga | Verificado: la URL no cambia |
| Limpiar tras el envío | Campos vacíos y sin errores residuales |
| Sin errores en consola | **Cero mensajes** en ambas páginas tras recorrido completo |

La validación mínima que pide el brief —nombre, correo con formato, teléfono,
plan y aceptación de la política— está cubierta y comprobada campo a campo.

---

---

## Anexo E · Estructura de archivos

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
