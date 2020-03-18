import React from "react";
// import article from "../../assets/images/article.jpeg";
import "./style.css";

function ArticleInfo({
  articleID,
  articleAuthorName,
  articleAuthorId,
  articleCountry,
  articleCity,
  articleDate,
  articleDays,
  articleNights,
  articleAccomodation,
  articleTransportation,
  articleTheme,
  articleAuthor,
  articleTravelTime,
  articleTravelPlace,
  articleTravelTransportation,
  articleTravelLabel,
  articleTravelPurchase,
  articleTravelCost,
  articleImg
}) {
  return (
    <div className="articleDescription">
      <div>
        <div className="articleImg">
          <img src={articleImg} alt="article" />
          <img src={articleImg} alt="article" />
        </div>
      </div>
      <div>
        <p className="articleContent">ArticleID : {articleID}</p>
        <p className="articleContent">Article AuthorName : {articleAuthorName}</p>
        <p className="articleContent">Article AuthorId : {articleAuthorId}</p>
        <p className="articleContent">Article Country : {articleCountry}</p>
        <p className="articleContent">Article City : {articleCity}</p>
        <p className="articleContent">Article Date : {articleDate}</p>
        <p className="articleContent">Article Days : {articleDays}</p>
        <p className="articleContent">Article Nights : {articleNights}</p>
        <p className="articleContent">Article Accomodation : {articleAccomodation}</p>
        <p className="articleContent">Article Transportation : {articleTransportation}</p>
        <p className="articleContent">Article Theme : {articleTheme}</p>
        <p className="articleContent">Article Author : {articleAuthor}</p>
        <p className="articleContent">Article Travel Time : {articleTravelTime}</p>
        <p className="articleContent">Article Travel Place : {articleTravelPlace}</p>
        <p className="articleContent">Article Travel Transportation : {articleTravelTransportation}</p>
        <p className="articleContent">Article Travel Label : {articleTravelLabel}</p>
        <p className="articleContent">Article Travel Purchase : {articleTravelPurchase}</p>
        <p className="articleContent">Article Travel Cost : {articleTravelCost}</p>
      </div>
    </div>
  );
}
export default ArticleInfo;
