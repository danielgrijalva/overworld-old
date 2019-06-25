import React from "react";
import PropTypes from "prop-types";
import {
  Menu,
  Modal,
  Header,
  Form,
  Button,
  Checkbox,
  FormField
} from "semantic-ui-react";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import moment from "moment";
import { SingleDatePicker } from "react-dates";
import { connect } from "react-redux";
import Moment from "react-moment";
import Buttons from "./Buttons";
import Ratings from "./Rating";
import { LogIn } from "../../../app/components";
import "./styles.css";

class Actions extends React.Component {
  constructor() {
    super();
    this.state = {
      isModalActive: false,
      showDate: false,
      date: moment(),
      focused: false
    };
  }

  closeModal = () => {
    this.setState({ isModalActive: false });
  };

  handleChange = (event, { name, value }) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  };

  openModal = () => this.setState({ isModalActive: true });

  showDate = () =>
    this.setState(prevState => ({ showDate: !prevState.showDate }));

  render() {
    return (
      <Menu floated="right" icon="labeled" className="actions" vertical fluid>
        {this.props.isAuthenticated ? (
          <React.Fragment>
            <Menu.Item>
              <Buttons game={this.props.game} />
            </Menu.Item>
            <Menu.Item className="rate">
              Rate
              <Ratings game={this.props.game.id} />
            </Menu.Item>
            <Menu.Item link>
              <Modal
                size="mini"
                open={true}
                onClose={this.closeModal}
                trigger={
                  <Menu.Item
                    content="Review or log"
                    onClick={this.openModal}
                    link
                  />
                }
                closeIcon
                className="register"
              >
                <Modal.Content>
                  <Modal.Description>
                    <Header>I played...</Header>
                    <section className="game-header margin-bottom-sm">
                      <h2>{this.props.game.name}</h2>
                      <small className="release-date">
                        <Moment format="YYYY">
                          {this.props.game.first_release_date * 1000}
                        </Moment>
                      </small>
                    </section>
                    <section>
                      <Form>
                        <Form.Field>
                          <label>Specify the day you played it</label>
                          <SingleDatePicker
                            id="date"
                            numberOfMonths={1}
                            displayFormat="DD MMM YYYY"
                            date={this.state.date}
                            focused={this.state.focused}
                            noBorder={true}
                            readOnly={true}
                            hideKeyboardShortcutsPanel={true}
                            onDateChange={date => this.setState({ date: date })}
                            onFocusChange={({ focused }) =>
                              this.setState({ focused })
                            }
                          />
                        </Form.Field>
                        <Form.Field>
                          <label>Review</label>
                          <textarea name="review" />
                        </Form.Field>
                        <FormField>
                          <label>Rating</label>
                          <Ratings />
                        </FormField>
                        <FormField>
                          <Checkbox label="Contains spoilers" />
                        </FormField>
                      </Form>
                    </section>
                  </Modal.Description>
                </Modal.Content>
              </Modal>
            </Menu.Item>
            <Menu.Item content="Add to a list" link />
          </React.Fragment>
        ) : (
          <LogIn loginText="Sign in to log, rate or review..." />
        )}
        <Menu.Item content="Share..." link />
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
