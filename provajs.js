 p = document.querySelector('p');
    button = document.querySelector('button');
    var matriceold=[
       [2,0,0,-2,0,0,0],
       [1,0,1,0,-1,-1,3],
       [4,4,4,-1,-4,-4,12],
       [0,1,0,0,-2,0,0],
       [0,1,0,0,0,-1,0],
       [0,0,1,0,0,0,2]
       
    ];
    console.log(matriceold);
    var molecole=["HNO3 ","NaOH","H2O","NaNO3"];
    var atomi=["N","Na","Cl","H","O","P","S","C"]
    var numero=100;
    button.onclick = () => {
        p.innerHTML="fatto";
        matriceold=finalControl(matriceold,molecole);
        console.log(matriceold);

    }

//ordina la matrice come una diagonale  
    function ordinamento(matriceold){
    matriceold=matriceold.sort( function (b,a){//ordinamento nell'algoritmo
        var i;
        for(i=0;i<matriceold[0].length;i++){
            if(Math.abs(a[i])-Math.abs(b[i])!==0){
                return (Math.abs(a[i])-Math.abs(b[i]));
            }
        }
        return Math.abs(a[0])-Math.abs(b[0])
    });
    return matriceold;
}


//controlla se è possibile e nel caso la stampa
function GaussAlgoritm(matrice){
    var i;
    var j;
    var k;
    var t=-1;
    var nrighe=matrice.length;
    var ncolonne=matrice[0].length;
   matrice=ordinamento(matrice);
   for(i=0;i<nrighe-1;i++){//la riga i è la riga già sistemata, dovrebbe avere 'i' zeri
        t++;
        console.log(t);
        var count=0;
        for(k=0;k<ncolonne;k++){// t è il coefficente di a(riga,t)/a(i,t). se count<=i allora t=i
            if(matrice[i][k]===0){
                count++
                console.log("count=",count);
                console.log("i=",i);
            }
            if(matrice[i][k]!==0){
                break;
            }
            if(count>t){
                t=t+1;
                console.log(t);
            }
        
        }
       console.log(t);
       for(j=i+1;j<nrighe;j++){//riduce ogni riga sotto la riga i
           matrice[j]=math.subtract(matrice[j],math.dotMultiply(matrice[j][t]/matrice[i][t],matrice[i]));
       }
       matrice=ordinamento(matrice);
       var counter=0;
       for(k=0;k<ncolonne;k++){//conta gli zeri dell'ultima colonna
        if(matrice[nrighe-1][k]===0){
            counter++
        }
        else{
            break;
        }
       }
       if(counter===ncolonne){
           matrice.pop();
           return matrice;
       }
       if(counter===ncolonne-1){
           return -1
       }
       
         
   }
   return matrice;
}

