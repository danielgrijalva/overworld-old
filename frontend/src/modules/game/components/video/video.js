import React from 'react'
import { Embed } from 'semantic-ui-react'
import PropTypes from "prop-types";
import "./styles.css";


const Video_holder = ({game})=>{
    var ID = null
    if(game.videos){
        const video_object=game.videos.find((video)=>{
            return video.name.toLowerCase().includes('trailer')  
        })
        ID=video_object.video_id
    }
    if(ID){
        return(<Embed id={ID} placeholder='../../../../../../public/earth.ico' brandedUI={false} source='youtube' active={true}></Embed>)
    }
    else{
        return(null)
    }
}
Video_holder.propTypes = {
    game: PropTypes.object.isRequired
}
export default Video_holder;