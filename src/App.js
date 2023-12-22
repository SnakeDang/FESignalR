import logo from './logo.svg';
import './App.css';
import { useEffect,useState } from 'react';
import { HubConnectionBuilder, LogLevel, HttpTransportType } from '@microsoft/signalr';

function App() {
  const [messages, setMessages] = useState(null);
  useEffect(()=>{
    const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:5001/RealTimeRobot",{
          // transport: HttpTransportType.WebSockets,
          accessTokenFactory: () => {
              return `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImMwMjZiYzhiLThlZTAtNDVlZS1hNzRmLWRkMmUzMGU4NDIyNyIsInJvbGUiOiJBZG1pbmlzdHJhdG9yIiwibmJmIjoxNzAyOTQ5ODkzLCJleHAiOjE3MDM1NTQ2OTMsImlhdCI6MTcwMjk0OTg5MywiaXNzIjoiY29yZS5jb20iLCJhdWQiOiJjb3JlLmNvbSJ9.Znmm1_3f2ii0Vn07t9_vp2qVJ423hLNAc9UCy4RpR-8`
          }
      })
        .configureLogging(LogLevel.Information)
        .build();

      connection.on("Views", (data) => {
        console.log(data)
        setMessages(data);
      });
      connection.onclose(e => {
        setMessages(null);
      
      });
      connection.start();
      
  },[])
  console.log('messs:::::::', messages)
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {messages?.map((item)=>(<>
          <h2>{item.id}</h2>
          <h5>{item.lstRobotRealTime.length > 0 ?  item?.lstRobotRealTime?.map(rb=>(<p>{rb?.robotInfo?.name
}</p>)):""}</h5>
        </>))}
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
