import React from "react";
import "./App.css";
import BusinessList from "../BusinessList/BusinessList";
import SearchBar from "../SearchBar/SearchBar";
import Yelp from "../../util/Yelp";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      businesses: [],
      business: "",
      location: "",
      clicked: false
    };
    this.searchYelp = this.searchYelp.bind(this);
    this.setBusiness = this.setBusiness.bind(this);
    this.setLocation = this.setLocation.bind(this);
  }

  searchYelp(term, location, sortBy) {
    Yelp.search(term, location, sortBy)
      .then(businesses => {
        this.setState({
          businesses: businesses,
          clicked: true
        });
      });
  }

  setBusiness(business) {
    this.setState({ business: business });
  }

  setLocation(location) {
    this.setState({ location: location });
  }

  render() {
    return (
      <div className="App">
        <h1>Ravenous</h1>
        <SearchBar searchYelp={this.searchYelp} setBusiness={this.setBusiness} setLocation={this.setLocation} />
        {
          this.state.businesses && this.state.businesses.length > 0
            ? <BusinessList businesses={this.state.businesses} />
            : (this.state.business && this.state.location && this.state.clicked)
              ? <h1>Nothing was found</h1>
              : <h1>Try searching for a business</h1>
        }
      </div>
    );
  }
}

export default App;