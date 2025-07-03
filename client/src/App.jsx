import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [mensaje, setMensaje] = useState('');
  useEffect(() => {
    axios.get('http://localhost:5000/api/saludo')
      .then(response => setMensaje(response.data.mensaje))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h1>Frontend en React</h1>
      <p>{mensaje}</p>
    </div>
  );
}

export default App;
//
