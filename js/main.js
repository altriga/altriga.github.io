class Conversion{
    constructor(input,initialBase,finalBase,setPrecision=6){
        this.input = input;
        this.initialBase = initialBase;
        this.finalBase = finalBase;
        this.setPrecision = setPrecision;
    }
    Calculate(){
        return this.fromDecimal(this.toDecimal(this.input,this.initialBase),this.finalBase,this.setPrecision)
    }
    toDecimal(input,initialBase){
        var input_str = ((input).split('.'))[0],beta=0;
        for(var i=1;i<=input_str.length;i++)
        {
            beta += parseInt(input_str[i-1],16) * Math.pow(initialBase,input_str.length - i);
        }
        if(input_str =  ((input).split('.'))[1]){
            beta = parseFloat(beta);
            for(i=1;i<=input_str.length;i++)
            {
                beta += parseInt(input_str[i-1],16) *(1 / Math.pow(initialBase,i));
            }
            
        }
        return beta;
    }
    
    fromDecimal(input,finalBase,precision=6){
        function ConvertPoint(exp){
            return parseFloat("0."+((exp.toString()).split('.'))[1]);
        }
        
        var array_ans=[],array_temp=[];
        var x = Math.floor(input)
        while(true){
            array_ans.push((x%finalBase).toString(16));
            if(Math.floor(x/finalBase)==0){
                break;
            }
            x = Math.floor(x/finalBase);
        }
        if(input%1!=0){
            array_temp.push('.')
            for(var run = 0;run < precision ; run++){
                array_temp.push((Math.floor(ConvertPoint(input)*finalBase)).toString(16))
                input = ConvertPoint(input)*finalBase;
            }
            return ((array_ans.reverse()).join('') + array_temp.join('')).toUpperCase()
        }
        return ((array_ans.reverse()).join('')).toUpperCase()
    }

}

function validate(inputValue,initialBase){
    if(initialBase==-1){
        alert("No Input Found!! Please check it & Try Again.")
        location.reload();
        return false;
    }
    if(initialBase > 2){
        for(i=0;i<inputValue.length;i++){
            m = (parseInt((inputValue[i]),16))/initialBase;
            if(m>1){showerror(inputValue,initialBase);return false}
    }
    }
    else if(initialBase == 2){
        for(i=0;i<inputValue.length;i++){
            m = (parseInt((inputValue[i]),16))/1;
            if(m>1){showerror(inputValue,initialBase);return false}
    }
}
return true;
}

function showerror(inputValue,initialBase){
    base = ''
    if(initialBase==2){base="Binary"}
    else if(initialBase==8){base="Octal"}
    else if(initialBase==10){base="Decimal"}
    else if(initialBase==16){base="Hexa-Decimal"}
    
    const modelbody2 = document.getElementById('staticBackdrop')
  let dataHtml =`
  <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
      <div class="modal-body">
          <p><b>${inputValue}</b> is not a <b>${base}</b> number.<br> Please Check the Number &     Tryagain!!</p> 
      </div>
      <div class="modal-footer">    
          <button type="button" class="btn btn-success" data-dismiss="modal" onclick="location.reload(); return false;";>Try Again</button>
      </div>
      </div>
  </div>
  </div>;`
  modelbody2.innerHTML = dataHtml;
  $('#staticBackdrop').modal('show');
    
}

function calculate_answer(){
    var inputValue = document.getElementById("inputValue").value;
    var initialBase = parseInt(document.getElementById("initialBase").value);
    var finalBase = parseInt(document.getElementById("finalBase").value);
    console.log((inputValue),(initialBase),(finalBase));
    if(validate(inputValue,initialBase)){
    var echo = new Conversion(inputValue,initialBase,finalBase);
    var alpha = echo.Calculate()
    alpha = "["+alpha+"]"+ (finalBase.toString()).sub()+ " ⇌ "+"["+inputValue+"]"+ (initialBase.toString()).sub()

    //document.getElementById('answer').value = alpha = "["+inputValue+"]"+ (initialBase.toString()).sub() + " ⇌ " + "["+alpha+"]"+ (finalBase.toString()).sub();
    const modelbody = document.getElementById('answer_here');
    let html_make = 
    `
    <div class="input100" id="answer" style="padding: 5px;" >${alpha}</div>
    `;
    modelbody.innerHTML = html_make;
    }
    
    
}

