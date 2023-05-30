function cambiarEstilo1() {
	document.getElementById("cambiar-me").style.backgroundColor = "#ffcccc";
	document.getElementById("cambiar-me").style.color = "#cc0000";
	document.getElementById("cambiar-otro").style.backgroundColor = "#ffcccc";
	document.getElementById("cambiar-otro").style.color = "#cc0000";
}

function cambiarEstilo2() {
	document.getElementById("cambiar-me").style.backgroundColor = "#ccffcc";
	document.getElementById("cambiar-me").style.color = "#006600";
	document.getElementById("cambiar-otro").style.backgroundColor = "#ccffcc";
	document.getElementById("cambiar-otro").style.color = "#006600";
}

function cambiarEstilo3() {
	document.getElementById("cambiar-me").style.backgroundColor = "#ccccff";
	document.getElementById("cambiar-me").style.color = "#0000cc";
	document.getElementById("cambiar-otro").style.backgroundColor = "#ccccff";
	document.getElementById("cambiar-otro").style.color = "#0000cc";
}
function cambiarFuente() {
	var elementos = document.getElementsByTagName("*");
	for (var i = 0; i < elementos.length; i++) {
	  var elemento = elementos[i];
	  var estilo = window.getComputedStyle(elemento);
	  var fontSize = parseFloat(estilo.fontSize);
	  elemento.style.fontSize = (fontSize + 1) + 'px';
	}
  }
