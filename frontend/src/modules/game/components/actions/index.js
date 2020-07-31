import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Menu, Popup } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { BitlyClient } from "bitly-react";
import { LogIn } from "../../../app/components";
import LogModal from "../log-modal";
import Buttons from "./Buttons";
import Ratings from "./Rating";
import "./styles.scss";

class Actions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShareHovered: false,
      shortUrl: "",
      isUrlCopied: false,
    };
  }

  componentDidMount() {
    const { match } = this.props;
    // const pageUrl = `${process.env.REACT_APP_API_URL}${match.url}`
    const pageUrl = `https://overworld.netlify.app${match.url}`;

    // -------- oooo please get your own bitly access token ----------

    const bitly = new BitlyClient(
      "f41a79aeabe8a2f0ae47b0ac7c1d579c9fe7a9d9",
      {},
    );
    this.getShortUrl(pageUrl, bitly);
  }

  getShortUrl = async (pageUrl, bitly) => {
    let result;
    // console.log("page url",pageUrl)
    try {
      result = await bitly.shorten(pageUrl);
      // console.log("result", result)
      if (result) {
        this.setState({
          shortUrl: result.url,
        });
      }
    } catch (e) {
      console.error("Api error", e);
      throw e;
    }
    return result;
  };

  handleChange = (event, { name, value }) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  };

  handleUrlCopiedCick = () => {
    this.setState({
      isUrlCopied: true,
    });
  };

  onMouseOver = () => {
    this.setState({
      isShareHovered: true,
    });
  };

  onMouseLeave = () => {
    this.setState({
      isShareHovered: false,
      isUrlCopied: false,
    });
  };

  render() {
    const { isShareHovered, shortUrl, isUrlCopied } = this.state;
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

        <Menu.Item
          link
          onMouseOver={this.onMouseOver}
          onMouseLeave={this.onMouseLeave}
        >
          {!isShareHovered && <div>Share</div>}
          {isShareHovered && (
            <Fragment>
              <CopyToClipboard text={shortUrl}>
                <div
                  onClick={(e) => this.handleUrlCopiedCick(e)}
                  style={{
                    backgroundColor: "#424344",
                    wordWrap: "unset",
                    padding: "1.5px",
                    borderRadius: "3px",
                    fontSize: "10px",
                    width: "120px",
                    display: "inline-block",
                  }}
                >
                  {shortUrl}
                </div>
              </CopyToClipboard>
              {isUrlCopied && (
                <span style={{ fontSize: "12px", color: "#6de157" }}>
                  &nbsp;&nbsp;Copied!
                </span>
              )}
            </Fragment>
          )}
        </Menu.Item>
      </Menu>
    );
  }
}

Actions.propTypes = {
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object,
  game: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
});

export default withRouter(connect(mapStateToProps)(Actions));
