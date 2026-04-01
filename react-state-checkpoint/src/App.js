import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    // Store the person data and the UI state in the same class component.
    this.state = {
      Person: {
        fullName: "Kylian Mbappe",
        nationality: "France",
        bio: "A fast and clinical striker known for his movement, power, and finishing.",
        imgSrc:
          "https://commons.wikimedia.org/wiki/Special:FilePath/Kylian%20Mbapp%C3%A9%20%28cropped%29.jpg",
        profession: "Professional Footballer",
      },
      shows: false,
      mountedSeconds: 0,
    };
  }

  componentDidMount() {
    // Start the timer as soon as the component is mounted.
    this.intervalId = setInterval(() => {
      this.setState((prevState) => ({
        mountedSeconds: prevState.mountedSeconds + 1,
      }));
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  toggleProfile = () => {
    this.setState((prevState) => ({
      shows: !prevState.shows,
    }));
  };

  render() {
    const { Person, shows, mountedSeconds } = this.state;
    const { fullName, bio, imgSrc, profession, nationality } = Person;

    return (
      <main className="App">
        <div className="profile-wrapper">
          <h1>React State Checkpoint</h1>
          <p className="timer-text">
            Time since mount: {mountedSeconds} seconds
          </p>

          <button className="toggle-button" onClick={this.toggleProfile}>
            {shows ? "Hide Profile" : "Show Profile"}
          </button>

          {shows && (
            <div className="profile-card">
              <img
                className="profile-image"
                src={imgSrc}
                alt={fullName}
                style={{
                  height: "280px",
                  objectFit: "cover",
                }}
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <h2>{fullName}</h2>
              <p>
                <strong>Nationality:</strong> {nationality}
              </p>
              <p>
                <strong>Profession:</strong> {profession}
              </p>
              <p>
                <strong>Bio:</strong> {bio}
              </p>
            </div>
          )}
        </div>
      </main>
    );
  }
}

export default App;
