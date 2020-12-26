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
function calculate_answer(){
    var inputValue = document.getElementById("inputValue").value;
    var initialBase = parseInt(document.getElementById("initialBase").value);
    var finalBase = parseInt(document.getElementById("finalBase").value);
    console.log((inputValue),(initialBase),(finalBase));
    var echo = new Conversion(inputValue,initialBase,finalBase);
    

    var alpha = echo.Calculate()
    console.log(alpha)
    const modelbody = document.getElementById('answer_here');
    let html_make = 
    `
    <div class="wrap-input100 validate-input" data-validate = "Message is required">
				<span class="label-input100"></span>
				<textarea class="input100" name="message" placeholder="" disabled>Answer is: ${alpha} \n\n[If Website Crashes... Refresh it & Check the Input Expression and its Input Base!!]</textarea>
				<span class="focus-input100"></span>
	</div>
    `;
    modelbody.innerHTML = html_make;
}

