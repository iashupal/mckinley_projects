import React from "react";
import { artistAPI } from "../../services/ApiService";
import "./../Artist/Artist.css";
import HeaderContext from "../../context/HeaderContext";

// Import Components
import ArtistPhoto from "./ArtistPhoto";

class Artist extends React.Component {
  static contextType = HeaderContext;
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      artists: []
    };
  }
  componentDidMount() {
    this.loadArtist();
  }
  loadArtist = async () => {
    const resposne = await artistAPI.getArtists();
    if (resposne.status === 200) {
      this.setState({
        artists: resposne.data.Data.artists,
        loading: false
      });
    }
  };
  renderArtist() {
    return this.state.artists.map((artist, index) => {
      return (
        <ArtistPhoto
          name={artist.nickname}
          path={
            artist.profile_img === null || artist.profile_img === "null"
              ? require("../../assets/images/artist-1.svg")
              : artist.profile_img
          }
          key={index}
          id={artist.id}
        />
      );
    });
  }
  render() {
    const { lng, i18n } = this.context;
    return (
      <div className="artist">
        <div>
          <h3 className="artist__heading">ARTIST</h3>
        </div>

        <div className="artist__avatarlist" id="onlyhomepage">
          {this.renderArtist()}
        </div>

        <div className="text-center mb-100" style={{ paddingBottom: 70 }}>
          <button className="btn btn-primary" onClick={() => (window.location.href = "/artists")}>
            {i18n.t("misc.viewMore", { lng })}
          </button>
        </div>
      </div>
    );
  }
}

export default Artist;
