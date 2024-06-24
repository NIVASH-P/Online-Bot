import {React,useState} from 'react';
import './App.css';
import axios from 'axios';
import Markdown from 'react-markdown';

function App() {
  const [Input, setInput] = useState("");
  const [message,setMessage]=useState([]);
  const handleSent = async() =>{
    const response = await axios({
      url:"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDtfZank2YsuIa33qUNgKwG0rjVY0jIzbY",
      method:"POST",
      data:{
        "contents":[
          {"parts":[
            {"text":Input}
          ]}
        ],
      }
    })
    setMessage(
      [
        ...message,{
          prompts : Input,
          text:response.data.candidates[0].content.parts[0].text,
        }
      ]
    )
  }
  return (
    <div className="App">
      <div className="chat">
        {
          message.map((a)=>{
            return(
              <>
              <div className="user_message">
                {a.prompts}
              </div>
              <Markdown>
                {a.text}
              </Markdown>
              </>
            )
          })
        }
        

      </div>
      <div className="input-container">
        <input className="text" value={Input} onChange={(e)=>setInput(e.target.value)}/>
        <button className="" onClick={handleSent}>send</button>
      </div>
    </div>
  );
}

export default App;
