import React, { Component } from 'react'
import Image from 'react-native-image-progress';
import * as Progress from 'react-native-progress';

export default class ImageProgress extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        console.log(this.props)
        return (
            <Image
                {...this.props}
                indicator={Progress.Circle}
            />
        )
    }
}
