import logo from './logo.svg';
import './App.css';
import { useEffect,useState } from 'react';
import { HubConnectionBuilder, LogLevel, HttpTransportType } from '@microsoft/signalr';
import {token, connectSignalR} from './connectSignalR'

function App() {
  const [messages, setMessages] = useState(null);
  const [conn, setConnect] = useState(null)
  
 
  useEffect(()=>{
    if(!conn)
    {
      console.log("thực thi kết nối lại")
      const {connection} = connectSignalR(token)
      console.log({connection})
      setConnect(connection)
      connection?.on("Views",(data)=>{
        setMessages(data)
      })
      return ()=>{
        console.log("unmount")
      }
    }      
  },[])

  useEffect(()=>{
    if(!conn)
    {
      console.log("thực thi kết nối lại có đối số")
      const {connection} = connectSignalR(token)
      console.log({connection})
      setConnect(connection)
      connection?.on("Views",(data)=>{
        setMessages(data)
      })
      return ()=>{
        console.log("unmount")
      }
    }     
    console.log(messages)
    // return ()=>{
    //   console.log("umoun 2")
    // }
  },[messages])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/* {messages?.map((item)=>(<>
          <h2>{item.id}</h2>
          <h5>{item.lstRobotRealTime.length > 0 ?  item?.lstRobotRealTime?.map(rb=>(<p>{rb?.robotInfo?.name
}</p>)):""}</h5>
        </>))} */}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
