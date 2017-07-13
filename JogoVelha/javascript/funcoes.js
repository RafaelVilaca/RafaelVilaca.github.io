var letra = "X", sit = 0, pontos1 = 0, pontos2 = 0;

function verifica(){
  var rankX = document.getElementById('ranX').innerHTML;
  var rankO = document.getElementById('ranO').innerHTML;
//debugger;
  if (!rankX){
    window.localStorage.setItem('rankX', 0);
    rankingX();
  }
  if (!rankO){
    window.localStorage.setItem('rankO', 0);
    rankingO();
  }
}

function joga(id){
  if (sit == 0){
    celulaclicada = document.getElementById(id).innerHTML;
   if (celulaclicada == "X" || celulaclicada == "O"){
      alert("Opa, este quadrado já foi escolhido!");
   } else {
      document.getElementById(id).innerHTML = letra;
    if (letra == "X"){
      letra = "O";
    } else {
      letra = "X";
    }
  }
 }
}

function novo(){
  /*document.getElementById('casa1').innerHTML = ''; */
  for (var i = 0; i < 9; i++) {
  	document.getElementsByClassName("casas")[i].innerHTML = '';
  }
  sit = 0;  
}

function verif()
{
  //debugger;
  if (sit == 0)
  {
     c11 = document.getElementById('casa1').innerHTML; 
     c12 = document.getElementById('casa2').innerHTML; 
     c13 = document.getElementById('casa3').innerHTML; 
     c21 = document.getElementById('casa4').innerHTML; 
     c22 = document.getElementById('casa5').innerHTML; 
     c23 = document.getElementById('casa6').innerHTML;
     c31 = document.getElementById('casa7').innerHTML; 
     c32 = document.getElementById('casa8').innerHTML; 
     c33 = document.getElementById('casa9').innerHTML;

   if (((c11 == c12) && (c12 == c13) && (c12 != "")) || ((c11 == c22) && (c22 == c33) && (c22 != "")) || 
     	 ((c11 == c21) && (c21 == c31) && (c21 != "")) || ((c21 == c22) && (c22 == c23) && (c22 != "")) || 
     	 ((c31 == c32) && (c32 == c33) && (c32 != "")) || ((c12 == c22) && (c22 == c32) && (c22 != "")) || 
     	 ((c13 == c23) && (c23 == c33) && (c23 != "")) || ((c31 == c22) && (c22 == c13) && (c22 != "")))
   { 
     if (((c11 == c12) && (c12 == c13) && (c13 == "X")) || ((c21 == c22) && (c22 == c23) && (c23 == "X")) || ((c31 == c32) && (c32 == c33) && (c33 == "X")) ||
         ((c11 == c21) && (c21 == c31) && (c31 == "X")) || ((c12 == c22) && (c22 == c32) && (c32 == "X")) || ((c13 == c23) && (c23 == c33) && (c33 == "X")) ||
         ((c11 == c22) && (c22 == c33) && (c33 == "X")) || ((c31 == c22) && (c22 == c13) && (c13 == "X")))
      {   
          alert('Parabéns Player "X", você ganhou!!!');
    	    pontos1 = pontos1 + 1;
          rankX = window.localStorage.getItem('rankX');
          rankX = parseInt(rankX) + 1;
          window.localStorage.setItem('rankX', rankX);
     	    //novo();
          sit = 1;
          rankX = window.localStorage.getItem('rankX');
          document.getElementById('ranX').innerHTML = rankX;
     	    pnt1();
     } else {     
     	  alert('Parabéns Player "O", você ganhou!!!');
     	  pontos2 = pontos2 + 1;
        rankO = window.localStorage.getItem('rankO');
        rankO = parseInt(rankO) + 1;
        window.localStorage.setItem('rankO', rankO);
        sit = 1;
     	  rankO = window.localStorage.getItem('rankO');
        document.getElementById('ranO').innerHTML = rankO;
        pnt2();
      }
    }
    if ((c11 != '') && (c12 != '') && (c13 != '') &&
        (c21 != '') && (c22 != '') && (c23 != '') &&
        (c31 != '') && (c32 != '') && (c33 != '') && (sit == 0))
    {
         alert("Partida Empatada, comece outra!");
        sit = 1;
    }
  }
}

function pnt1(){ document.getElementById('pt1').innerHTML = pontos1; }
function pnt2(){ document.getElementById('pt2').innerHTML = pontos2; }

//LOCAL STORAGE
function rankingX(){ 
  //debugger;
  rankX = window.localStorage.getItem('rankX');
  document.getElementById('ranX').innerHTML = rankX;
}

function rankingO(){
  //debugger;
  rankO = window.localStorage.getItem('rankO');
  document.getElementById('ranO').innerHTML = rankO;
}