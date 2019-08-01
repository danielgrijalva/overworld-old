import React from 'react';
import { Embed,Button,Header,Modal,Image,Icon } from 'semantic-ui-react';
import PropTypes from "prop-types";
import Video_holder from "./video";
import "./styles.css";

const Video = ({game})=>{
    return(<Modal className="video-con" size="small" trigger={<Button className="trailer-button" basic fluid color="grey"><Icon name="play circle outline"></Icon>Watch Trailer</Button>}>
    <Modal.Content className="modal-con"embed >
      {
        game.videos.map(v=>{
          return(
            <Video_holder game={game}></Video_holder>
          )
        })
      }
    </Modal.Content>
    </Modal>)  
}
Video.propTypes = {
    game: PropTypes.object.isRequired
}
export default Video;