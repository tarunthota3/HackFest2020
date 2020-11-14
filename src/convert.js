import React, { Component } from 'react';
import ReactJson from 'react-json-view'
// import JSONTree from 'react-json-tree'
import './convert.css'

class convert extends Component {

    constructor(props) {

        super(props);
        var initialOutput = {
            "Year": [{
        
            }]
          }
        this.state = {
            json: {},
            res :initialOutput
        }
    }

    handleChange = e => {
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = e => {
            this.setState({json: JSON.parse(e.target.result)});
        };
    };

    handleClick = () =>{
        this.setState({res: this.convert()})
    }
    convert = () => {
        let {json, res} = this.state;
        let brands = json.Brands[0];
        let out = res.Year[0];
        for (const [key, value] of Object.entries(brands)) {
          let years = value[0].Year[0];
          for (const [year, data] of Object.entries(years)) {
            if(out.hasOwnProperty(year)){
            //   console.log("if: ", key);
              out[year].push({[key]:data});
            }
            else{
              out[year] = [];
              out[year].push({[key]:data});
            }
          }
        }
        return res;
      }

    
    render() {
        console.log("this.state: ", this.state);
        const {json, res} = this.state;
        return (
            <div className="App">
                <header className="App-header">
                    <label for="myfile">Select a file:</label>
                    <input type="file" id="myfile" name="myfile" onChange={this.handleChange}/>
                    <button type = "button" onClick={this.handleClick}>Convert</button>
                </header>
                <div className="container">
                    <div className="item">
                        <ReactJson src={json} theme="monokai" />
                    </div>
                    <div className="item">
                        <ReactJson src={res} theme="monokai" collapsed={true} />
                    </div>
                </div>
                {/* <JSONTree data={res} /> */}
            </div>
        );
    }
}

export default convert;