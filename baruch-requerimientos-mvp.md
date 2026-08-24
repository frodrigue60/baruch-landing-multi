# Requerimientos del Sitio Web — Baruch (MVP Informativo)

Documento agnóstico de tecnología. Describe qué debe hacer el sitio (requerimientos funcionales) y qué cualidades debe tener (requerimientos no funcionales), junto con las páginas necesarias para cubrir el MVP.

> **Alcance técnico del MVP:** el contenido del sitio se gestiona mediante **archivos estáticos** (p. ej. JSON, Markdown, YAML e imágenes en el repositorio). El **formulario de cotización/contacto se implementa como placeholder visual** (sin envío ni procesamiento de datos). En una fase posterior se integrará un **CMS** y la funcionalidad completa del formulario.

---

## 1. Páginas del sitio (estructura mínima viable)

| # | Página | Propósito |
|---|---|---|
| 1 | **Inicio (Home)** | Primera impresión: propuesta de valor, resumen de experiencias/servicios, llamado a la acción hacia cotización/contacto |
| 2 | **Nosotros / Quiénes somos** | Historia, misión, valores del negocio, equipo (si aplica), enfoque en ecoturismo y wellness |
| 3 | **Experiencias / Servicios** | Listado general de tipo de paquetes/tours/retiros que se ofrecen (sin necesidad de precios cerrados en el MVP) |
| 4 | **Detalle de experiencia** *(opcional en MVP, recomendable)* | Página individual por experiencia/paquete con descripción ampliada y galería propia |
| 5 | **Galería** | Fotos (y video si aplica) representativas del destino, instalaciones y experiencias |
| 6 | **Cotizar / Solicitar información** | Placeholder del formulario de cotización (interfaz visual sin envío activo); canales alternativos visibles (WhatsApp, correo, teléfono) |
| 7 | **Contacto** | Datos de contacto, ubicación, WhatsApp, redes sociales, mapa (si aplica) |
| 8 | **Aviso de privacidad / Términos** *(recomendado)* | Política de manejo de datos personales (preparada para cuando el formulario esté activo) |

> Nota: "Cotizar" y "Contacto" pueden combinarse en una sola página si el negocio lo prefiere, pero se recomienda mantenerlos separados para diferenciar intención comercial (quiere comprar) de intención informativa (quiere preguntar algo).

> Nota MVP: mientras el formulario sea placeholder, **WhatsApp, correo y teléfono** son los canales operativos de contacto y cotización.

---

## 2. Requerimientos Funcionales

### 2.1 Navegación y estructura
- RF-01: El sitio debe contar con un menú de navegación accesible desde todas las páginas.
- RF-02: El menú debe permitir acceso directo a todas las páginas listadas en la sección 1.
- RF-03: El sitio debe contar con un pie de página (footer) con enlaces de contacto, redes sociales y aviso de privacidad.

### 2.2 Idioma
- RF-04: El sitio debe estar disponible en español e inglés.
- RF-05: El visitante debe poder cambiar de idioma desde cualquier página, sin perder el contexto de navegación (permanecer en la misma sección al cambiar de idioma).

### 2.3 Página de Inicio
- RF-06: Debe mostrar una sección principal (hero) con mensaje de valor claro y llamado a la acción.
- RF-07: Debe presentar un resumen visual de las experiencias/servicios ofrecidos, con enlace a la página de detalle correspondiente.
- RF-08: Debe incluir un llamado a la acción visible hacia la página de cotización/contacto o hacia canales directos (WhatsApp).

### 2.4 Experiencias / Servicios
- RF-09: Debe listar las experiencias/servicios disponibles con imagen, título y descripción breve.
- RF-10: Cada experiencia listada debe permitir acceder a más detalle (página propia o expansión en la misma vista).
- RF-11: El contenido de experiencias debe definirse en **archivos estáticos** estructurados (p. ej. JSON o Markdown por experiencia), de forma que agregar, editar o quitar entradas no requiera modificar la lógica de presentación del sitio.

