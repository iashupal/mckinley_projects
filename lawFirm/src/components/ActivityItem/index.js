import React from 'react';

function ActivityItem(props) {
  return (
    <div>
      <i className="material-icons icon-color">{props.icon}</i>
      <p>
        <b>{props.name}</b> {props.addedItem} 추가 <b> {props.addedItem}명</b> {props.time}
      </p>
    </div>
  );
}

export default ActivityItem;
