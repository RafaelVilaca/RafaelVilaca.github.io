var vertical = new Array ("83", "133", "183", "233", "283", "333", "383", "433", "483", "533", "583");
var horizontal = new Array ("258", "308", "358", "408", "458", "508", "558", "608", "658", "708", "758", "808", "858", "908", "958", "1008");
var count = 1;
var velocidade = 510;
var dDirecao = 39;
var pontosTotal = -20;
var cFrutinha = 10;
var horaCron = ""; 
var minutoCron = 0;
var segundoCron = 0;
var a = 0;
var b = 0;

function AutomaticoDireita()
{	
	a = $("#corpo1").offset().left;
	b = $("#corpo1").offset().top;
	$('#corpo1').offset({ left: $('#corpo1').offset().left + 50});
	if($('#corpo1').offset().left > 1008)
		$('#corpo1').offset({ left: 258})
	Verifica(a, b);	
}

function AutomaticoEsquerda()
{	
	a = $("#corpo1").offset().left;
	b = $("#corpo1").offset().top;
	$('#corpo1').offset({ left: $('#corpo1').offset().left - 50});	
	if($('#corpo1').offset().left < 258)
		$('#corpo1').offset({ left: 1008})
	Verifica(a, b);
}

function AutomaticoCima()
{
	a = $("#corpo1").offset().left;
	b = $("#corpo1").offset().top;
	$('#corpo1').offset({ top: $('#corpo1').offset().top - 50});	
	if($('#corpo1').offset().top < 83)
		$('#corpo1').offset({ top: 583})
	Verifica(a, b);
}

function AutomaticoBaixo()
{	
	a = $("#corpo1").offset().left;
	b = $("#corpo1").offset().top;
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
	velocidade -= 5;
	pontosTotal += 10;
	Pontuacao();
	clearInterval(refreshIntervalId);
}

function Frutinha()
{	
	var x = Math.floor((Math.random() * 16) + 0);
	var y = Math.floor((Math.random() * 11) + 0);
	var nVertical = vertical[y];
	var nHorizontal = horizontal[x];

	for(var cCorpo = count ; cCorpo >= 1 ; cCorpo--)
	{
		if(($('#corpo'+cCorpo).offset().top == nVertical) && ($('#corpo'+cCorpo).offset().left == nHorizontal))
		{
			cCorpo = count;
			x = Math.floor((Math.random() * 16) + 0);
			y = Math.floor((Math.random() * 11) + 0);
			nVertical = vertical[y];
			nHorizontal = horizontal[x];
		}
	}
	$('#frutinha').offset({ top: nVertical, left: nHorizontal});
	
	cFrutinha = 10;
}

function Cronometrando()
{
	segundoCron++;
	if (segundoCron == 60) {
		minutoCron++;
		segundoCron = 0;
	}
	horaCron = " "+minutoCron+":"+segundoCron; 
}

function CronoFrutinha()
{
	cFrutinha--;
	if (cFrutinha < 0) {
		Frutinha();
		cFrutinha = 10;
	} 
}

function Verifica(a, b)
{
	if(($('#corpo1').offset().top == $('#frutinha').offset().top) && ($('#corpo1').offset().left == $('#frutinha').offset().left))
	{
		Crescer(a, b);
		Frutinha();
	} 
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
			alert('Vc Morreu!\nPontuação: ' + pontosTotal);
			Reload();
		}

		if (pontosTotal == 1000) 
		{
			alert('Incriveis 1000 Pontos\nParabéns!!!!\nVc Venceu!');
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
	a = $("#corpo1").offset().left;
	b = $("#corpo1").offset().top;
	$('#corpo1').offset({ left: $('#corpo1').offset().left + 50});
	Crescer(a, b);
	$('#corpo1').offset({ left: $('#corpo1').offset().left + 50});
	$('#corpo2').offset({ left: $('#corpo2').offset().left + 50});
	Crescer(a, b);
	Pontuacao();
	Cronometro();
	CFrutinha();
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
	clearInterval(refreshIntervalId);
	refreshIntervalId = setInterval(function(){		
		MoverAutomaticamente(dDirecao);
	}, velocidade);		
}

$(document).keydown(function(evt)
{	
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

function Pontuacao()
{
	document.getElementById('pontos').innerHTML = pontosTotal;
}

function Cronometro()
{
	document.getElementById('cronometro').innerHTML = horaCron;
}

function CFrutinha()
{
	document.getElementById('cronoFrutinha').innerHTML = cFrutinha;
}

var refreshIntervalId = setInterval(function(){		
	MoverAutomaticamente(dDirecao);
}, velocidade);

setInterval( function(){		
	Cronometrando();
	CronoFrutinha();
	Cronometro();
	CFrutinha();
}, 1000 );