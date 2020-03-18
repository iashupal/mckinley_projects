import React from 'react';
import {bool} from 'prop-types';
import {View, StyleSheet, ActivityIndicator} from 'react-native';

const WithLoaderStatus = WrappedComponent => {
  class WithLoaderStatusHOC extends React.Component {
    static navigationOptions = WrappedComponent.navigationOptions || {};
    static propTypes = {loading: bool.isRequired};

    render () {
      const {loading} = this.props;

      return (
        <React.Fragment>

          <WrappedComponent {...this.props} />
          {loading &&
            <View
              style={[
                StyleSheet.absoluteFill,
                {
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  justifyContent: 'center',
                },
              ]}
            >
              <ActivityIndicator size="large" />
            </View>}
        </React.Fragment>
      );
    }
  }

  return WithLoaderStatusHOC;
};

export default WithLoaderStatus;
