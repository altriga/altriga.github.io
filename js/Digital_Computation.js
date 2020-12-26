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

echo = new Conversion("234.234",10,16,10)
console.log(echo.Calculate())


/*
function toDecimal(input,initialBase){
    var input_str = ((input).split('.'))[0],beta=0;
    for(i=1;i<=input_str.length;i++)
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

function fromDecimal(input,finalBase,precision=6){
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

*/