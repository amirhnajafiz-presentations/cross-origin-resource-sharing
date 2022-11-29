import { useState } from 'react';

function MyForm() {
  const [ip, setIp] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    alert(`The name you entered was: ${ip}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Enter your name:
        <input 
          type="text" 
          value={ip}
          onChange={(e) => setIp(e.target.value)}
        />
      </label>
      <input type="submit" value="Send" />
    </form>
  )
}

export {MyForm};