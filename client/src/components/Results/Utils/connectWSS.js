function connectToWSS(link){
    {if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {

  ws.current = new WebSocket(link);

  ws.current.onopen = () => {
    console.log("connected");
    ws.current.send("hey");
  };

  ws.current.onclose = () => {
    console.log("disconnected");
  };
  return () => {
    ws.current.close();
  };}

exports default connectToWSS;