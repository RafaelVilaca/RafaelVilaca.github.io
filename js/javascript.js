var vertical = new Array ("83", "133", "183", "233", "283", "333", "383", "433", "483", "533", "583");
var horizontal = new Array ("258", "308", "358", "408", "458", "508", "558", "608", "658", "708", "758", "808", "858", "908", "958", "1008");
var count = 1;
var velocidade = 570;
var dDirecao = 39;
var pontosTotal = -20;
var inicio = 0; var horaInicio = 0; var minutoInicio = 0; var segundoInicio = 0;

var atual = 0; var horaAtual = 0; var minutoAtual = 0; var segundoAtual = 0;

var horaCron = 0; var minutoCron = 0; var segundoCron = 0;

function AutomaticoDireita()
{	
	//debugger;
	var a = $("#corpo1").offset().left;
	var b = $("#corpo1").offset().top;
	$('#corpo1').offset({ left: $('#corpo1').offset().left + 50});
	if($('#corpo1').offset().left > 1008)
		$('#corpo1').offset({ left: 258})
	Verifica(a, b);	
}

function AutomaticoEsquerda()
{	
	var a = $("#corpo1").offset().left;
	var b = $("#corpo1").offset().top;
	$('#corpo1').offset({ left: $('#corpo1').offset().left - 50});	
	if($('#corpo1').offset().left < 258)
		$('#corpo1').offset({ left: 1008})
	Verifica(a, b);
}

function AutomaticoCima()
{
	var a = $("#corpo1").offset().left;
	var b = $("#corpo1").offset().top;
	$('#corpo1').offset({ top: $('#corpo1').offset().top - 50});	
	if($('#corpo1').offset().top < 83)
		$('#corpo1').offset({ top: 583})
	Verifica(a, b);
}

function AutomaticoBaixo()
{	
	var a = $("#corpo1").offset().left;
	var b = $("#corpo1").offset().top;
	$('#corpo1').offset({ top: $('#corpo1').offset().top + 50});	
	if($('#corpo1').offset().top > 583)
		$('#corpo1').offset({ top: 83})
	Verifica(a, b);
}

function Crescer(a, b)
{	
	count++;
	$("#tela").append($("<div id='corpo"+count+"' class='corpo1'></div>"));
	$('#corpo'+count).offset({ top: b, left: a })	
	velocidade -= 10;
	pontosTotal += 10;
	Pontuacao();
}

function Frutinha()
{	
	//debugger;
	var x = Math.floor((Math.random() * 16) + 0);
	var y = Math.floor((Math.random() * 11) + 0);
	var nVertical = vertical[y];
	var nHorizontal = horizontal[x];
	
	$('#frutinha').offset({ top: nVertical});
	$('#frutinha').offset({ left: nHorizontal});
	var validador = count;
	for(var cCorpo = count ; cCorpo > 1 ; cCorpo--)
	{
		if(($('#corpo'+cCorpo).offset().top == nVertical) && ($('#corpo'+cCorpo).offset().left == nHorizontal))
		{
			x = Math.floor((Math.random() * 16) + 0);
			y = Math.floor((Math.random() * 11) + 0);
			nVertical = vertical[y];
			nHorizontal = horizontal[x];
			$('#frutinha').offset({ top: nVertical});
			$('#frutinha').offset({ left: nHorizontal});
		}
	}
}

function HoraAtual()
{
	atual = new Date();
	horaAtual = atual.getHours();
	minutoAtual = atual.getMinutes();
	segundoAtual = atual.getSeconds();

} 

function Cronometro()
{
	HoraAtual();

	horaCron = horaInicio - horaAtual;
	minutoCron = minutoInicio - minutoAtual;
	segundoCron = segundoInicio - segundoAtual;

	document.getElementById('cronometro').innerHTML = (horaCron + ":" + minutoCron + ":" + segundoCron);

	setInterval("Cronometro()", 1000);
}

function Inicio() 
{
	inicio = new Date();
	horaInicio = inicio.getHours();
	minutoInicio = inicio.getMinutes();
	segundoInicio = inicio.getSeconds();
}

function Verifica(a, b)
{
	//debugger;
	if(($('#corpo1').offset().top == $('#frutinha').offset().top) && ($('#corpo1').offset().left == $('#frutinha').offset().left))
	{
		Crescer(a, b);
		Frutinha();
	} 
	//debugger;
	for ( var cCorpo = count ; cCorpo > 1 ; cCorpo--)
	{
		if(cCorpo == 2)
		{
			$("#corpo"+cCorpo).offset({ top: b });
			$("#corpo"+cCorpo).offset({ left: a });
		}
		else
		{
			$("#corpo"+cCorpo).offset({ top: $("#corpo" + (cCorpo - 1)).offset().top });
			$("#corpo"+cCorpo).offset({ left: $("#corpo" + (cCorpo - 1)).offset().left });
		}

		if(($('#corpo1').offset().top == $('#corpo'+cCorpo).offset().top) && ($('#corpo1').offset().left == $('#corpo'+cCorpo).offset().left))
		{
			alert('Vc Morreu!');
			//InicioJogo();
			Reload();
		}

		if (pontosTotal == 1000) 
		{
			alert('Parabéns!!!!\nVc Venceu!');
			//InicioJogo();
			Reload();
		}
	}
}

function Reload()
{
	location.reload();
}

function InicioJogo()
{	
	var a = $("#corpo1").offset().left;
	var b = $("#corpo1").offset().top;
	$('#corpo1').offset({ left: $('#corpo1').offset().left + 50});
	Crescer(a, b);
	$('#corpo1').offset({ left: $('#corpo1').offset().left + 50});
	$('#corpo2').offset({ left: $('#corpo2').offset().left + 50});
	Crescer(a, b);
	Pontuacao();
	Cronometro();
}

function MoverAutomaticamente(numeroDirecao)
{  		
	switch (numeroDirecao) 
	{		
		case 40:  /*seta para Baixo */
		AutomaticoBaixo();
		break;
		case 37:  /*set para esquerda*/
		AutomaticoEsquerda();
		break;
		case 39:  /*seta para direita*/
		AutomaticoDireita();
		break;
		case 38:  /*seta para cima */
		AutomaticoCima();
		break;	
	}	
	//dDirecao = numeroDirecao;
}

function Pontuacao()
{
	document.getElementById('pontos').innerHTML = pontosTotal;
}

$(document).keydown(function(evt)
{	
	debugger;
	if(dDirecao == 37)
	{
		if(evt.keyCode != 39)
		{
			MoverAutomaticamente(evt.keyCode);			
			dDirecao = evt.keyCode;	
		}
	}

	else if(dDirecao == 38)
	{
		if(evt.keyCode != 40)
		{
			MoverAutomaticamente(evt.keyCode);		
			dDirecao = evt.keyCode;
		}
	}

	else if(dDirecao == 39)
	{
		if(evt.keyCode != 37)
		{
			MoverAutomaticamente(evt.keyCode);		
			dDirecao = evt.keyCode;
		}
	}

	else if(dDirecao == 40)
	{
		if(evt.keyCode != 38){
			MoverAutomaticamente(evt.keyCode);	
			dDirecao = evt.keyCode;
		}
	}
	else
		dDirecao = 39;
})

setInterval( function(){		
	MoverAutomaticamente(dDirecao);
}, velocidade );