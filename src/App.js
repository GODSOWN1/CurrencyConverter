import React, {useEffect, useState} from "react";
import "./App.css";
import CurrencyRow from "./CurrencyRow";

const BASE_URL=    "http://data.fixer.io/api/latest?access_key=d4d88fbd35e2c9b1dc33bdec065a3417";
const CONVERT_URL= "http://data.fixer.io/api/convert?access_key=d4d88fbd35e2c9b1dc33bdec065a3417";

function App (){

    const [currencyOptions, setCurrencyOptions] =useState([]);
    const [fromCurrency, setFromCurrency]= useState();
    const [toCurrency, setToCurrency]= useState();
    const [exchangeRate, setExchangeRate]= useState();
    const [amount, setAmount]= useState(1);
    const [amountInFromCurrency, setAmountInFromCurrency]= useState(true)
    

let toAmount, fromAmount
if (amountInFromCurrency){
    fromAmount= amount
    toAmount=   amount* exchangeRate
} else {
    toAmount=   amount
    fromAmount= amount/ exchangeRate
}
    
    useEffect(function(){
    fetch (BASE_URL)
    .then(res=>res.json())
    .then(data=> {
        const firstCurrency= Object.keys(data.rates)[0]
        setCurrencyOptions([data.base, ...Object.keys(data.rates)])
        setFromCurrency(data.base)
        setToCurrency(firstCurrency)
        setExchangeRate(data.rates[firstCurrency])
})
    }, [])
    
    useEffect(function(){
        if (fromCurrency != null && toCurrency!= null){
            fetch(`${CONVERT_URL}&to=${fromCurrency}&from=${toCurrency}&amount=${amount}`)
            .then (res => res.json())
            .then(data => 
                    setExchangeRate(data.rates[toCurrency]))
        }
        
    }, [fromCurrency, toCurrency])


    function handleToClick(event){
        setToCurrency(event.target.value)
    }

    function handleFromClick(event){
        setFromCurrency(event.target.value)
    }

    function handleFromAmount(event){
        setAmount(event.target.value);
        setAmountInFromCurrency(true);
    }

    function handleToAmount(event){
        setAmount(event.target.value);
        setAmountInFromCurrency(false);
    }

    return (
        <>
        <h1> Converter</h1>
        <CurrencyRow
        
        currencyOptions={currencyOptions}
        selectCurrency= {fromCurrency}
        handleClick= {handleFromClick}
        amount= {fromAmount}
        handleAmount= {handleFromAmount}

        />
        <div className = "equals">=</div>
        <CurrencyRow 
        currencyOptions={currencyOptions}
        selectCurrency= {toCurrency}
        handleClick= {handleToClick}
        amount= {toAmount}
        handleAmount= {handleToAmount}
        />
        </>
    )
}


export default App;