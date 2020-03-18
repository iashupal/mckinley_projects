import React from 'react';
import CustomScrollbars from 'util/CustomScrollbars';

const languageData = [
  {
    languageId: 'korean',
    locale: 'ko',
    name: 'Korean',
    icon: 'kr',
  },
  {
    languageId: 'english',
    locale: 'en',
    name: 'English',
    icon: 'us',
  },
];

const LanguageItem = ({ language, switchLanguage, handleRequestClose, authUser }) => {
  const { icon, name } = language;
  return (
    <li>
      <span
        className="pointer"
        onClick={() => {
          handleRequestClose();
          switchLanguage({ locale: language, authUser });
        }}
        role="button"
        tabIndex="-1"
      >
        <div className="d-flex align-items-center">
          <span style={{ width: '20px', height: '20px' }}>
            {icon === 'kr' && <img src="assets/images/flag_kr.png" alt="" />}
            {icon === 'us' && <img src="assets/images/flag_us.png" alt="" />}
          </span>
          <h4 className="mb-0 ml-2">{name}</h4>
        </div>
      </span>
    </li>
  );
};

const LanguageSwitcher = ({ switchLanguage, handleRequestClose, authUser }) => {
  return (
    <CustomScrollbars className="messages-list language-list scrollbar" style={{ height: 75 }}>
      <ul className="list-unstyled">
        {languageData.map((language, index) => (
          <LanguageItem
            key={index}
            language={language}
            handleRequestClose={handleRequestClose}
            switchLanguage={switchLanguage}
            authUser={authUser}
          />
        ))}
      </ul>
    </CustomScrollbars>
  );
};

export default LanguageSwitcher;
