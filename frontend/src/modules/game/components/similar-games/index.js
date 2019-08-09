import React from "react";
import {Cover} from "./Similar_game";
import {Header} from "semantic-ui-react";
import "./styles.css";



const Similar = ({similar_games,isLoading})=>{
    return(<div className="similar">
        <Header className="white">Similar Games</Header>
        <section className="sec">
        {!isLoading ? (
            <React.Fragment>
                {similar_games.map((g,i)=>{
                    return (<Cover size="big" imageID={g.cover.image_id} slug={g.slug} key={i} id={g} name={g.name}/>)
                })}
            </React.Fragment>
        ):(
            <React.Fragment>
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="placeholder" />
                ))}
            </React.Fragment>
        )}
    </section></div>)
}

export default Similar;