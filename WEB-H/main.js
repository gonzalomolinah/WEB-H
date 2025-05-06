
function generarChiste() {
  const tipo = "explicit";
  
  fetch(`https://api.chucknorris.io/jokes/random?category=${tipo}`)
  .then((response) => response.json())
  .then((data) => {
    const textoChiste = data.value;
    console.log(textoChiste);
    chiste.innerHTML = textoChiste;
  })
  .catch((error) => {
    console.error("Error al obtener el chiste:", error);
  });

  // console.log(response);
}

function validarEmail() {
  const emailInput = document.getElementById("input-email").value;
  const apiKey = "4c87c2d271f25731216d41c0a6c947d8";
  const apiUrl = `http://apilayer.net/api/check?access_key=${apiKey}&email=${emailInput}`;
  
  fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    if (data.format_valid) {
      console.log("El email es válido");
      alert("El email es válido");
    }
    else {
      console.log("El email no es válido");
      alert("El email no es válido");
    }

  })
  .catch((error) => {
    console.error("Error al verificar el mail")
  })
}

function agregarMapa() {
  const direccionInput = document.getElementById("input-ubicacion").value;
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(direccionInput)}`;
  fetch(url)
  .then((response) => response.json())
  .then((data) => {
    if (data.length > 0) {
      actualizarMapa(data, direccionInput);
    } else {
      console.error("No se encontró la ubicación");
    }
  })
}

function cambiarFoto() {
  fetch('https://dog.ceo/api/breeds/image/random')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    console.log('Imagen del pato:', data.message);
    document.getElementById('imagen-principal').src = data.message;
  })
  .catch(error => console.error('Error:', error));
}

function traducirDescripcion() {
  const texto = perfil.innerHTML;
  const lenOrigen = "es"; // Español
  const lenIngles = "en"; // Inglés

  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(texto)}&langpair=${lenOrigen}|${lenIngles}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log("Traducción:", data.responseData.translatedText);
      perfil.innerHTML = data.responseData.translatedText;
    })
    .catch(error => {
      console.error("Error al traducir:", error);
    });
}




// ============================================================
//                     NO TOCAR NADA DE AQUÍ HACIA ABAJO
// ============================================================

function generarCV() {
  // Agarra los valores de los inputs y los actualiza en el CV
  const mappings = [
    { input: "input-nombre", output: "nombre" },
    { input: "input-apellido", output: "apellido" },
    { input: "input-titulo", output: "titulo" },
    { input: "input-celular", output: "celular" },
    { input: "input-email", output: "email" },
    { input: "input-ubicacion", output: "ubicacion" },
    { input: "input-perfil", output: "perfil" }
  ];

  mappings.forEach(({ input, output }) => {
    const inputEl = document.getElementById(input);
    const outputEl = document.getElementById(output);

    if (inputEl && outputEl && inputEl.value.trim() !== "") {
      outputEl.textContent = inputEl.value;
    }
  });
}

function actualizarMapa(data, direccion) {
  // Actualiza el mapa con la ubicación proporcionada
  const { lat, lon } = data[0];

  const mapContainer = document.getElementById("contenedor-mapa");
  mapContainer.style.height = "300px";

  if (mapContainer._leaflet_id) {
    mapContainer._leaflet_id = null; // Eliminar referencia al mapa anterior
    mapContainer.innerHTML = ""; // Limpiar el contenedor
  }

  const map = L.map(mapContainer).setView([lat, lon], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);
  L.marker([lat, lon]).addTo(map).bindPopup(direccion).openPopup();
}

// Unir los botones con las funciones correspondientes
document.getElementById("boton-generar-CV").addEventListener("click", generarCV);
document.getElementById("boton-elegir-chiste").addEventListener("click", generarChiste);
document.getElementById("boton-validar-email").addEventListener("click", validarEmail);
document.getElementById("boton-agregar-mapa").addEventListener("click", agregarMapa);
document.getElementById("boton-traducir").addEventListener("click", traducirDescripcion);
document.getElementById("boton-cambiar-foto").addEventListener("click", cambiarFoto);