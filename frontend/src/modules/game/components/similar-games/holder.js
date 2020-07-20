import React from "react";
import {Cover} from "./Similar_game";
import "./styles.css"


export const Holder = (({similar_games})=>{

    return(
     <div className="dlc-holder">
         {similar_games.map((g,i)=>{
                    try {
                        return (<Cover size="big" imageID={g.cover.image_id} slug={g.slug} key={i} id={g} name={g.name}/>)
                        
                    } catch (error) {
                        [...Array(6)].map((_, i) => (
                            <div key={i} className="placeholder" />
                        ))
                    }
                })}
     </div>   
    )
})
