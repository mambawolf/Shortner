import React, { useState } from 'react';
import './App.css';

function App() {

  //Declaring state variable for long url and short url
  const [longurl, setLongurl] = useState("");
  const [shorturl, setShorturl] = useState("");

  const [error,setError] = useState("");

  const onChangeHandler = event => {
    setLongurl(event.target.value);
  };


  //URL Shortner Function
  const url_shortner = () => {
    
    const encodedParams = new URLSearchParams();
    encodedParams.append("url", longurl);

    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': 'bca5bdd222msh9cf0061c3615c3bp1fe9e5jsnff5e773a0efc',
        'X-RapidAPI-Host': 'url-shortener-service.p.rapidapi.com'
      },
      body: encodedParams
    };

    fetch('https://url-shortener-service.p.rapidapi.com/shorten', options)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        setShorturl(response.result_url);
        setError(response.error);
      })
      .catch(err => {
        console.log(err)
        console.log(err.error);
        console.error(err);
      });

  }

  return (
    <div className="App">
      {/* Picture Logo section */}
      <div className='pic'>
        <img src='smalllight.PNG' alt='Logo' width={150} height={150} style={{border:'5px solid white'}}/>
      </div>
      {/* ------------------------------Heading Title-------------------------------- */}
      <div className='title'>
        <div className='titleHeading'>
          <h1>Shortner</h1>
        </div>
        <div className='tagline'>
          <p>Get your long url shortened with Shortner - The URL Shortner</p>
        </div>
      </div>

      {/* ------------------------------FORM Section---------------------------------- */}
      <div className='form'>
        &nbsp;&nbsp;<input className='inputdiv' style={{height:'45px',width:'550px',borderRadius:'10px',border:'none',padding:'4px 10px',fontSize:'15px'}} type="text" onChange={onChangeHandler} value={longurl} placeholder="Enter Long URL"/>
        &nbsp;
        <button onClick={url_shortner} className='buttons'>Convert</button>
      </div>
      
      {/*-------------------------------Result Section-------------------------------- */}
      {error?<div className='result'>
        {error&&<h1>{error}</h1>}  
      </div>
      :<div className='result'>
      {shorturl&&<h1>Short URL - {shorturl}</h1>}  
    </div>}
    </div>
  );
}

export default App;
