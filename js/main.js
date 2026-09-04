/* ============================================================
   FIBREAK · main.js
   Script clásico (sin módulos ES) a propósito: el proyecto debe
   funcionar abriendo index.html directamente con file://, donde
   los módulos ES fallan por política de origen.
   ============================================================ */

(function () {
  'use strict';

  /* Respeta la preferencia del sistema en todo lo que anima. */
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  var MOBILE_QUERY = '(max-width: 768px)';

  /* ──────────────────────────────────────────────────────────
     Header: estado "scrolled"

     Se usa un centinela de 1px + IntersectionObserver en lugar
     de un listener de scroll: el listener dispararía en cada
     frame y obligaría a throttling manual.
     ────────────────────────────────────────────────────────── */

  function initHeaderScrollState() {
    var header = document.querySelector('[data-header]');
    var sentinel = document.querySelector('.header-sentinel');

    if (!header || !sentinel || !('IntersectionObserver' in window)) {
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      var entry = entries[0];

      /* No basta con "no intersecta": el centinela tampoco intersecta
         cuando todavía está por debajo del viewport. El header solo
         pasa a sólido cuando el centinela ya quedó por encima. */
      var yaPaso = !entry.isIntersecting && entry.boundingClientRect.top < 0;

      header.classList.toggle('is-scrolled', yaPaso);
    }, { threshold: 0 });

    observer.observe(sentinel);
  }

  /* ──────────────────────────────────────────────────────────
     Menú móvil

     El panel es el mismo <nav> del desktop, no un menú
     duplicado. Cerrado significa display:none, de modo que sale
     también del árbol de accesibilidad y del orden de tabulación.
     ────────────────────────────────────────────────────────── */

  function initMobileNav() {
    var header = document.querySelector('[data-header]');
    var toggle = document.querySelector('[data-nav-toggle]');
    var nav = document.querySelector('[data-nav]');
    var label = document.querySelector('[data-nav-toggle-label]');

    if (!header || !toggle || !nav) {
      return;
    }

    function isOpen() {
      return header.classList.contains('is-menu-open');
    }

    function setOpen(open) {
      header.classList.toggle('is-menu-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      if (label) {
        label.textContent = open ? 'Cerrar' : 'Menú';
      }
    }

    function close(returnFocus) {
      if (!isOpen()) {
        return;
      }
      setOpen(false);
      if (returnFocus) {
        toggle.focus();
      }
    }

    toggle.addEventListener('click', function () {
      setOpen(!isOpen());
    });

    /* Al elegir un destino, el menú estorba: se cierra solo. */
    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) {
        close(false);
      }
    });

    /* Escape cierra y devuelve el foco al botón que lo abrió. */
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        close(true);
      }
    });

    /* Un clic fuera del header también cierra. */
    document.addEventListener('click', function (event) {
      if (isOpen() && !event.target.closest('.site-header')) {
        close(false);
      }
    });

    /* Si se pasa a desktop con el menú abierto, el estado deja de
       tener sentido: se limpia para no arrastrar clases muertas. */
    var mobile = window.matchMedia(MOBILE_QUERY);
    var onChange = function (event) {
      if (!event.matches) {
        close(false);
      }
    };

    if (typeof mobile.addEventListener === 'function') {
      mobile.addEventListener('change', onChange);
    } else if (typeof mobile.addListener === 'function') {
      mobile.addListener(onChange);
    }
  }

  /* ──────────────────────────────────────────────────────────
     Navegación entre secciones

     `scroll-behavior: smooth` ya resuelve el desplazamiento en
     CSS. Aquí se añade lo que el CSS no puede: mover el foco al
     destino para que quien navega con teclado continúe desde la
     sección correcta y no desde el principio del documento.
     ────────────────────────────────────────────────────────── */

  function initSectionNavigation() {
    document.addEventListener('click', function (event) {
      var link = event.target.closest('a[href^="#"]');

      if (!link) {
        return;
      }

      var id = link.getAttribute('href');

      if (id === '#' || id.length < 2) {
        return;
      }

      var target = document.querySelector(id);

      if (!target) {
        return;
      }

      event.preventDefault();

      target.scrollIntoView({
        behavior: prefersReducedMotion.matches ? 'auto' : 'smooth',
        block: 'start'
      });

      /* El destino no suele ser enfocable: se le da foco temporal
         sin dejar un tabindex permanente en el documento. */
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
      target.addEventListener('blur', function handler() {
        target.removeAttribute('tabindex');
        target.removeEventListener('blur', handler);
      });

      /* Deja la URL utilizable (compartible) sin salto brusco. */
      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, '', id);
      }
    });
  }

  /* ──────────────────────────────────────────────────────────
     Acordeón de preguntas frecuentes

     El teclado ya funciona solo: el disparador es un <button>
     dentro de un encabezado, así que Tab, Enter y Espacio no
     necesitan código. Aquí únicamente se sincronizan el estado
     ARIA y la visibilidad del panel.

     Se permite tener varias abiertas a la vez: cerrar la anterior
     al abrir otra obliga a releer y no aporta nada en una lista
     de cinco preguntas.
     ────────────────────────────────────────────────────────── */

  function initFaqAccordion() {
    var triggers = document.querySelectorAll('.faq__trigger');

    Array.prototype.forEach.call(triggers, function (trigger) {
      var panel = document.getElementById(trigger.getAttribute('aria-controls'));

      if (!panel) {
        return;
      }

      /* Los paneles nacen abiertos en el CSS y se pliegan aquí: si este
         script no llega a ejecutarse, las respuestas quedan a la vista
         en lugar de inalcanzables. */
      panel.classList.add('is-collapsed');

      trigger.addEventListener('click', function () {
        var abierto = trigger.getAttribute('aria-expanded') === 'true';
        trigger.setAttribute('aria-expanded', String(!abierto));
        panel.classList.toggle('is-collapsed', abierto);
      });
    });
  }

  /* ──────────────────────────────────────────────────────────
     Formulario de contacto

     El <form> lleva `novalidate` y el envío se intercepta con
     preventDefault: el brief pide controlar el texto y el estilo de
     cada mensaje, y la validación nativa no permite ninguna de las
     dos cosas (además de presentarse distinta en cada navegador).

     Momento de validar: al enviar, siempre. Después, un campo que ya
     falló se revalida al salir de él, para que el usuario vea que lo
     corrigió. Un campo que todavía no ha fallado nunca se marca en
     rojo mientras lo está escribiendo.
     ────────────────────────────────────────────────────────── */

  /* Latencia simulada del envío. Sin backend no hay espera real, pero
     un envío instantáneo se lee como que no ha pasado nada: el usuario
     no llega a ver la confirmación de que su acción fue registrada. */
  var DEMORA_ENVIO = 1300;

  /* Lo que tarda el formulario en desvanecerse antes de ceder su sitio
     al mensaje. Coincide con la transición declarada en el CSS. */
  var DEMORA_SALIDA_FORM = 240;

  /* Deliberadamente permisiva: su trabajo es descartar erratas
     evidentes, no decidir si una dirección existe. Solo el envío
     real puede comprobar eso, y rechazar correos válidos es peor
     que dejar pasar uno inválido. */
  var RE_CORREO = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/;

  function initContactForm() {
    var form = document.getElementById('form-contacto');

    if (!form) {
      return;
    }

    var exito = document.getElementById('form-exito');
    var boton = form.querySelector('[data-form-submit]');
    var etiquetaBoton = form.querySelector('[data-form-submit-label]');
    var botonReiniciar = exito ? exito.querySelector('[data-form-reset]') : null;
    var textoBotonOriginal = etiquetaBoton ? etiquetaBoton.textContent.trim() : '';

    /* Cada regla devuelve un mensaje si el campo está mal, o una
       cadena vacía si está bien. */
    var reglas = [
      {
        id: 'nombre',
        validar: function (valor) {
          if (!valor.trim()) {
            return 'Escribe tu nombre para saber cómo dirigirnos a ti.';
          }
          if (valor.trim().length < 2) {
            return 'El nombre es demasiado corto.';
          }
          return '';
        }
      },
      {
        id: 'correo',
        validar: function (valor) {
          if (!valor.trim()) {
            return 'Escribe tu correo para poder responderte.';
          }
          if (!RE_CORREO.test(valor.trim())) {
            return 'Ese correo no parece válido. Revisa el formato: nombre@dominio.com';
          }
          return '';
        }
      },
      {
        id: 'telefono',
        validar: function (valor) {
          if (!valor.trim()) {
            return 'Escribe tu número para poder llamarte.';
          }
          /* Se cuentan los dígitos y se ignoran espacios, guiones,
             paréntesis y el prefijo: la gente escribe su número de
             muchas formas y todas son correctas. */
          var digitos = valor.replace(/\D/g, '');
          if (digitos.length < 9) {
            return 'El número está incompleto. Deben ser al menos 9 dígitos.';
          }
          if (digitos.length > 15) {
            return 'Ese número tiene demasiados dígitos. Revísalo.';
          }
          return '';
        }
      },
      {
        id: 'plan',
        validar: function (valor) {
          if (!valor) {
            return 'Elige un plan, o marca que prefieres que te asesoren.';
          }
          return '';
        }
      },
      {
        id: 'privacidad',
        validar: function (_valor, campo) {
          if (!campo.checked) {
            return 'Necesitamos que aceptes la política de privacidad para poder contactarte.';
          }
          return '';
        }
      }
    ];

    function campoDe(regla) {
      return document.getElementById(regla.id);
    }

    function errorDe(regla) {
      return document.getElementById(regla.id + '-error');
    }

    function pintarError(regla, mensaje) {
      var campo = campoDe(regla);
      var salida = errorDe(regla);

      if (!campo || !salida) {
        return;
      }

      salida.textContent = mensaje;

      if (mensaje) {
        campo.setAttribute('aria-invalid', 'true');
      } else {
        campo.removeAttribute('aria-invalid');
      }
    }

    function validarCampo(regla) {
      var campo = campoDe(regla);

      if (!campo) {
        return true;
      }

      var mensaje = regla.validar(campo.value, campo);
      pintarError(regla, mensaje);
      return !mensaje;
    }

    function limpiarErrores() {
      reglas.forEach(function (regla) {
        pintarError(regla, '');
      });
    }

    /* Revalidación al salir del campo, pero solo si ya falló antes.
       Avisar antes del primer error interrumpe a quien todavía está
       escribiendo. */
    reglas.forEach(function (regla) {
      var campo = campoDe(regla);

      if (!campo) {
        return;
      }

      campo.addEventListener('blur', function () {
        if (campo.getAttribute('aria-invalid') === 'true') {
          validarCampo(regla);
        }
      });

      /* La casilla y el selector no se "escriben": en cuanto cambian,
         su error deja de tener sentido. */
      campo.addEventListener('change', function () {
        if (campo.getAttribute('aria-invalid') === 'true') {
          validarCampo(regla);
        }
      });
    });

    /* El mensaje sustituye al formulario en lugar de acompañarlo. Un
       formulario vacío bajo un "listo, te contactamos" invita a volver
       a rellenarlo, que es justo lo contrario de lo que se acaba de
       confirmar. La vía de vuelta existe, pero como decisión explícita
       del usuario y no como estado por defecto. */
    function mostrarExito() {
      if (!exito) {
        return;
      }

      form.classList.add('is-leaving');

      window.setTimeout(function () {
        form.hidden = true;
        form.classList.remove('is-leaving');
        exito.hidden = false;
        exito.focus();
      }, DEMORA_SALIDA_FORM);
    }

    function volverAlFormulario() {
      if (exito) {
        exito.hidden = true;
      }

      form.hidden = false;
      limpiarErrores();

      /* El foco entra en el primer campo: quien vuelve aquí lo hace
         para escribir, no para releer la etiqueta. */
      var primero = campoDe(reglas[0]);
      if (primero) {
        primero.focus();
      }
    }

    if (botonReiniciar) {
      botonReiniciar.addEventListener('click', volverAlFormulario);
    }

    function bloquearFormulario(bloqueado) {
      reglas.forEach(function (regla) {
        var campo = campoDe(regla);
        if (campo) {
          campo.disabled = bloqueado;
        }
      });

      if (!boton) {
        return;
      }

      boton.disabled = bloqueado;
      boton.classList.toggle('is-loading', bloqueado);

      /* Se cambia solo la etiqueta y no el contenido entero del botón:
         reescribir `textContent` se llevaría por delante el indicador
         de carga, que es hermano del texto. */
      if (etiquetaBoton) {
        etiquetaBoton.textContent = bloqueado ? 'Enviando…' : textoBotonOriginal;
      }
    }

    form.addEventListener('submit', function (event) {
      /* Lo primero: sin esto la página se recarga y se pierde todo. */
      event.preventDefault();

      var primerFallo = null;

      /* Se validan todos los campos, no solo hasta el primer error:
         el usuario ve de una vez todo lo que tiene que corregir. */
      reglas.forEach(function (regla) {
        var valido = validarCampo(regla);
        if (!valido && !primerFallo) {
          primerFallo = campoDe(regla);
        }
      });

      if (primerFallo) {
        /* El foco va al primer campo con problema: quien navega con
           teclado o lector de pantalla no tiene que buscarlo. */
        primerFallo.focus();
        return;
      }

      /* No hay backend. Se simula la latencia del envío para que el
         estado `disabled` exista por un motivo real y no solo para
         cumplir la lista de requisitos.

         Se bloquea el formulario entero, no solo el botón: es lo que
         haría un envío de verdad, y evita que alguien edite un campo
         mientras la petición está en curso. */
      bloquearFormulario(true);

      window.setTimeout(function () {
        bloquearFormulario(false);

        form.reset();
        limpiarErrores();
        mostrarExito();
      }, DEMORA_ENVIO);
    });
  }

  /* ──────────────────────────────────────────────────────────
     El hilo de fibra

     Dibuja el trazo del costado en proporción a lo scrolleado. La
     técnica es `stroke-dasharray` a la longitud total del path y un
     `stroke-dashoffset` que se va reduciendo: el trazo no se mueve,
     se descubre.

     El cálculo va throttleado con requestAnimationFrame y el listener
     es `passive`, de modo que el scroll nunca espera a este código.
     Solo se escribe una custom property; el navegador resuelve el
     resto en el compositor.
     ────────────────────────────────────────────────────────── */

  function initFiberThread() {
    var svg = document.querySelector('[data-fiber]');

    if (!svg) {
      return;
    }

    var path = svg.querySelector('path');

    if (!path) {
      return;
    }

    /* getTotalLength() devuelve la longitud en unidades del viewBox, que
       es la misma escala en que el navegador interpreta el guion. */
    if (typeof path.getTotalLength !== 'function') {
      return;
    }

    var longitud = path.getTotalLength();

    if (!longitud) {
      return;
    }

    path.style.setProperty('--len', longitud);

    /* Con movimiento reducido el hilo se entrega dibujado y no vuelve
       a tocarse: sin listener de scroll y sin trabajo por fotograma. */
    if (prefersReducedMotion.matches) {
      path.style.setProperty('--progress', 1);
      return;
    }

    var enCola = false;

    var contenedor = svg.parentElement;

    function actualizar() {
      /* El avance se mide contra el contenedor del hilo, no contra el
         documento: el pie queda fuera, así que medir el documento
         entero dejaba el trazo sin completar nunca. Se toma el borde
         inferior de la ventana, de modo que el hilo termina cuando el
         contenido termina de pasar por pantalla. */
      var caja = contenedor.getBoundingClientRect();
      var recorrido = caja.height - window.innerHeight;
      var avance = recorrido > 0
        ? Math.min(Math.max(-caja.top / recorrido, 0), 1)
        : 1;

      path.style.setProperty('--progress', avance);
      enCola = false;
    }

    window.addEventListener('scroll', function () {
      if (enCola) {
        return;
      }
      enCola = true;
      window.requestAnimationFrame(actualizar);
    }, { passive: true });

    /* El alto del documento cambia al abrir una pregunta del acordeón
       o al enviar el formulario, así que el avance se recalcula. */
    window.addEventListener('resize', function () {
      if (enCola) {
        return;
      }
      enCola = true;
      window.requestAnimationFrame(actualizar);
    }, { passive: true });

    actualizar();
  }

  /* ──────────────────────────────────────────────────────────
     Entrada de la fotografía del hero

     El resto del hero entra con animaciones CSS puras y retardos
     fijos, porque su contenido ya está en el HTML. La fotografía no:
     es un archivo que tarda en llegar.

     Medido en local, el archivo terminaba de descargarse a los 897 ms
     y su animación de opacidad acababa a los 900 ms. Es decir, la
     animación se gastaba entera sobre un elemento todavía sin píxeles
     y la imagen se pintaba de golpe justo al final. En una red real la
     diferencia es mayor.

     Aquí la entrada espera a DOS condiciones a la vez:

       1. Que la imagen haya cargado de verdad.
       2. Que haya pasado el retardo secuencial, para que la escena se
          revele detrás del texto y no a la vez.

     Cada condición cubre un escenario distinto. En la primera visita
     manda la carga, que es lo lento. Con la imagen ya en caché manda
     el retardo, que es lo que conserva la secuencia.
     ────────────────────────────────────────────────────────── */

  var RETARDO_IMAGEN_HERO = 420;

  function initHeroMedia() {
    var media = document.querySelector('.hero__media');

    if (!media) {
      return;
    }

    var imagen = media.querySelector('img');

    /* Con movimiento reducido no se oculta nada: la imagen se queda
       como está, visible desde el primer fotograma. */
    if (!imagen || prefersReducedMotion.matches) {
      return;
    }

    media.classList.add('is-media-pending');

    var pendientes = 2;

    function condicionCumplida() {
      pendientes -= 1;

      if (pendientes > 0) {
        return;
      }

      media.classList.remove('is-media-pending');
      media.classList.add('is-media-ready');
    }

    /* `complete` cubre el caso de la imagen ya cacheada, en el que el
       evento `load` puede haberse disparado antes de llegar aquí. */
    if (imagen.complete && imagen.naturalWidth > 0) {
      condicionCumplida();
    } else {
      imagen.addEventListener('load', condicionCumplida, { once: true });
      /* Si la imagen falla, se revela igual: mejor un hueco visible
         que un hero atascado esperando un archivo que no va a llegar. */
      imagen.addEventListener('error', condicionCumplida, { once: true });
    }

    window.setTimeout(condicionCumplida, RETARDO_IMAGEN_HERO);
  }

  /* ──────────────────────────────────────────────────────────
     Entrada por scroll

     El contenido nace visible en el CSS. Aquí se le añade la clase
     que lo oculta y solo entonces se observa, de modo que un fallo
     del script no deja media página en blanco.
     ────────────────────────────────────────────────────────── */

  var RETARDO_ESCALONADO = 70;

  function initReveal() {
    /* Sin soporte o con movimiento reducido no se toca nada: el CSS
       ya deja el contenido visible, que es el estado por defecto. */
    if (!('IntersectionObserver' in window) || prefersReducedMotion.matches) {
      return;
    }

    /* Un solo observer para toda la página en lugar de uno por grupo:
       el navegador agrupa los cálculos de intersección y no hay que
       gestionar la desconexión de una decena de instancias. */
    var observer = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (!entrada.isIntersecting) {
          return;
        }

        mostrar(entrada.target);

        /* Una sola vez: reaparecer en cada scroll marea y llama la
           atención sobre el efecto en lugar de sobre el contenido. */
        observer.unobserve(entrada.target);
      });
    }, {
      threshold: 0.1,
      /* Dispara un poco antes de que el borde inferior lo alcance, para
         que el elemento termine de entrar ya animándose y no se vea
         "saltar" cuando el scroll es rápido. */
      rootMargin: '0px 0px -8% 0px'
    });

    function ocultar(el, indice) {
      el.classList.add('is-reveal-hidden');
      el.style.setProperty('--reveal-delay', (indice * RETARDO_ESCALONADO) + 'ms');
    }

    function mostrar(el) {
      var objetivos = el.hasAttribute('data-reveal') ? el.children : [el];

      Array.prototype.forEach.call(objetivos, function (objetivo) {
        objetivo.classList.remove('is-reveal-hidden');
        objetivo.classList.add('is-reveal-visible');
      });
    }

    /* Grupos: los hijos entran en cascada, no en bloque. */
    Array.prototype.forEach.call(
      document.querySelectorAll('[data-reveal]'),
      function (grupo) {
        Array.prototype.forEach.call(grupo.children, ocultar);
        observer.observe(grupo);
      }
    );

    /* Elementos sueltos: entran solos, sin escalonado. */
    Array.prototype.forEach.call(
      document.querySelectorAll('[data-reveal-item]'),
      function (el) {
        ocultar(el, 0);
        observer.observe(el);
      }
    );
  }

  /* ──────────────────────────────────────────────────────────
     Contador de las métricas

     Anima solo el span marcado con aria-hidden. El valor real vive
     en un span oculto a la vista pero presente en el árbol de
     accesibilidad, así que un lector de pantalla nunca lee una
     cifra a medio contar.

     Los números se formatean en convención española (punto para los
     miles, coma para los decimales), leyendo el formato del propio
     texto en lugar de codificarlo aquí.
     ────────────────────────────────────────────────────────── */

  var DURACION_CONTADOR = 1200;

  function initCounters() {
    var contadores = document.querySelectorAll('[data-counter]');

    if (!contadores.length ||
        !('IntersectionObserver' in window) ||
        prefersReducedMotion.matches) {
      return;
    }

    function analizar(texto) {
      var partes = texto.match(/^(\D*)([\d.,]+)(\D*)$/);

      if (!partes) {
        return null;
      }

      var crudo = partes[2];
      var decimales = crudo.indexOf(',') !== -1
        ? crudo.length - crudo.indexOf(',') - 1
        : 0;

      return {
        prefijo: partes[1],
        sufijo: partes[3],
        decimales: decimales,
        valor: parseFloat(crudo.replace(/\./g, '').replace(',', '.'))
      };
    }

    function animar(el, dato) {
      var inicio = null;

      function paso(ahora) {
        if (inicio === null) {
          inicio = ahora;
        }

        var avance = Math.min((ahora - inicio) / DURACION_CONTADOR, 1);
        /* Desaceleración: los últimos números se leen mejor lentos. */
        var suavizado = 1 - Math.pow(1 - avance, 3);
        var actual = dato.valor * suavizado;

        el.textContent = dato.prefijo + actual.toLocaleString('es-ES', {
          minimumFractionDigits: dato.decimales,
          maximumFractionDigits: dato.decimales
        }) + dato.sufijo;

        if (avance < 1) {
          window.requestAnimationFrame(paso);
        }
      }

      window.requestAnimationFrame(paso);
    }

    var observer = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (!entrada.isIntersecting) {
          return;
        }

        var el = entrada.target;
        var dato = analizar(el.textContent.trim());

        /* Una sola vez: repetir el conteo en cada scroll distrae. */
        observer.unobserve(el);

        if (dato) {
          animar(el, dato);
        }
      });
    }, { threshold: 0.6 });

    Array.prototype.forEach.call(contadores, function (el) {
      observer.observe(el);
    });
  }

  /* ──────────────────────────────────────────────────────────
     Tarjetas de plan en pantalla táctil

     En escritorio el halo lo resuelve `:hover` en CSS. En una
     pantalla táctil no hay hover: el dedo toca y se va. Aquí el toque
     se traduce a la clase `is-active`, que activa exactamente el
     mismo estado visual.

     Se filtra por `pointerType`: si el evento viene de un ratón no se
     hace nada, porque el CSS ya lo cubre y añadir la clase dejaría la
     tarjeta encendida después de apartar el cursor.
     ────────────────────────────────────────────────────────── */

  function initPlanCards() {
    var tarjetas = document.querySelectorAll('.plan-card');

    if (!tarjetas.length || !window.PointerEvent) {
      return;
    }

    function activar(tarjeta) {
      Array.prototype.forEach.call(tarjetas, function (otra) {
        otra.classList.toggle('is-active', otra === tarjeta);
      });
    }

    /* Un único listener en el documento: sirve para encender la
       tarjeta tocada y, con el mismo evento, apagar todas cuando el
       toque cae fuera. */
    document.addEventListener('pointerdown', function (event) {
      if (event.pointerType === 'mouse') {
        return;
      }

      activar(event.target.closest('.plan-card'));
    });
  }

  /* ────────────────────────────────────────────────────────── */

  function init() {
    initHeaderScrollState();
    initMobileNav();
    initSectionNavigation();
    initFaqAccordion();
    initContactForm();
    initHeroMedia();
    initFiberThread();
    initReveal();
    initCounters();
    initPlanCards();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
