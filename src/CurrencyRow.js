import React from "react"


function CurrencyRow({currencyOptions, selectCurrency, handleClick, amount, handleAmount}) {


    return (
        <div>
            <input type="number" value= {amount} onChange= {handleAmount} />
            <select value={selectCurrency} onChange={handleClick}>
        { currencyOptions.map(item => (
                <option key={item} value={item}>{item}</option>
            ))}
                
            </select>
        </div>
    );
}

export default CurrencyRow;