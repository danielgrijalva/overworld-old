import React from "react";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import moment from "moment";
import { connect } from "react-redux";
import Rating from "react-rating";
import { addJournalEntry } from "../../actions";
import { SingleDatePicker, isInclusivelyBeforeDay } from "react-dates";
import {
  Menu,
  Modal,
  Header,
  Form,
  Button,
  Checkbox,
  Icon,
  FormField,
  Grid
} from "semantic-ui-react";
import { Cover } from "../../../app/components/";
import Moment from "react-moment";
import "./styles.css";

const entryOptions = [
  { key: "f", text: "Finished", value: "Finished" },
  { key: "s", text: "Started", value: "Started" },
  { key: "p", text: "Played", value: "Played" },
  { key: "r", text: "Replayed", value: "Replayed" },
  { key: "a", text: "Abandoned", value: "Abandoned" }
];

class LogModal extends React.Component {
  constructor() {
    super();
    this.state = {
      isModalActive: false,
      specifyDate: false,
      date: moment(),
      focused: false,
      liked: false,
      spoilers: false,
      rating: null,
      review: "",
      type: "Finished",
      platform: ""
    };
  }

  openModal = () => this.setState({ isModalActive: true });

  closeModal = () => {
    this.setState({
      isModalActive: false,
      specifyDate: false,
      focused: false,
      liked: false,
      spoilers: false,
      rating: 0,
      review: "",
      type: "Finished",
      platform: ""
    });
  };

  showDateCheckbox = () => {
    this.setState(prevState => ({ specifyDate: !prevState.specifyDate }));
  };

  likeGame = () => {
    this.setState(prevState => ({ liked: !prevState.liked }));
  };

  handleRate = rating => {
    if (this.state.rating === rating) {
      this.setState({ rating: 0 });
    } else {
      this.setState({ rating });
    }
  };

  handleSpoilers = () => {
    this.setState(prevState => ({
      spoilers: !prevState.spoilers
    }));
  };

  handleReview = event => {
    this.setState({
      review: event.target.value
    });
  };

  handleTypeChange = (e, { value }) => {
    this.setState({ type: value });
  };

  handlePlatformChange = (e, { value }) => {
    this.setState({ platform: value });
  };

  handleSubmit = () => {
    const {
      specifyDate,
      date,
      liked,
      review,
      spoilers,
      rating,
      type,
      platform
    } = this.state;

    if (!specifyDate) {
      // if specifyDate is false, then it's not a journal entry
      // if there's no date but the user wrote a review, then it's a review
      // if there isn't neither a review or a date, then it's a normal log and the logGame
      // function should be called, along with the rateGame and likeGame if appropiate
      // TODO: this.props.createReview(something, something);
    } else {
      const data = {
        game: {
          id: this.props.game.id,
          name: this.props.game.name,
          slug: this.props.game.slug,
          coverId: this.props.game.cover.image_id,
          backdropId: this.props.game.screenshots[0].image_id
        },
        date: date.format("YYYY-MM-DD"),
        liked,
        review,
        spoilers,
        rating,
        entry_type: type.charAt(0),
        platform
      };
      this.props.addJournalEntry(data);
    }

    this.setState({ isModalActive: false });
  };

  getPlatformOptions = platforms => {
    const options = platforms.map(p => {
      return { key: p.id, text: p.name, value: p.name };
    });
    return options;
  };

  render() {
    return (
      <Modal
        closeIcon
        size="small"
        className="register log"
        open={this.state.isModalActive}
        onClose={this.closeModal}
        trigger={
          <Menu.Item content="Review or log" onClick={this.openModal} link />
        }
      >
        <Modal.Content>
          <Modal.Description>
            <Grid>
              <Grid.Row>
                <Grid.Column width={6}>
                  <Cover
                    size="big"
                    imageId={this.props.game.cover.image_id}
                    slug={this.props.game.slug}
                  />
                </Grid.Column>
                <Grid.Column width={10}>
                  <Header>I {this.state.type}...</Header>
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
                        {!this.state.specifyDate && (
                          <Checkbox
                            label={`Specify the day you ${this.state.type.toLowerCase()} it`}
                            onClick={this.showDateCheckbox}
                          />
                        )}
                        {this.state.specifyDate && (
                          <React.Fragment>
                            <Checkbox
                              label="on"
                              checked={this.state.specifyDate}
                              onClick={this.showDateCheckbox}
                            />
                            <SingleDatePicker
                              id="date"
                              displayFormat="DD MMM YYYY"
                              daySize={32}
                              numberOfMonths={1}
                              transitionDuration={0}
                              date={this.state.date}
                              focused={this.state.focused}
                              noBorder={true}
                              readOnly={true}
                              hideKeyboardShortcutsPanel={true}
                              onDateChange={date =>
                                this.setState({ date: date })
                              }
                              onFocusChange={({ focused }) =>
                                this.setState({ focused })
                              }
                              isOutsideRange={day =>
                                !isInclusivelyBeforeDay(day, moment())
                              }
                            />
                          </React.Fragment>
                        )}
                      </Form.Field>
                      <Form.Group widths="equal">
                        <Form.Field>
                          <Form.Select
                            onChange={this.handleTypeChange}
                            label={`Type (I ${this.state.type.toLowerCase()}...)`}
                            options={entryOptions}
                            placeholder="Finished"
                          />
                        </Form.Field>
                        <Form.Field>
                          <Form.Select
                            onChange={this.handlePlatformChange}
                            label="Platform"
                            options={this.getPlatformOptions(
                              this.props.game.platforms
                            )}
                            placeholder="Choose platform..."
                          />
                        </Form.Field>
                      </Form.Group>
                      <Form.Field>
                        <label>Review or thoughts?</label>
                        <textarea name="review" onChange={this.handleReview} />
                      </Form.Field>
                      <Grid>
                        <Grid.Row>
                          <Grid.Column width={12}>
                            <FormField>
                              <label>Rating</label>
                              <Rating
                                start={0}
                                stop={5}
                                className="stars"
                                emptySymbol="fa fa-star fa-2x"
                                fullSymbol="fa fa-star fa-2x"
                                fractions={2}
                                onClick={this.handleRate}
                                initialRating={this.state.rating}
                              />
                            </FormField>
                            <FormField>
                              <Checkbox
                                label="Contains spoilers"
                                onClick={this.handleSpoilers}
                              />
                            </FormField>
                          </Grid.Column>
                          <Grid.Column textAlign="center" width={4}>
                            <FormField>
                              <label>Like</label>
                              <Icon
                                link
                                size="large"
                                value="liked"
                                color={this.state.liked ? "orange" : null}
                                name="heart"
                                onClick={this.likeGame}
                              />
                            </FormField>
                            <FormField>
                              <Button
                                positive
                                content="Save"
                                onClick={this.handleSubmit}
                              />
                            </FormField>
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </Form>
                  </section>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default connect(null, { addJournalEntry })(LogModal);
