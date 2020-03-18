import React from "react";
import { AppRegistry } from "react-native";
// import IdealSettingScreen from "@screens/IdealSettingScreen";
// import App from './src/components/Modals/ModalWithFooter.js';
// import App from '@components/Modals/SendCoffeeModal';
import App from "./App";
import { name as appName } from "./app.json";

AppRegistry.registerComponent(appName, () => App);
