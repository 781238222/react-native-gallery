/**
 * Created by 孟庆东 on 2017/3/27.
 */
import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    Image,
} from 'react-native';
import Touchable from './Touchable';
var StyleSheetPropType = require('StyleSheetPropType');
var ImageStylePropTypes = require('ImageStylePropTypes');

export default class Back extends Component {

    static propTypes = {
        //图片资源
        ...Image.props,
        imageStyle:StyleSheetPropType(ImageStylePropTypes),
        onPress: PropTypes.func,
    }

    _onPress = () => {
        const {navigation} = this.props;
        var result;
        if (navigation) {
            result = navigation.goBack();

        }
        const {onPress} = this.props;
        if (onPress) {
            onPress(result);
        }

    }

    render() {
        var props = Object.assign({}, this.props);
        props.imageStyle = [styles.image, props.imageStyle];
        return (
            <Touchable style={props.style}
                       onPress={this._onPress}>
                <Image style={props.imageStyle} source={this.props.source}/>
            </Touchable>
        );
    }
}

const styles = StyleSheet.create({
        image: {
        },
    }
)