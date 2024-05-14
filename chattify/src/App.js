import './App.css';

function App() {
  fetch("http://localhost:5000/").then((res)=>res.json()).then(data=>console.log(data)).catch((e)=>console.log(e));
  return (
    <div className="App">
     
    </div>
  );
}

export default App;
