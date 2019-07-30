import React from "react";
import { Search, Label } from "semantic-ui-react";
import { getGenres } from "../../actions"
import { connect } from "react-redux";
import _ from "lodash";
import "./styles.css";

const initialState = {
  isLoading: false,
  results: [],
  value: "",
  activePicker: null
};

class GenreFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentWillMount(){
    if (this.props.genres.length == 0){
      this.props.getGenres()
    }
  }

  handleResultSelect = (e, { result }) => {
    this.setState({ value: result.name });
    this.props.setFilter(result, 'genre');
  };

  handleSearchChange = (e, { value }) => {
    //TODO update this to seach IGDB
    this.setState({ isLoading: true, value });
    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState);

      const re = new RegExp(_.escapeRegExp(this.state.value), "i");
      const isMatch = result => re.test(result.name);

      const results = _.filter(this.props.genres, isMatch).map(result => {
        return { ...result, key: result.id, title: result.name };
      });
      this.setState({
        isLoading: false,
        results: results
      });
    }, 300);
  };

  renderResults = genre => {
    return <Label key={genre.id} content={genre.name} />;
  };

  render() {
    const { isLoading, results, value } = this.state;
    return (
      <Search
        onResultSelect={this.handleResultSelect}
        onSearchChange={_.debounce(this.handleSearchChange, 500, {
          leading: true
        })}
        loading={isLoading}
        value={value}
        results={results}
        resultRenderer={this.renderResults}
        noResultsMessage={"No Genre Found"}
      />
    );
  }
}

const mapStateToProps = state => ({
  genres: state.gameBrowser.genres,
});
export default connect(
  mapStateToProps,
  { getGenres }
)(GenreFilter);

