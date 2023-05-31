// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } 
from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js';
import {getDatabase, ref, onValue, update, push,child}
from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-HLV9jSJLlJ33WgE0yl77hw8R1ewSYH4",
  authDomain: "fir-cristian-chamo.firebaseapp.com",
  projectId: "fir-cristian-chamo",
  storageBucket: "fir-cristian-chamo.appspot.com",
  messagingSenderId: "785547442879",
  appId: "1:785547442879:web:e37b46c827fab7d48fa40a",
  measurementId: "G-FHG0KCL387"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Aca inicia mi programa
var usuarioConectado = document.getElementById('usuarioConectado');
var botonIniciar = document.getElementById('botonIniciar');
var botonCerrar = document.getElementById('botonCerrar');
var textoMensajes = document.getElementById('textoMensajes');
var MensajesChat = document.getElementById('MensajesChat');
var nombreUsuarioConectado = "";

document.getElementById('botonIniciar').onclick = async function() {
  //Obtenemos la logica de autentificacion
  var auth = getAuth();
  //Creamos el proveedor en este caso es Google
  var provider = new GoogleAuthProvider();
  auth.languageCode = "es";
  var response = await signInWithPopup(auth, provider);
  usuarioConectado.innerText = response.user.email;
  botonCerrar.style.display = "block";
  botonIniciar.style.display = "none";
  nombreUsuarioConectado = response.user.email;
  escucharYDibujarMensajes()
}

botonCerrar.onclick = async function(){
    var auth = getAuth();
    await  auth.signOut();
    botonCerrar.style.display = "none";
    botonIniciar.style.display = "block";
    usuarioConectado.innerText = "No conectado";
    nombreUsuarioConectado= "";
}

textoMensajes.onkeydown = async function(event){
    if (event.key == "Enter"){
      if (nombreUsuarioConectado == ""){
        alert("El usuario debe iniciar sesion");
        return;
      }
        var db = getDatabase();
        var referenciaMensajes = ref(db, "Mensajes");
        var nuevaLlave = push( child(ref(db), "Mensajes")).key;
        var nuevosDatos ={
          [nuevaLlave]: {
            usuario: nombreUsuarioConectado,
            Mensajes: textoMensajes.value,
            fecha: new Date().toLocaleDateString()
          }
        }
        textoMensajes.value = ""
        update(referenciaMensajes, nuevosDatos) 
    }
}

function escucharYDibujarMensajes (){
  var db = getDatabase();
  var referenciaMensajes = ref(db, "Mensajes");
  onValue (referenciaMensajes, function(datos){
        var valoresObtenidos = datos.val();
       // console.log(valoresObtenidos)
        MensajesChat.innerHTML = "";
        Object.keys(valoresObtenidos).forEach(Llave=>{
          var MensajesDescargados = valoresObtenidos[Llave];
          var Mensajes = "";
          Mensajes = "<div class='nombre-Usuario'>"+ MensajesDescargados.usuario+"</div>";
          Mensajes += "<div class='mensajesChat'>" + MensajesDescargados.Mensajes+"<div>";
          Mensajes += "<div>" + MensajesDescargados.fecha + "</div><hr>";
          MensajesChat.innerHTML += Mensajes;

   
    })
  })

  }
  
