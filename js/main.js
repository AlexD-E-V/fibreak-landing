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

      trigger.addEventListener('click', function () {
        var abierto = trigger.getAttribute('aria-expanded') === 'true';
        trigger.setAttribute('aria-expanded', String(!abierto));
        panel.hidden = abierto;
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

  var DEMORA_ENVIO = 900;

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
    var textoBotonOriginal = boton ? boton.textContent.trim() : '';

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

    function mostrarExito() {
      if (!exito) {
        return;
      }
      exito.hidden = false;
      exito.focus();
    }

    function ocultarExito() {
      if (exito && !exito.hidden) {
        exito.hidden = true;
      }
    }

    /* Si el usuario vuelve a escribir, el mensaje de éxito ya no
       corresponde a lo que tiene delante. */
    form.addEventListener('input', ocultarExito);

    form.addEventListener('submit', function (event) {
      /* Lo primero: sin esto la página se recarga y se pierde todo. */
      event.preventDefault();

      ocultarExito();

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
         estado `disabled` del botón exista por un motivo real y no
         solo para cumplir la lista de requisitos. */
      if (boton) {
        boton.disabled = true;
        boton.textContent = 'Enviando…';
      }

      window.setTimeout(function () {
        if (boton) {
          boton.disabled = false;
          boton.textContent = textoBotonOriginal;
        }

        form.reset();
        limpiarErrores();
        mostrarExito();
      }, DEMORA_ENVIO);
    });
  }

  /* ────────────────────────────────────────────────────────── */

  function init() {
    initHeaderScrollState();
    initMobileNav();
    initSectionNavigation();
    initFaqAccordion();
    initContactForm();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
