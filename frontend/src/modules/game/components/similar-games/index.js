import React from "react";
import {Cover} from "./Similar_game";
import {Header} from "semantic-ui-react";
import {Holder} from "./holder";
import "./styles.css";



const Similar = ({similar_games,isLoading})=>{
    return(<div className="similar">
        <Header className="white">Similar Games</Header>
        <section className="sec">
        {similar_games && !isLoading ? (
            <React.Fragment>
                <Holder className="similarGamesHolder" similar_games={similar_games}></Holder>
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