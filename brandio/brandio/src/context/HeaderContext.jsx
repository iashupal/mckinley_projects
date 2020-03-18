import React, { Component } from "react";
import i18n from "../translations/i18n";

const defaultState = {
    headerName: "",
    headerNameHandler: () => {},
    lng: "",
    handleLanguageChange: () => {},
    i18n
};

const HeaderContext = React.createContext(defaultState);

class HeaderProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headerName: "Brandio",
            headerNameHandler: name => this.headerNameHandler(name),
            lng: "ko",
            handleLanguageChange: name => this.handleLanguageChange(name),
            i18n
        };
    }

    componentDidMount = async () => {
        if (localStorage.getItem("lan") === null) {
            this.setState({ lng: "ko" });
            localStorage.setItem("lan", "ko");
        } else {
            const lan = await localStorage.getItem("lan");
            this.setState({ lng: lan });
        }
        //console.log("from local storage", lan);
        i18n.on("languageChanged", this.onLanguageChanged);
    };

    componentWillUnmount() {
        i18n.off("languageChanged", this.onLanguageChanged);
    }

    handleLanguageChange = lng => {
        this.setState({ lng });
        localStorage.setItem("lan", lng);
    };

    headerNameHandler = headerName => {
        this.setState({ headerName });
    };

    render() {
        const { children } = this.props;
        return (
            <HeaderContext.Provider value={this.state}>
                {children}
            </HeaderContext.Provider>
        );
    }
}

export default HeaderContext;

export { HeaderProvider };
