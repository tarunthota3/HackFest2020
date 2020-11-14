import React, {useState} from "react";
import './App.css';

function App() {

  let initialOutput = {
    "Year": [{

    }]
  }
  const [json, setJson] = useState({});
  const [res, setRes] = useState(initialOutput);
  const handleChange = e => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = e => {
      setJson(JSON.parse(e.target.result));
    };
  };
  const handleClick = () =>{
    // console.log("handleClicked", json.Brands[0]);
    console.log("output: ", convert(json));
    console.log("res: ", res);
    // setRes(convert(json));
  }

  const convert = () =>{
    let brands = json.Brands[0];
    let out = res.Year[0];
    for (const [key, value] of Object.entries(brands)) {
      // console.log(key, ": ", value[0].Year[0]);
      let years = value[0].Year[0];
      for (const [year, data] of Object.entries(years)) {
        // console.log(year, ": ", data);
        if(out.hasOwnProperty(year)){
          console.log("if: ", key);
          out[year].push({[key]:data});
        }
        else{
          // console.log("else: ", key);
          out[year] = [];
          out[year].push({[key]:data});
        }
      }
    }
    return out;
  }

  console.log("res: ", res);
  return (
    <div className="App">
      <header className="App-header">
        <label for="myfile">Select a file:</label>
        <input type="file" id="myfile" name="myfile" onChange={handleChange}/>
        <button type = "button" onClick={handleClick}>Convert</button>
      </header>
    </div>
  );
}

export default App;
