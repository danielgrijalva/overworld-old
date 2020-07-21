import React from "react";
import {Cover} from "./expansions"
import {Header} from "semantic-ui-react";
import "./styles.scss";



const Expansions = ({expansions,isLoading})=>{
    return(<div className="dlc">
        <section className="sec">
        {expansions && !isLoading ? (
            <React.Fragment>
                <Header className="white">DLC</Header>
                {expansions.map((g,i)=>{
                     try {
                        return (<Cover size="big" imageID={g.cover.image_id} slug={g.slug} key={i} id={g} name={g.name}/>)
                        
                    } catch (error) {
                        [...Array(6)].map((_, i) => (
                            <div key={i} className="placeholder" />
                        ))
                    }
                })}
            </React.Fragment>
        ):(
            null
        )}
    </section></div>)
}

export default Expansions;