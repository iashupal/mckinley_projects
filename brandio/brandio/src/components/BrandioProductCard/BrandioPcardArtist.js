import React from "react";
import Img from "react-image";
import "./BrandioProductCard.css";

function BrandioPcardArtist(props) {
    return (
        <div className="brandioartist__logo-box">
            <div>
                <a href={`https://mydio.collartt.com/artist/${props.id}`}>
                    <Img
                        src={[
                            props.path,
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRybg3HW8VXTdvKYbsQGRjvYA-3OEEJXz16fpUclHzJqk6tuapf"
                        ]}
                        className="brandioartist__logo"
                    />
                </a>
            </div>
            <div>
                <label className="brandioartist__name">{props.name}</label>
            </div>
        </div>
    );
}

export default BrandioPcardArtist;
