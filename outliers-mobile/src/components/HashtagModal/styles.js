import { StyleSheet, Dimensions } from 'react-native';
import config from '@src/config';

const width = Dimensions.get('window').width - 60;
export default (styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentOuter: {
        width: width,
        backgroundColor: config.charcoal_grey
    },
    contentBox: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    heading: {
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: config.regularFont,
        marginBottom: 6,
        color: config.black
    },
    childComponent: {
        width: '100%'
        // paddingHorizontal: 10
    },
    modalFooterStyle: { width: '100%', minHeight: 26 },
    icon: {
        width: 66,
        height: 66,
        marginBottom: 12
    },
    buttonStyle: {
        // width: width,
        flex: 1,
        flexDirection: 'row',
        height: 54,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: config.charcoal_grey
    },
    backgroundContainer: {
        backgroundColor: config.charcoal_grey
    },
    modalText: {
        fontFamily: config.regularFont,
        fontSize: 13,
        fontWeight: '600',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'center',
        color: config.white
    }
}));
