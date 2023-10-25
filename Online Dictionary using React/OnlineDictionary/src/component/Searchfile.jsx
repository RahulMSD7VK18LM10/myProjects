import React, {useState} from 'react'
import { useEffect } from 'react';

function Searchfile(props) {
    const [text, setText] = useState('');
    const[word,setWord]= useState([]);
    const handleOnChange = (event) =>{//function created for onchange event
        const iword = event.target.value;
        setText(iword);
    };
    const handleData= async ()=>{
        const url= `https://www.dictionaryapi.com/api/v3/references/sd4/json/${text}?key=a647c393-0d4b-4610-97d7-31bad68e9de9`;
        let response = await fetch(url);
        let parseData = await response.json();
        setWord(parseData)
    };
    useEffect(()=>{
        handleData();
        //eslint-disable-next-line
    },[])
  return (
    <div className='container my-3'>
        <div className="card">
            <div className="card-body">
                <div className="my-3">
                    <label forhtml="exampleInputWord" className="form-label">Enter your word here</label>
                    <input type="text" onChange={handleOnChange} value={text} className="form-control" id="exampleInputWord"/>
                </div>
                <button type="submit" onClick={handleData} className="btn btn-primary">Search</button>
                <div className="container my-3">
                    <h3>Searching for word "{text}"</h3>
                    <table className="table table-striped-columns" style={{border:"2px solid"}}>
                    <tbody>
                        {word.map((element)=>{
                            return <tr> 
                                <th>{element.meta.id!=null?element.meta.id:'There is no such word'}</th>
                                <td>{element.shortdef}</td>
                            </tr>
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  )
}
export default Searchfile