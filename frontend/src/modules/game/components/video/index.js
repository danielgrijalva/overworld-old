import React from 'react'
import { Embed } from 'semantic-ui-react'
import PropTypes from "prop-types";

const Video = ({game})=>{
    var ID = null
    game.videos.map(v=>{
        if(v.name.toLowerCase().includes('trailer')){
            ID=v.video_id
        }
    })
    if(ID!==null){
        return(<Embed id={ID} placeholder='../../../../../../public/earth.ico' brandedUI={false} source='youtube' active={true}></Embed>)
    }
    else{
        return(null)
    }
}
Video.propTypes = {
    game: PropTypes.object.isRequired
}
export default Video;