### 2.5 Galería
- RF-12: Debe mostrar un conjunto de imágenes organizadas (por categoría o experiencia, si aplica).
- RF-13: Las imágenes deben poder ampliarse o visualizarse en mayor tamaño al interactuar con ellas.

### 2.6 Formulario de Cotización / Solicitud de información *(placeholder en MVP)*

> En el MVP el formulario es **solo visual**: muestra la interfaz prevista pero **no envía ni almacena datos**. Los requerimientos de envío (RF-16 a RF-18) quedan documentados para la fase posterior.

- RF-14: Debe mostrar la interfaz del formulario con los campos previstos: nombre, correo electrónico, teléfono, experiencia de interés (si aplica) y mensaje/comentarios.
- RF-15: Debe indicar claramente al usuario que el envío en línea **no está disponible aún** (mensaje, aviso o estado deshabilitado del botón de envío), y ofrecer alternativas inmediatas de contacto (WhatsApp, correo, teléfono).
- RF-16: *(Fase posterior, no MVP)* Al enviarse, debe notificar automáticamente al negocio (correo u otro canal definido).
- RF-17: *(Fase posterior, no MVP)* Debe mostrar al usuario una confirmación clara de que su solicitud fue enviada correctamente.
- RF-18: *(Fase posterior, deseable)* Debe distinguir el tipo de solicitante (individual, grupo, universidad, empresa) para futura priorización comercial.

### 2.7 Contacto y canales directos
- RF-19: Debe mostrar información de contacto directo (teléfono, correo, ubicación).
- RF-20: Debe incluir un enlace directo a WhatsApp que abra una conversación con el negocio.
- RF-21: Debe incluir enlaces a redes sociales del negocio, si existen.

### 2.8 Gestión de contenido *(archivos estáticos en MVP)*

> En el MVP todo el contenido editable vive en **archivos estáticos** dentro del proyecto (textos en JSON/Markdown/YAML, imágenes en carpeta de assets). La migración a **CMS** (p. ej. Sanity, Payload u otro) está prevista en una fase posterior sin rediseñar el sitio.

- RF-22: Los textos e imágenes del sitio deben residir en archivos estáticos **separados del código de presentación** (componentes, layouts, estilos), de modo que actualizar contenido no implique reescribir la interfaz.
- RF-23: El sitio debe permitir el reemplazo de imágenes de muestra (placeholder) por fotografía real del negocio conforme esté disponible, actualizando únicamente los archivos estáticos correspondientes.
- RF-26: La estructura de los archivos de contenido debe ser **compatible con una futura migración a CMS** (schemas/colecciones equivalentes: experiencias, páginas, galería, ajustes de contacto).

### 2.9 Preparación a futuro (no funcional en el MVP, pero condiciona el diseño)
- RF-24: La estructura de contenido de "Experiencias" debe diseñarse de forma que pueda evolucionar hacia un catálogo con precios, disponibilidad y reservación, sin requerir rediseño completo del sitio.
- RF-25: El formulario de cotización (hoy placeholder) debe poder evolucionar hacia un flujo de reservación y pago sin perder los datos/flujo ya capturado por el usuario.
- RF-27: La capa de acceso a contenido debe abstraerse de la fuente (archivos estáticos hoy, CMS mañana), de forma que cambiar el origen de datos no requiera reescribir las páginas.

---

## 3. Requerimientos No Funcionales

### 3.1 Usabilidad
- RNF-01: El sitio debe ser utilizable sin necesidad de instrucciones, con navegación intuitiva.
- RNF-02: Los llamados a la acción (cotizar, contactar, WhatsApp) deben ser visualmente identificables en cada página.
- RNF-03: El contenido debe ser legible y estar correctamente jerarquizado (títulos, subtítulos, texto de apoyo).

