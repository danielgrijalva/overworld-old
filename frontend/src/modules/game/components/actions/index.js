import React from "react";
import PropTypes from "prop-types";
import { Menu, Icon, Popup } from "semantic-ui-react";
import { connect } from "react-redux";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { LogIn } from "../../../app/components";
import LogModal from "../log-modal";
import Buttons from "./Buttons";
import Ratings from "./Rating";
import "./styles.css";

class Actions extends React.Component {
  constructor() {
    super();
    this.state = {
      hover: false,
      copyLink: false,
      copyLinkText: '',
      backgroundColor: ''
    };
  }

  componentDidMount() {
    this.setState({ copyLinkText: `https://overworld.netlify.com/games/${this.props.game.slug}` });
  }

  handleChange = (event, { name, value }) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  };

  handleToggleHover = () => {
    if (this.state.hover === false) {
      this.setState({ copyLink: false, backgroundColor: '#2D3742' });
    }
    this.setState({hover: !this.state.hover});
  }

  handleCopyLink = () => {
    this.setState({ copyLink: true, backgroundColor: '#3FC2F9' });
  }

  render() {
    let url = `https://overworld.netlify.com/games/${this.props.game.slug}`;
    return (
      <Menu floated="right" icon="labeled" className="actions" vertical fluid>
        {this.props.isAuthenticated ? (
          <React.Fragment>
            <Menu.Item>
              <Buttons game={this.props.game} />
            </Menu.Item>
            <Menu.Item className="rate">
              Rate
              <Ratings game={this.props.game} />
            </Menu.Item>
            <LogModal game={this.props.game} />
            <Menu.Item content="Add to a list" link />
          </React.Fragment>
        ) : (
          <LogIn loginText="Sign in to log, rate or review..." />
        )}
        {
          this.state.hover ? (
            <Menu.Item onMouseLeave={this.handleToggleHover} link >
              <div>
                <Popup content='Click to copy' trigger={<CopyToClipboard text={this.state.copyLinkText} onCopy={this.handleCopyLink}>
                  <p style={{ padding: '2%', marginRight: '2%', wordWrap: 'break-word', borderRadius: '4px', background: this.state.backgroundColor, border: '0.5px solid #2D3742' }}>
                    {url}
                  </p>
                </CopyToClipboard>} />
                <a href={url}><Icon link name='twitter'  size="large" /></a>
                <a href={url}><Icon link name='facebook'  size="large" /></a>
                <a href={url}><Icon link name='reddit'  size="large" /></a>
                <a href={url}><Icon link name='mail'  size="large" /></a>
              </div>
            </Menu.Item> 
          ) : 
            <Menu.Item content="Share..." onMouseEnter={this.handleToggleHover} link />
        }
      </Menu>
    );
  }
}

Actions.propTypes = {
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object,
  game: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Actions);
