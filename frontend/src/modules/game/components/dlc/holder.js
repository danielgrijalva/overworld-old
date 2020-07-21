import React from "react";
import {Cover} from "./dlcs";
import "./styles.scss"


export const Holder = (({dlcs})=>{

    return(
     <div className="dlc-holder">
         {dlcs.map((g,i)=>{
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