### 3.2 Diseño responsivo
- RNF-04: El sitio debe visualizarse y funcionar correctamente en dispositivos móviles, tablets y escritorio.
- RNF-05: Las imágenes y galerías deben adaptarse correctamente a distintos tamaños de pantalla sin romper el diseño.

### 3.3 Rendimiento
- RNF-06: Las páginas deben cargar en un tiempo razonable incluso con conexión móvil estándar.
- RNF-07: Las imágenes deben estar optimizadas para no afectar negativamente el tiempo de carga.

### 3.4 Accesibilidad
- RNF-08: El sitio debe mantener suficiente contraste de color entre texto y fondo para facilitar la lectura.
- RNF-09: Las imágenes deben incluir texto alternativo descriptivo.
- RNF-10: El placeholder del formulario debe ser operable mediante teclado (navegación entre campos), aunque el envío esté deshabilitado; los campos no deben inducir a error por parecer funcionales sin indicación clara.

### 3.5 SEO y visibilidad
- RNF-11: Cada página debe contar con título y descripción optimizados para buscadores.
- RNF-12: El sitio debe contar con URLs claras y descriptivas.
- RNF-13: El contenido bilingüe debe estar correctamente indexado para ambos idiomas.

### 3.6 Seguridad
- RNF-14: *(Aplica cuando el formulario esté activo)* Los formularios deben contar con validación que prevenga el envío de datos maliciosos o spam automatizado.
- RNF-15: *(Aplica cuando el formulario esté activo)* Los datos personales capturados deben transmitirse de forma segura (conexión cifrada).
- RNF-16: El sitio debe contar con un aviso de privacidad preparado para el manejo futuro de datos personales; en el MVP, al no recopilar datos vía formulario, debe dejarlo explícito si corresponde.

### 3.7 Mantenibilidad
- RNF-17: El contenido del sitio debe poder actualizarse editando archivos estáticos de forma independiente al código o diseño base; la estructura debe facilitar la sustitución posterior por un CMS.
- RNF-18: La estructura del sitio debe permitir agregar nuevas páginas o secciones sin rediseñar las existentes.

### 3.8 Escalabilidad (preparación a futuro)
- RNF-19: La arquitectura de información debe permitir la incorporación futura de un módulo de reservaciones sin necesidad de reestructurar el sitio existente.
- RNF-20: La arquitectura debe permitir la incorporación futura de un módulo de pagos en línea sin comprometer el funcionamiento del sitio informativo.
- RNF-22: Debe ser posible integrar un CMS en fase posterior reutilizando los mismos modelos de contenido definidos en los archivos estáticos del MVP.

### 3.9 Disponibilidad
- RNF-21: El sitio debe estar disponible en línea de forma continua, con tiempo de inactividad mínimo.

---

## 4. Fuera de alcance (explícitamente, para el MVP)

- **CMS** (Sanity, Payload u otro): gestión de contenido vía panel web; previsto para fase posterior.
- **Envío y procesamiento del formulario** de cotización/contacto (notificaciones por correo, confirmación al usuario, anti-spam).
- Motor de reservaciones y disponibilidad.
- Procesamiento de pagos en línea.
- Cuentas de usuario / historial de compras.
- Precios cerrados y catálogo transaccional (venta directa).
- Automatización avanzada de comunicación (ej. respuestas automáticas por WhatsApp).

*Estos puntos se consideran evolución natural del sitio en fases posteriores, una vez validado el modelo de negocio.*

---

## 5. Evolución prevista (post-MVP)

| Fase | Qué se agrega |
|---|---|
| **Fase 2 — CMS** | Panel para editar textos, experiencias e imágenes sin tocar archivos del repositorio; migración desde la estructura estática existente. |
| **Fase 3 — Formulario activo** | Envío real, validación, anti-spam, notificación al negocio y confirmación al usuario. |
| **Fase 4 — Transaccional** | Reservaciones, disponibilidad y pagos en línea (según RF-24, RF-25, RNF-19, RNF-20). |
