function Mover(div)
{
	debugger;
	$(div).offset({ left: $(div).offset().left + 50})
	
	/*if ((div).offset().left == 100) 
	{
		$("#tela").append("<div class='snake' id ='teste"+bunda+"' </div>" )
		$("#teste"+bunda).offset({ left: $(div).offset().left });
		bunda += 1;	
	}*/
}

function MoverBaixo(div)
{
	$(div).offset({ top: $(div).offset().top + 50})
	if($(div).offset().top > 583)
	{
		$(div).offset({ top: 83 });
	}
}

function MoverDireita(div)
{
	$(div).offset({ left: $(div).offset().left + 50})
	if($(div).offset().left > 1008)
	{
		$(div).offset({ left: 258 });
	}
}

function MoverCima(div)
{
	$(div).offset({ top: $(div).offset().top - 50})
	if($(div).offset().top < 83)
	{
		$(div).offset({ top: 583 });
	}
}

function MoverEsquerda(div)
{
	$(div).offset({ left: $(div).offset().left - 50})
	if($(div).offset().left < 258)
	{
		$(div).offset({ left: 1008 });
	}
}

function Automatico(div)
{
	setTimeout(function(){
		Mover(div);
		if($(div).offset().left > 1008){
			$(div).offset({ left: 258 });
		}
		Automatico(div)
	} , 1000)
}

$(document).keydown(function(evt){
	//alert('teste');
    switch (evt.keyCode) 
    {
        case 38:  /*seta para cima */
            MoverCima('#snake')
            break;
        case 40:  /*set para baixo*/
            MoverBaixo('#snake')
            break;
        case 37:  /*set para esquerda*/
            MoverEsquerda('#snake')
            break;
        case 39:  /*seta para direita*/
            //Automatico($('#snake'))
            MoverDireita('#snake')
            break;
    }
})
