import React, {useState} from 'react'

export default function TextForm(props) {

  const handleUpClick = () =>{
    let newtext=text.toUpperCase();
    setText(newtext);
    props.showAlert("All changed to upper case","success");
  }
  const handleLowClick = () =>{
    let newtext=text.toLowerCase();
    setText(newtext);
    props.showAlert("All changed to lower case","success");
  }
  const handleOnChange = (event) =>{//function created for onchange event
    setText(event.target.value);
  }
  const handleVowelCount = () =>{
    let count = text.match(/[aeiou]/gi);
    setCount(count === null ? 0 : count.length);
  }
  const handleReverseText = () =>{
    let splitText=text.split(" ");
    let revText=splitText.reverse("");
    revText = revText.join(" ");
    setRevText(revText);
    props.showAlert("text has been reversed","primary");
  }
  const handleDtClick = (event)=> { // download text in a file
    const element = document.createElement("a");
    const file = new Blob([text], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "myFile.txt";
    document.body.appendChild(element);
    element.click();
    props.showAlert("File downloaded","success");
  }
  const handleSpeak = () => {//speech
    let msg = new SpeechSynthesisUtterance();
    //This Web Speech API interface represents a speech request. It contains the content the speech service should read 
    //and information about how to read it (e.g. language, pitch and volume.)
    msg.text = text;
    window.speechSynthesis.speak(msg);
  }
  const handleClearText = () =>{
    setText('');
    setRevText('');
    props.showAlert("All text clered","warning");
  }
  const handleFindReplace = () => {
    let existing_text = prompt("Enter which word to replace : ");
    let replaced_text = prompt("Enter New Text");
    setText(text.replaceAll(existing_text, replaced_text))
  }
  const [text, setText] = useState('');
  const [count, setCount] = useState(0); //given default value 0 bcoz of no words
  const [revText, setRevText] = useState('');
  return (
    <>
    <div className="container" style={{color: props.mode==='dark'?'white':'black'}}>
        <h1>{props.heading}</h1>
        <div className="mb-3">
        <textarea className="form-control" value={text} onChange={handleOnChange}  
        style={{backgroundColor: props.mode==='dark'?'#a8a4a4':'white', color: props.mode==='dark'?'white':'black'}}  id="myBox" rows="8"></textarea>
        </div>
        <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleUpClick}>Convert to upper case</button>
        <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleLowClick}>Convert to lower case</button>
        <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleReverseText}>Reverse text</button>
        <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleVowelCount}>Count the vowels</button>
        <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleDtClick}>Download text as file</button>
        <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" type="submit" onClick={handleSpeak}>Speak</button>
        <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleClearText}>Clear text</button>
        <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleFindReplace}>Find and Replace</button>
    </div>
    <div className="container my-3" style={{color: props.mode==='dark'?'white':'black'}}>
        <h2>Your text summary</h2>
        <p>{text.split(" ").filter((element)=>{return element.length!==0}).length} words and {text.length} characters</p>
        <p>{0.008* (text.split(" ").filter((element)=>{return element.length!==0}).length)} Minutes to read</p>
        <p>{count} number of vowles are present in th above text</p>
        <h3>Preview</h3>
        <p>{text.length>0?text:"Enter text above to preview"}</p>
        <h3>Reversed Text</h3>
        <p>{revText.length>0?revText:"Click on reverse text button to view result"}</p>
    </div>
    </>
  )
}
