import React from "react";
import { Image } from "semantic-ui-react";
import "./styles.scss"


export const Cover = (({id ,size, imageID, slug, key, name})=>{
     const src=`https://images.igdb.com/igdb/image/upload/t_cover_${size}/${imageID}.jpg`

    return(
     <a key={id} className="cover-wrapper" href={`/games/${slug}`} target="_blank">
         <Image src={src} rounded alt={slug} className="cover" size="big"/>
         <div key={key} class="cover-overlay">
             <strong>{name}</strong>
         </div>
     </a>   
    )
})
