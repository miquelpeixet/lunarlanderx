
var y = 10; // altura inicial y0=10%, debe leerse al iniciar si queremos que tenga alturas diferentes dependiendo del dispositivo
var z= 70; 
var alt= 70;
var v = 0;
var g = 1.622;
var a = g;
var dt = 0.016683;
var timer=null;
var timerFuel=null;
var fuel=100;

//al cargar por completo la página...
window.onload = function()
{
	//definición de eventos
	//mostrar menú móvil
    	document.getElementById("showm").onclick = function () {
		document.getElementsByClassName("c")[0].style.display = "block";
    
		stop();
	}
	//ocultar menú móvil
	document.getElementById("hidem").onclick = function () {
		document.getElementsByClassName("c")[0].style.display = "none";
		start();
	}
	//encender/apagar el motor al hacer click en la pantalla
	document.onclick = function () {
 	  if (a==g){
  		motorOn();
 	  } else {
  		motorOff();
 	  }
    }
	//encender/apagar al apretar/soltar una tecla
	document.onkeydown = motorOn;
	document.onkeyup = motorOff;
	
	//Empezar a mover nave
	start();
}

//Definición de funciones
function start()
{
	timer=setInterval(function(){ moverNave(); }, dt*1000);
}

function stop()
{
	clearInterval(timer);
}

function moverNave()
{
	v +=a*dt;
    vel = v.toFixed(2); 
	document.getElementById("velocidad").innerHTML=vel;
	y +=v*dt;
    z -=v*dt; 
    alt = z.toFixed(2); 
	
	document.getElementById("altura").innerHTML= alt; 
	
	//mover hasta que top sea un 70% de la pantalla
	if (y<70){ 
		document.getElementById("nave").style.top = y+"%"; 
	} else {
		 stop(); aterratge();
	}
}
function aterratge()
{
    if (v <= 10)
        {
        //Felicitación por la llegada
        document.getElementById("imgnave").src="img/confeti.gif";
        alert("Enhorabona, has demostrat ser un gran pilot!");
        
        }
    else
    {
    // Sin combustible????
    document.getElementById("imgnave").src="img/explosion.gif";
    alert("Intenta-ho de nou a menor velocitat, t'acabes d'estavellar contra la superfície");
        
    }
}

function motorOn()
{
	a=-g;
	if (timerFuel==null)
	timerFuel=setInterval(function(){ actualizarFuel(); }, 100);
    document.getElementById("imgnave").src="img/naveon.gif";
    
}
function motorOff()
{
	a=g;
	clearInterval(timerFuel);
	timerFuel=null;
    document.getElementById("imgnave").src=("img/naveoff.png");
   
}

function actualizarAltura()
{
	//Aquí hay que cambiar el valor del marcador de Fuel...
	if (fuel>0 && alt>0)
    {
    fuel-=1;
	document.getElementById("fuel").innerHTML=fuel;	
    }
    else
    {
    motorOff()
    document.getElementById("nave").src=null;
    document.onkeydown=null;
    document.onkeyup=null;
    }
}
