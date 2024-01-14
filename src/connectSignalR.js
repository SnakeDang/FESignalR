import { HubConnectionBuilder, LogLevel, HttpTransportType } from '@microsoft/signalr';

export const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImMwMjZiYzhiLThlZTAtNDVlZS1hNzRmLWRkMmUzMGU4NDIyNyIsInJvbGUiOiJBZG1pbmlzdHJhdG9yIiwibmJmIjoxNzA1MjIyMzgwLCJleHAiOjE3MDU4MjcxODAsImlhdCI6MTcwNTIyMjM4MCwiaXNzIjoiY29yZS5jb20iLCJhdWQiOiJjb3JlLmNvbSJ9.N9lTKSb17ykYvvO9tFUQfuRtyy6riybTkTkYA7JkyJ8`
export const connectSignalR = (token)=>{
    let dataChannel;
    const connection = new HubConnectionBuilder()
    .withUrl("http://14.241.244.228:3021/RealTimeRobot",{
      // transport: HttpTransportType.WebSockets,
      accessTokenFactory: () => {
        // return token user
          return token
      }
  })
    .configureLogging(LogLevel.None)
    .build();
   
    connection.onclose(e => {
        console.log("signalR connect close")  
      });
    connection.start();
   return {connection};
}