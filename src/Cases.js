import React,{useState} from 'react';
import './Cases.css';
import CurrencyFormat from 'react-currency-format';

function Cases({title,type,totalData,newData,changeMapType,selected,changeSelected}) {
    function handleClick(){
        if(type==='infected'){
            changeMapType(type,'royalblue',0.05);
            changeSelected(type);
        }else if(type==='recovered'){
            changeMapType(type,'limegreen',0.04);
            changeSelected(type);
        }else if(type==='deaths'){
            changeMapType(type,'crimson',0.025);
            changeSelected(type);
        }
    }

    if(type==="infected"){
        return (
            <div className={"cases "+selected.infectedSelect} onClick={handleClick}>
                <div className="cases__total">
                    <h3 className="cases__total__title">Total {title}</h3>
                    <CurrencyFormat
                        value={totalData}
                        renderText={(value)=>(
                            <h2 className={"cases__total__number "+type}>{value}</h2>
                        )}
                        decimalScale={2}
                        displayType={'text'}
                        thousandSeparator={true}
                    />
                </div>
                <div className="cases__new">
                    <h3 className="cases__new__title">New {title}</h3>
                    <CurrencyFormat
                        value={newData}
                        renderText={(value)=>(
                            <h2 className={"cases__new__number "+type}>{value}</h2>
                        )}
                        decimalScale={2}
                        displayType={'text'}
                        thousandSeparator={true}
                    />
                </div>
            </div>
        )   
    }else if(type==="recovered"){
        return (
            <div className={"cases "+selected.recoveredSelect} onClick={handleClick}>
                <div className="cases__total">
                    <h3 className="cases__total__title">Total {title}</h3>
                    <CurrencyFormat
                        value={totalData}
                        renderText={(value)=>(
                            <h2 className={"cases__total__number "+type}>{value}</h2>
                        )}
                        decimalScale={2}
                        displayType={'text'}
                        thousandSeparator={true}
                    />
                </div>
                <div className="cases__new">
                    <h3 className="cases__new__title">New {title}</h3>
                    <CurrencyFormat
                        value={newData}
                        renderText={(value)=>(
                            <h2 className={"cases__new__number "+type}>{value}</h2>
                        )}
                        decimalScale={2}
                        displayType={'text'}
                        thousandSeparator={true}
                    />
                </div>
            </div>
        )
    }else if(type==="deaths"){
        return (
            <div className={"cases "+selected.deathsSelect} onClick={handleClick}>
                <div className="cases__total">
                    <h3 className="cases__total__title">Total {title}</h3>
                    <CurrencyFormat
                        value={totalData}
                        renderText={(value)=>(
                            <h2 className={"cases__total__number "+type}>{value}</h2>
                        )}
                        decimalScale={2}
                        displayType={'text'}
                        thousandSeparator={true}
                    />
                </div>
                <div className="cases__new">
                    <h3 className="cases__new__title">New {title}</h3>
                    <CurrencyFormat
                        value={newData}
                        renderText={(value)=>(
                            <h2 className={"cases__new__number "+type}>{value}</h2>
                        )}
                        decimalScale={2}
                        displayType={'text'}
                        thousandSeparator={true}
                    />
                </div>
            </div>
        )
    }
}

export default Cases;
