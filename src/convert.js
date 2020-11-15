import React, { Component } from 'react';
import ReactJson from 'react-json-view'
import './convert.css'
import 'semantic-ui-css/semantic.min.css'
import writeJsonFile from 'write-json-file';
import { Button, Header, Input, Message } from 'semantic-ui-react'


class convert extends Component {

    constructor(props) {

        super(props);
        var initialOutput = {
            "Year": [{

            }]
        }
        this.state = {
            json: null,
            res: initialOutput,
            resCollapse: true,
            error:false
        }
    }

    handleChange = e => {
        if ((e.target.files.length) !== 0) {
            const fileReader = new FileReader();
            fileReader.readAsText(e.target.files[0], "UTF-8");
            fileReader.onload = e => {
                this.setState({ json: JSON.parse(e.target.result) });
            };
        }
    };

    handleClick = () => {
        if(this.state.json.Brands === undefined){
            this.setState({error:true});
        }
        else{
            this.setState({ error: false, res: this.convert(), resCollapse: false })
        }
    }

    convert = () => {
        let { json, res } = this.state;
        let brands = json.Brands[0];
        let out = res.Year[0];
        for (const [key, value] of Object.entries(brands)) {
            let years = value[0].Year[0];
            for (const [year, data] of Object.entries(years)) {
                if (out.hasOwnProperty(year)) {
                    out[year].push({ [key]: data });
                }
                else {
                    out[year] = [];
                    out[year].push({ [key]: data });
                }
            }
        }
        return res;
    }
    
    downloadClick = async () => {
        const { res } = this.state;
        await writeJsonFile('convertedFile.json', res);
    }

    render() {
        const { json, res, resCollapse, error } = this.state;
        return (
            <div className="App">
                <Header size='huge' className="title-header">
                    Hack-Fest Application
                </Header>
                <div>
                    <label for="myfile" className="label">Choose file to upload</label>
                    <Input type="file" id="myfile" name="myfile" accept="application/JSON" onChange={this.handleChange} />
                    <Button className="convertButton" primary disabled={json == null} onClick={this.handleClick}>Convert</Button>
                </div>
                {
                    error ?
                    <Message visible warning>Please select file of proper format</Message>
                    :
                    null
                }
                <div className="container">
                    {json == null ? null :
                        <div className="item">
                            <Header size='medium' className="jsonHeading">Original JSON</Header>
                            <ReactJson src={json} theme="monokai" collapsed={false} />
                        </div>
                    }
                    {
                        resCollapse || error ? null :
                            <div className="item">

                                <Header size='medium' className="jsonHeading">Converted JSON
                                    <span className="downloadJson">
                                        <a
                                            href={`data:text/json;charset=utf-8,${encodeURIComponent(
                                                JSON.stringify(res)
                                            )}`}
                                            download="convertedFile.json"
                                        >
                                            {`Download File`}
                                        </a>
                                    </span>
                                </Header>
                                <ReactJson src={res} theme="monokai" collapsed={resCollapse} />
                            </div>
                    }
                </div>
            </div>
        );
    }
}

export default convert;