//funzione che determina il numero di molecole
   function numerodeipiù(input){
        var control=/(?<!(\(|\+))\+/g;
        var temp =input.match(control);
        console.log(temp.length);
        var array=[];
        for(temps of temp){
            array.push(temps);
        }
       return array;
       
    }       
// funzione che isola le molecole
function molecoleisoler(input){
    var control=/(((?<=(\(|\+))\+)|[A-Za-z0-9\(\)\s\-\*])+(?=(?<!(\(|\+))\+)/g;
    var temp =input.match(control);
    console.log(temp.length);
    var array=[];
    for(temps of temp){
        array.push(temps);
    }
   return array;
}
 
// funzione che isola l'ultima molecola da finire
 function ultimatemolecolarisoler(input){
    var control= /(?<=(?<!(\(|\+))\+)(((?<=(\(|\+))\+)|[A-Za-z0-9\(\)\s\-\*])+/g;
    var temp =input.match(control);
    console.log(temp.length);
    var array=[];
    for(temps of temp){
        array.push(temps);
    }
   return array.pop();
}

//funzione che isola gli atomi
function atomisoler(input){
    var control=/[A-Z]{1}[a-z]{0,1}/g;
        var temp =input.match(control);
        console.log(temp.length);
        var array=[];
        for(temps of temp){
            array.push(temps);
        }
       
       return array;
} 


/*function Counteratominmolecole(input,cobalto){
        //parte1: verifica se ci sia l'elemento
        input=input+ " ";
        var controltemp= cobalto + "[^a-z]";         //verifica che ci sia quell'atomo
        var controlAtomo= new RegExp(controltemp);
        if(input.match(controlAtomo) === false || input.match(controlAtomo) ===null){
            return 0;
        }
    
        //parte2: calcola l'eventuale numero fuori dalla parentesi
    var counter=1;
    var controlA= /(?<=\()[A-Za-z0-9]{1,}(?=\))\)\d{0,}/g;     // prende la molecola a partire da '('
    if(input.match(controlA)!==null){
        //console.log(input.match(controlA));
    var tempA= input.match(controlA);
    var array=[];
        for(temps of tempA){
            array.push(temps);
        }
        var i=0;
    for(i=0;i<array.length;i++){
    var tempB=JSON.stringify(array[i]);
    if(tempB.match(controlAtomo)!==false && tempB.match(controlAtomo)!==null){      //verifica che ci sia ancora l'atomo
        var controlC=/(?<=\))\d{1,}/;              // prende il numero dopo ')'
        var numfuoriparentesi=tempB.match(controlC);
        if(numfuoriparentesi!==false && numfuoriparentesi!==null){
            counter=counter* Number(numfuoriparentesi);
        }
    }
    }}
        //parte3: calcola il numero accanto all'atomo
    
        var control2=  cobalto + "\\d{1,2}";            //prende dalla molecola l'atomo con il suo numero
        var control= new RegExp(control2);  //control è control2 in regexp
        if(input.match(control)!==false && input.match(control)!==null){
        var temp =input.match(control);     //isola la molecola col suo numero in temp
        var temp2= JSON.stringify(temp);    //temp2 è temp versione stringa
        var control3= /\d{1,}/;                         //isola da atomo + numero il numero
        var temp3= temp2.match(control3);   //isola il numero in temp3
    
       counter= counter* Number(temp3);     //incrementa il counter
       
        }
    
    return counter;
    }*/

    //funzione che aggiunge l'informazione circa le cariche
function counterIons(input){
    var control=/[\+\-]\d{0,}/g;
    var controlnumber=/\d{1,}/g;
    var valore=input.match(control);
    if(valore===null){
    return Number(0);}
    if(valore.toString().match(controlnumber)===null){
        if(valore.toString()==="+")
        return 1;
        return -1;
    }
    return Number(valore)

}

//funzione che individua caratteri estranei
function wrongcaracter(input){
    var control=/[A-Za-z\d\(\)\s\+\-]{1,}/
    if(input!==input.match(control).toString()){
        return false;
    }
    return true;
}

/*var matriceold=[
    [1,1,0,0],
    [1,0,0,-1],
    [0,1,0,-1],
    [0,1,-1,0],
    [0,3,-2,0]
];*/

//matrice che costruisce la matrice senza eqauzioni superflue
function cutmatrix(newmatrix, molecole){
    
    //metto in realmatrix un numero di equazioni che contengono tutte le variabili
    var equazioniNec=-1;
    var i;
    var j; 
    realmatrix=[];
    var arraytrue=[];
    for(i=0;i<molecole.length;i++){//riempio l'array [true, true, true, ...]
        arraytrue.push(true);
    }
    var arrayfalse=[];
    for(i=0;i<molecole.length;i++){//riempio l'array [false, false, false,...]
        arrayfalse.push(false);
    }
    do{
        equazioniNec++;
        for(i=0;i<molecole.length;i++){//trova la prima incognita mancante, all'indice i
            if(arraytrue[i]===true)
            break;
        }
        for(j=0;j<newmatrix.length;j++){//cerca la prima equazione che la contiene e la aggiunge alla matrice
            if(newmatrix[j][i]!==0){
                realmatrix.push(newmatrix[j]);
                newmatrix.splice(j,1);
                break;
            }
        }
        for(i=0;i<molecole.length;i++){//controlla quali altre variabili sono state riempite
            if(realmatrix[equazioniNec][i]!==0){
                arraytrue[i]=false;
            }
        }

    }while(JSON.stringify(arraytrue)!==JSON.stringify(arrayfalse)  && newmatrix.length!==0 );//continua finchèfiniscono le equazioni disponibili o vengono trovate tutte le variabili
     
    var nequazioni=realmatrix[0].length-1;
    while(realmatrix!=-1 && realmatrix.length!==nequazioni && newmatrix.length!==0 ){
        realmatrix.push(newmatrix[0]);
        newmatrix.splice(0,1);
        realmatrix=GaussAlgoritm(realmatrix);
    }
   
    
        return realmatrix;
  

}

 /* function cutmarix(oldmatrix,){
 var nrighe=oldmatrix.length;
        var ncolonne=oldmatrix[0].length;
        var i;
        var j;
        var k;
        var s;
        var rapporto;
        var counter=0;
        var minuno=false;   //se è false si verifica sempre che un termine della colonna è uguale a 0 e quello corrispondente diverso, quindi le equazioni non possoo essere simili
        var minuno2=true;   //se è true riga[j] andrà eliminata
        //per eliminazione: minuno2=true ,minuno=true
        var indexToEliminate=[];
        for(i=0;i<nrighe-1;i++){    // per ogni riga...
          for(j=i+1;j<nrighe;j++){  //confronta la riga con tutte quelle sottostanti
            minuno=false;
            minuno2=true;
            //se i termini confrontati sono tutti uno 0 e l'altro diverso da zero, le righe sono diverse
            for(s=0;s<ncolonne;s++){
                if((oldmatrix[i][s]===0 && oldmatrix[j][s]!==0) || (oldmatrix[j][s]===0 && oldmatrix[i][s]!==0)){
                    counter++;
                }
            }
            if(counter===ncolonne){
                minuno2=false;
            }
            //console.log(i,j,minuno2);
            for(s=0;s<ncolonne;s++){
                if(oldmatrix[i][s]!==0 && oldmatrix[j][s]!==0){
                    rapporto=oldmatrix[i][s]/oldmatrix[j][s];
                    minuno=true;
                    break;
                }
            }
            if(minuno!==false){
            
            for(k=0;k<ncolonne;k++){
                if((oldmatrix[i][k]===0 && oldmatrix[j][k]!==0) || (oldmatrix[j][k]===0 && oldmatrix[i][k]!==0)){
                    minuno2=false;
                }
                if(oldmatrix[i][k]!==0 && oldmatrix[j][k]!==0){
                    if(oldmatrix[i][k]/oldmatrix[j][k]!==rapporto){
                        minuno2=false
                    }
                }
            }
            if(minuno2===true){
                indexToEliminate.push(j);
            }
          }  }
        }//qui finisce il confronto 
        //se l'indice della riga non c'è in indextoeliminate, la copia da oldmatrix a newmatrix
        var newmatrix=[];
        for(i=0;i<nrighe;i++){
            var index=false;
            for(j=0;j<indexToEliminate.length;j++){
                if (i===indexToEliminate[j]){
                    index=true; 
                }
            }
            if(index===false)
            newmatrix.push(oldmatrix[i]);
        }
        if(indexToEliminate.length===0){
            newmatrix=oldmatrix;
        }
        //console.log( "index to eliminate: ",indexToEliminate);
        //console.log("old matrix is: ",oldmatrix);
        //console.log("new matrix is ",newmatrix);
        
        //metto in realmatrix un numero di equazioni che contengono tutte le variabili
        var equazioniNec=-1;
        
        realmatrix=[];
        var arraytrue=[];
        for(i=0;i<molecole.length;i++){
            arraytrue.push(true);
        }
        var arrayfalse=[];
        for(i=0;i<molecole.length;i++){
            arrayfalse.push(false);
        }
        do{
            equazioniNec++;
            for(i=0;i<molecole.length;i++){
                if(arraytrue[i]===true)
                break;
            }
            for(j=0;j<newmatrix.length;j++){
                if(newmatrix[j][i]!==0){
                    realmatrix.push(newmatrix[j]);
                    newmatrix.splice(j,1);
                    break;
                }
            }
            for(i=0;i<molecole.length;i++){
                if(realmatrix[equazioniNec][i]!==0){
                    arraytrue[i]=false;
                }
            }
    
        }while(JSON.stringify(arraytrue)!==JSON.stringify(arrayfalse)  && newmatrix.length!==0 );
        
        if(newmatrix.length!==0){
            var exrealmatrix=realmatrix.length;
            var lastcount=newmatrix.length;
        for(i=0;i<molecole.length-1-exrealmatrix;i++){
            if(lastcount===0)
            break;
            realmatrix.push(newmatrix[i]);
            lastcount--;
        }}
       // console.log("realmatrix is: ",realmatrix);
        
        return realmatrix;
    }*/

//funzione per filter(), così che array atomi abbia solo elementi distinti
const unique = (value, index, self) => {
    return self.indexOf(value) === index
  }

//funzione che conta il numero di atomi in ogni molecola
function Counteratominmolecole(molecola,atomi,queryAtomo){
    console.log(molecola);
  console.log(atomi);
    molecola=molecola+ " ";
    var controltemp= queryAtomo + "[^a-z]";         //verifica che ci sia quell'atomo
    var controlAtomo= new RegExp(controltemp);
    console.log(molecola.match(controlAtomo));
    if(molecola.match(controlAtomo) ===null){
        return 0;
    }
var mol=molecola;//molecola che si taglia
var i ;
var arraycoefficenti=[];//array contenente i coefficenti
for(i=0;i<atomi.length;i++){
    arraycoefficenti[i]=0;
}
for(i=0;i<molecola.length;i++){
    var controlMaiusc=/[A-Z]/;
    if(molecola.charAt(i)==(molecola.charAt(i)).match(controlMaiusc)){
        var cut=1;
        var atomo=molecola.charAt(i);//l'atomo nel ciclo
        var controlMinusc=/[a-z]/;
        if(molecola.charAt(i+1)==molecola.charAt(i+1).match(controlMinusc)){
            atomo=atomo+ molecola.charAt(i+1);
            i++;
            cut++;
        }
        var j;
        mol=mol.substring(cut);

        var posizione;//dove si trova l'atomo nell'array
        for(j=0;j<atomi.length;j++){
            console.log("entra nel ricercatore dell'atomo")
            if(atomi[j]===atomo){//individua la posizione nel vettore arraycoefficenti che si andrà ad incrementare
                posizione=j;
                break;
            }
        }
        var counter=1;
        console.log("il counter vale",counter);
        // parte1: conta il numero accanto
        var controldigit=/\d{0,}/;
        if(mol.match(controldigit)!==null && mol.match(controldigit)!=0){
            counter=counter*Number(mol.match(controldigit));
            console.log("il counter vale",counter);
        }
        //parte2:conta il numero fuori dalla parentesi
        
        var controlparentesichiusa=/[A-Za-z\d\(]{0,}(?=\))\)\d{0,}/
        if(mol.match(controlparentesichiusa)!==null){
          var tempmol= mol.match(controlparentesichiusa).toString();
          var controlparentesiaperta=/\(/;
            if(tempmol.match(controlparentesiaperta)==null){
                var controlnumber=/\)\d{0,}/;
                temp2=tempmol.match(controlnumber).toString();
                var catchnumber=/\d{1,}/;
                if(temp2.match(catchnumber)!==null){
                    counter=counter* Number(temp2.match(catchnumber));
                    console.log("il counter vale",counter);
                }
            }
        }
        arraycoefficenti[j]= arraycoefficenti[j]+counter;

    }
    else{
        mol=mol.substring(1);
    }
   
}
arraycoefficenti=idrato(molecola,arraycoefficenti,atomi);
for(i=0;i<atomi.length;i++){
    if(atomi[i]==queryAtomo){
        return arraycoefficenti[i];
    }
}
}
//funzione che aggiunge gli eventuali atomi alla molecola idrata
function idrato(molecola,coefficenti,atomi){
    var H=2;
    var O=1;
    var i;
    var control=/\*\d{0,}/;
    if(molecola.match(control)==null || molecola.match(control)==0){
        return coefficenti;
    }
    molecola=JSON.stringify(molecola.match(control));
    var controldigit=/(?<=)\d{1,}/;
    if(molecola.match(controldigit)!==null){
        H=H*Number(molecola.match(controldigit));
        O=Number(molecola.match(controldigit));
    }
    console.log(H);
    console.log(O);
    for(i=0;i<atomi.length;i++){
        if(atomi[i]=="H"){
            coefficenti[i] =coefficenti[i] + H-2;
            break;
        }
    
    }
    for(i=0;i<atomi.length;i++){
        if(atomi[i]=="O"){
            console.log("pepe")
            coefficenti[i] =coefficenti[i] + O-1;
            break;
        }
    
    }
   return coefficenti

}

function finalControl(matrice,risultato){
    var i;
    var j;
    var somma=0;
    for(i=0;i<matrice.length;i++){
        for(j=0;j<matrice[0].length;j++){
            somma= somma+ risultato[j]*matrice[i][j];
        }
    }
    if(somma!==0){
        return -1;
    }
    else{
        return 0;
    }
}






