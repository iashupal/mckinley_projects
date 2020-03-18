import React from "react";
import Img from "react-image";
import "./../Artist/Artist.css";

function ArtistPhoto(props) {
    return (
        <div className="artist__photo-box">
            <a href={`https://mydio.collartt.com/artist/${props.id}`}>
                <Img
                    src={[
                        props.path,
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRybg3HW8VXTdvKYbsQGRjvYA-3OEEJXz16fpUclHzJqk6tuapf"
                    ]}
                    className="artist__photo"
                />
            </a>
            <label className="artist__name">{props.name}</label>
        </div>
    );
}

export default ArtistPhoto;
