import React, { Component } from 'react';
import jsonData from '../api/data.json';
import { jokes } from '../api/jokes.js';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      searchString: '',
      joke: '',
    };
  }

  componentDidMount() {
    document.documentElement.lang = 'en';
    jokes.getOne().then(jokeReceived => this.setState({ joke: jokeReceived }));
  }

  calculateDuration(dateString2, dateString1) {
    let date1 = new Date(dateString1.split(' ')[0] + ' 1 ' + dateString1.split(' ')[1] + ' 00:00:00');
    let date2 = new Date(dateString2.split(' ')[0] + ' 1 ' + dateString2.split(' ')[1] + ' 00:00:00');
    let diff = (date2.getTime() - date1.getTime()) / 1000;
    diff /= (60 * 60 * 24 * 7 * 4);
    return Math.abs(Math.ceil(diff));
  }

  renderSearchResults(e) {
    if (e != undefined) {
      if (e.target.name === 'searchString') {
        e.preventDefault();
        this.setState({ searchString: e.target.value });
      }
    }
  }

  render() {

    let filteredExperiences = jsonData.work_experiences
      .filter((experience) => {
        return (experience.job_title.replace(/\s/g, "").toUpperCase().includes(this.state.searchString.replace(/\s/g, "").toUpperCase()))
      })

    let filteredExpDuration = filteredExperiences.reduce((totalDuration, experience) => {
      let expDuration = this.calculateDuration(experience.end_date, experience.start_date);
      experience.duration = expDuration;
      return totalDuration + expDuration;
    }, 0);

    return (
      <section className="app">
        <div className="app__search-box">
          <hr />
          <input type="text" aria-label="Type to search" ref="textInput" name="searchString" placeholder="Type to search" value={this.state.searchString} onChange={this.renderSearchResults.bind(this)} />
          <hr />
        </div>
        <div className="app__content">
          <div className="app__joke">
            <h1>Joke:</h1>
            <h3>{this.state.joke}</h3>
          </div>
          <span className="app__experiences">
            <div className="app__exp">
              {filteredExperiences
                .map((experience, index) => {
                  return (<div key={index}>{experience.job_title}<br /> Duration(Months): {experience.duration}</div>)
                })}

            </div>
            <div>Total duration: {filteredExpDuration} Months ≈ ({(filteredExpDuration / 12).toFixed(1)} Years) </div>
          </span>
        </div>
      </section>
    );
  }
}

// App.propTypes = {
//   // parkingLots: PropTypes.array.isRequired
// };

export default App;