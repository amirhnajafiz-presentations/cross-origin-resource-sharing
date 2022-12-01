import { useState } from 'react';
import './index.css';

function MyForm() {
  const [ip, setIp] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (ip === "") {
        return
    }

    alert(`The name you entered was: ${ip}`);
  }

  return (
    <form onSubmit={handleSubmit} className={"main_form"}>
    <label style={{display: "block"}}>
        <span className={"main_label"}>Enter your IP list</span>
        <input
          type="text"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
        />
      </label>
      <input className={"main_submit"} type="submit" value="Send" />
    </form>
  )
}

export {MyForm};