import { NavigationActions } from 'react-navigation';

let _navigator;

const setTopLevelNavigator = navigatorRef => {
	_navigator = navigatorRef;
};

const navigate = (routeName, params) => {
	_navigator.dispatch(NavigationActions.navigate({ routeName, params }));
};

const goBack = () => {
	const backAction = NavigationActions.back();
	_navigator.dispatch(backAction);
};

export default {
	setTopLevelNavigator,
	navigate,
	goBack
};
