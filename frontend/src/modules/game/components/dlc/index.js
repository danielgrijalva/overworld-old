import React from "react";
import {Cover} from "./dlcs";
import {Header} from "semantic-ui-react";
import {Holder} from './holder';
import "./styles.scss";



const DLC = ({dlcs,isLoading})=>{
    return(<div className="dlc">
        <section className="sec">
        {dlcs && !isLoading ? (
            <React.Fragment>
                <Header className="white">DLC</Header>
                <Holder className='testing' dlcs={dlcs}>
                </Holder>
            </React.Fragment>
        ):(
            null
        )}
    </section></div>)
}

export default DLC;