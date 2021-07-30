    function buttonx(li,eliminat){
        this.li=li;
        this.elimina=eliminat;
        this.elimina.setAttribute('class',"elimina");
        this.elimina.innerHTML="X";
        this.elimina.style.backgroundColor="red";
        this.elimina.style.borderSize="1.5px";
        this.elimina.style.color="white";
        this.li.appendChild(elimina);
        this.elimina.onclick=()=>{
           this.li.remove();
        }
    }

    function wrongcaracter(input){
        var control=/[A-Za-z\d\(\)\s\+\-\*]{1,}/
        if(input!==input.match(control).toString()){
            return false;
        }
        var control=/[a-z][a-z]/;
        if(input.match(control)!==null){
            return false
        }
        var control=/\(\(/;
        if(input.match(control)!==null){
            return false
        }
        var control=/\(\)/;
        if(input.match(control)!==null){
            return false
        }
        var control=/\)\)/;
        if(input.match(control)!==null){
            return false
        }
        return true;
    }

    function molecoleisoler(input){
        var control=/(((?<=(\(|\+))\+)|[A-Za-z0-9\(\)\s\-\*])+(?=(?<!(\(|\+))\+)/g;
        var temp =input.match(control);
        //console.log(temp);
       // console.log(temp.length);
        var array=[];
        if(temp !==null){
        for(temps of temp){
            array.push(temps);
        }}
       return array;
    }

    function ultimatemolecolarisoler(input){
        var control= /(?<=(?<!(\(|\+))\+)(((?<=(\(|\+))\+)|[A-Za-z0-9\(\)\s\-\*])+/g;
        var temp =input.match(control);
        if(temp===null){
            var controlnull=/[A-Za-z\d\(\)\+\-\*]{1,}/g;
            return input.match(controlnull)[0];
        }
        var array=[];
        for(temps of temp){
            array.push(temps);
        }
       return array.pop();
    }

    function atomisoler(input){
        var control=/[A-Z]{1}[a-z]{0,1}/g;
            var temp =input.match(control);
            var array=[];
            for(temps of temp){
                array.push(temps);
            }
            array=array.map((item)=>{
                return item
            })
           return array;
    } 

    
    function Counteratominmolecole(molecola,atomi,queryAtomo){
        //console.log(molecola);
      //console.log(atomi);
        molecola=molecola+ " ";
        var controltemp= queryAtomo + "[^a-z]";         //verifica che ci sia quell'atomo
        var controlAtomo= new RegExp(controltemp);
        //console.log(molecola.match(controlAtomo));
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
                //console.log("entra nel ricercatore dell'atomo")
                if(atomi[j]===atomo){//individua la posizione nel vettore arraycoefficenti che si andrà ad incrementare
                    posizione=j;
                    break;
                }
            }
            var counter=1;
            //console.log("il counter vale",counter);
            // parte1: conta il numero accanto
            var controldigit=/\d{0,}/;
            if(mol.match(controldigit)!==null && mol.match(controldigit)!=0){
                counter=counter*Number(mol.match(controldigit));
                //console.log("il counter vale",counter);
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
                        //console.log("il counter vale",counter);
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
        //console.log(H);
        //console.log(O);
        for(i=0;i<atomi.length;i++){
            if(atomi[i]=="H"){
                coefficenti[i] =coefficenti[i] + H-2;
                break;
            }
        
        }
        for(i=0;i<atomi.length;i++){
            if(atomi[i]=="O"){
                //console.log("pepe")
                coefficenti[i] =coefficenti[i] + O-1;
                break;
            }
        
        }
       return coefficenti
    
    }

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
            //console.log(t);
            var count=0;
            for(k=0;k<ncolonne;k++){// t è il coefficente di a(riga,t)/a(i,t). se count<=i allora t=i
                if(matrice[i][k]===0){
                    count++
                   // console.log("count=",count);
                    //console.log("i=",i);
                }
                if(matrice[i][k]!==0){
                    break;
                }
                if(count>t){
                    t=t+1;
                    //console.log(t);
                }
            
            }
         //  console.log(t);
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

    function cutmatrix(newmatrix, molecole){
       
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

    const unique = (value, index, self) => {
        return self.indexOf(value) === index
      }

        function finalControl(matrice,risultato){
        var i;
        var j;
        for(i=0;i<matrice.length;i++){
            var somma=0;
            for(j=0;j<matrice[0].length;j++){
                somma= somma+ risultato[j]*matrice[i][j];
            }
            //console.log(somma);
            if(somma!==0){
                return -1;
            }
        }
        return 0;
        
    }

    function printreaction(molecole,valori,nummolecole,numreagenti){
        var reazione="";
        var freccia=   "&#8652";
        var i; 
        var j;
        var reagenti=[];
        var reagentival=[];
        var prodotti=[];
        var prodottival=[];
        for(i=0;i<numreagenti;i++){
            if (valori[i][0]>=0){
                reagenti.push(molecole[i]);
                reagentival.push(valori[i][0]);
            }
            else{
                prodotti.push(molecole[i]);
                prodottival.push(-valori[i][0]);
            }
        }
        for(i=numreagenti;i<nummolecole+1;i++){
            if (valori[i][0]<0){
                reagenti.push(molecole[i]);
                reagentival.push(-valori[i][0]);
            }
            else{
                prodotti.push(molecole[i]);
                prodottival.push(valori[i][0]);
            }
        }
        //console.log(reagenti)
        //console.log(reagentival);
        //console.log(prodotti);
        //console.log(prodottival);
        for(i=0;i<reagenti.length;i++){
            molecole[i]=reagenti[i];
            valori[i]=reagentival[i];
        }
        for(j=0;j<prodotti.length;j++){
            molecole[i+j]=prodotti[j];
            valori[i+j]=prodottival[j];
        }
        //console.log(molecole);
        //console.log(valori)
        var control=/[A-Za-z\d\+\-\(\)\*]{1,}/g;
        for(i=0;i<numreagenti-1;i++){
            reazione=reazione+ valori[i]+ molecole[i].match(control)+ " "+ "+"+ " ";
        }
        reazione=reazione+ valori[i]+ molecole[i].match(control);
        reazione=reazione+ " " + freccia +" ";
        for(i=numreagenti;i<nummolecole;i++){
            reazione=reazione+ valori[i]+ molecole[i].match(control)+ " "+ "+"+ " ";
        }
        reazione=reazione+ valori[nummolecole]+ molecole[nummolecole].match(control);
        p=document.createElement("p");
        p.innerHTML=format(reazione);
        li=document.createElement("li");
        li.setAttribute('class',"membrilista");
        li.appendChild(p);
        elimina=document.createElement("button");
         new buttonx(li,elimina);
        ul.appendChild(li);
    }

    function format(input) {
        let numberPattern = /(?<=[A-Za-z]|\))\d+/;
        let ionTextPattern = /\(\d*\W{1,2}\d*\)/;
    // mdn regexp,    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
    
        let replacementFunction = (pattern, replacement, offset = 0) => {
            while (match = input.match(pattern)) {
                input = input.replace(pattern,
                    `<${replacement}>${match[0].slice(offset, match[0].length - offset)}</${replacement}>`);
                }
            }
    // format string 
            replacementFunction(numberPattern, 'sub');
            replacementFunction(ionTextPattern, 'sup', offset = 1);
    
            input += '&NoBreak;'
            
            return input;
        }





    function bilanciaequazione(){
    
    console.log("è entrato nella funzione");
    var arrayreagenti= molecoleisoler(reagenti.value);
    var ultimoreagente= ultimatemolecolarisoler(reagenti.value);
    arrayreagenti.push(ultimoreagente);     //array contenente le molecole dei reagenti
    var arrayprodotti= molecoleisoler(prodotti.value);    //array contenente le molecole dei prodotti (tranne l'ultimo)
    var ultimoprodotto= ultimatemolecolarisoler(prodotti.value);  //vettore risultato
    var arrayatomi=[];     //array contenente gli atomi della reazione
    var i;
    // controllo che non ci siano caratteri errati
    var segnoextra=wrongcaracter(reagenti.value);
    if(segnoextra===false){
        return alert("error: wrong character in input 'reagents'");
    }
    segnoextra=wrongcaracter(prodotti.value);
    if(segnoextra===false){
        return alert("error: wrong character in input 'products'");
    }
    //controllo se la reazione è considerata acida e la sistemo
    if(acido===true){
        var hreagenti=false;
        var h2oreagenti=false;
        var hprodotti=false;
        var h2oprodotti=false;
        var prodotticompleti=[];
        for(i=0;i<arrayprodotti.length;i++){
            prodotticompleti.push(arrayprodotti[i]);
        }
        console.log(prodotticompleti);
        console.log(arrayprodotti);
        prodotticompleti.push(ultimoprodotto);
        console.log(prodotticompleti);
        console.log(arrayprodotti);
        var controlh= /(?<!([A-Za-z\d\+\-\(\)\*]))H\(\+/;
        var controlh2o= /(?<!([A-Za-z\d\+\-\(\)\*]))H2O(?!([A-Za-z\d\+\-\(\)\*]))/;
        for(i=0;i<arrayreagenti.length;i++){
            if(arrayreagenti[i].match(controlh)!==null){
                hreagenti=true;
            }
            
            if(arrayreagenti[i].match(controlh2o)!==null){
                h2oreagenti=true;
            }
        }
        for(i=0;i<prodotticompleti.length;i++){
            if(prodotticompleti[i].match(controlh)!==null){
                hprodotti=true;
            }
            if(prodotticompleti[i].match(controlh2o)!==null){
                h2oprodotti=true;
            }
        }

        if(h2oreagenti===false && h2oprodotti===false){
            if(hreagenti===true){
                arrayprodotti.push("H2O");
                h2oprodotti=true;
            }
            if(hprodotti===true){
                arrayreagenti.push("H2O");
                h2oreagenti=true;
            }
            if(hprodotti===false && hreagenti===false){
                arrayreagenti.push("H2O");
                h2oreagenti=true;
                arrayprodotti.push("H(+)")
                hprodotti=true;
            }
        }
        if(hreagenti===false && hprodotti===false){
            if(h2oreagenti===true){
                arrayprodotti.push("H(+)");
                hprodotti=true;
            }
            if(h2oprodotti===true){
                arrayreagenti.push("H(+)");
                hreagenti=true;
            } 
        }
        //arrayprodotti=arrayprodotti.filter(unique);

    }

    //155-163: costruisco il vettore che contiene gli atomi
    for(i=0;i<arrayreagenti.length;i++){
        var arraytemp= atomisoler(arrayreagenti[i]);
        var j;
        for(j=0;j<arraytemp.length;j++){
            arrayatomi.push(arraytemp[j]);
        }
    }
    arrayatomi=arrayatomi.filter(unique);   //arrayatomi ora contiene tutti gli atomi della reazione
    console.log("array atomi: ",arrayatomi);  
    
    //217-224: costruisco il vettore contenente le singole molecole
    var arraymolecole=[];
    for(i=0;i<arrayreagenti.length;i++){
        arraymolecole.push(arrayreagenti[i]);
    }
    for(i=0;i<arrayprodotti.length;i++){
        arraymolecole.push(arrayprodotti[i]);
    }
    arraymolecole.push(ultimoprodotto);

    console.log("array molecole: ",arraymolecole);
    //165-181:costruisco la matrice 
    var dimMatrice= arrayatomi.length;
    var k;
    var matrice=[];
    for(i=0;i<dimMatrice;i++){
        matrice[i]=[];
    }
    for(i=0;i<dimMatrice;i++){
        for(j=0;j<arrayreagenti.length;j++){
            matrice[i].push(Counteratominmolecole(arrayreagenti[j],arrayatomi,arrayatomi[i]));
        }
        for(k=0;k<arrayprodotti.length;k++){
            matrice[i].push(-Counteratominmolecole(arrayprodotti[k],arrayatomi,arrayatomi[i]));
        }
        matrice[i].push(Counteratominmolecole(ultimoprodotto,arrayatomi,arrayatomi[i]));
    }
       
    //aggiunge l'equazione con le cariche
        var rigaioni=[];
            for(i=0;i<arrayreagenti.length;i++){
                rigaioni.push(counterIons(arrayreagenti[i]));
            }
            for(i=0;i<arrayprodotti.length;i++){
                rigaioni.push(-counterIons(arrayprodotti[i]));
            }
            rigaioni.push(counterIons(ultimoprodotto));
            matrice.push(rigaioni);
            console.log("riga ioni: ",rigaioni);

    //originalmatrix è la matrice originale
    var originalmatrix=[];
    for(i=0;i<matrice.length;i++){
        originalmatrix.push([]);
        
    }
    for(i=0;i<matrice.length;i++){
        for(j=0;j<matrice[0].length;j++){
            originalmatrix[i].push(matrice[i][j])
        }
        
    }
    console.log("original matrix: ",originalmatrix) 
     matrice=cutmatrix(matrice,arraymolecole);
    console.log("new matrix: ",matrice);
    //controlla che la matrice non sia impossibile(-1) o indeterminata(nrighe<ncolonne-1)
    if( matrice===-1){
        return alert("impossible reaction :(");
    }
    if(matrice.length!==matrice[0].length-1){
        return alert("impossible reaction :(");
    }
     //183-186: costruisco il vettore V base
     var vettorev= [];
     
     for(i=0;i<arraymolecole.length-1;i++){
         vettorev.push(matrice[i].pop());
     }
    // console.log(vettorev);
     matriceinfo=matrice;
     matrice=math.matrix(matrice);

    //189-214: trovo il vettore risultante, modificando il vettore V
    var scalare=0;
    var vettorevpuritano=vettorev;
    do{
    //console.log("è entrato nel ciclo")
    scalare=scalare+1;
    var corretto=true;
    
    vettorev=math.dotMultiply(scalare,vettorevpuritano);
    var risultato= math.lusolve(matrice,vettorev)["_data"];
    for(i=0;i<matriceinfo.length;i++){
        var deltarisultato=Math.abs(risultato[i][0]-Math.round(risultato[i][0]));
        //console.log(deltarisultato);
        //console.log(Number(risultato[i][0]));
        //console.log(Math.round(risultato[i][0]));
        if(deltarisultato<0.000000001){
            risultato[i][0]=Math.round(risultato[i][0]);
        }
        else{
            corretto=false;
            break;
        }
    }
    //console.log(scalare);
    }
    while(corretto===false);    
    risultato.push([]);
    risultato[arraymolecole.length-1][0]=scalare;
    console.log("result: ",risultato);
    //controllo che tutte le equazioni danno lo stesso risultato
    //console.log("originalmatrix: ", originalmatrix);
    for(i=0;i<originalmatrix.length;i++){
        originalmatrix[i][originalmatrix[0].length-1]=-originalmatrix[i][originalmatrix[0].length-1];
    }
    //console.log("originalmatrix: ", originalmatrix);
    if(finalControl(originalmatrix,risultato)===-1){
        return alert("impossible reaction :(");
    }
    //stampo la reazione
    printreaction(arraymolecole,risultato,arraymolecole.length-1,arrayreagenti.length); //stampo la reazione
}



const burger = document.querySelector('.burger');
const items = document.querySelector('header section');

burger.addEventListener('click', () => {
    burger.classList.toggle('close');
    items.classList.toggle('opened');
});

form=document.getElementsByTagName('form')[0];
form.onsubmit = (event) => { event.preventDefault() }
reagenti= document.getElementsByClassName("reagenti")[0];
prodotti= document.getElementsByClassName("prodotti")[0];
button=document.getElementsByClassName("bilancia")[0];
ul=document.getElementsByClassName("listareazioni")[0];
button.onclick=()=> bilanciaequazione();


acidbutton=document.getElementsByClassName("acidbutton")[0];
var acido=false;
acidbutton.onclick=()=>{
    if(acido===false){
        acidbutton.innerHTML="&#10003";
        acido=true;
    }
    else{
        acidbutton.innerHTML="";
        acido=false;
    }
}
