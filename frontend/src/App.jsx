import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Dashboard from './Dashboard';

function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);


  useEffect(() => {
    const callBackendAPI = async () => {
      try {
        const response = await fetch("http://localhost:3000/api");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const body = await response.json();
        setData(body.message);
      } catch (error) {
        console.log(error);
      }
    };
    callBackendAPI();
  }, []);

  return (
    <>
      <div>
        <Dashboard />
      </div>
    </>
  )
}

export default App
