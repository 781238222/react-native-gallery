/**
 * Created by 孟庆东 on 2017/3/28.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Modal,
    BackAndroid,
    TouchableOpacity,
} from 'react-native';

export default class XModal extends Component {

    state ={
        visible:false,
    }

    isNavigator = false;

    hide = () => {
        this.setState({
            visible:false,
        });
    }

    show = ()=>{
        this.setState({
            visible:true,
        });
    }

    //子类实现此方法
    createComponent() {
        return (<View />);
    }

    _createComponent() {
        var element = '';
        var child = this.createComponent();
        if (this.isNavigator) {
            element = child;
        } else {
            var containerStyle = {
                flex: 1,
                backgroundColor: '#00000080',
                justifyContent: 'center',
                alignItems: 'center',
            }
            if (child && child.props && child.props.style) {
                Object.assign(containerStyle, child.props.style);
            }
            element = (
                <View style={containerStyle}>
                    {child}
                </View>
            );
        }
        return element;
    }

    render() {
        if(this.state.visible){
            var element = this._createComponent();

            return (
                <Modal
                    animationType={"fade"}
                    transparent={true}
                    onRequestClose={()=>{}}
                    visible={this.state.visible}>
                    {element}
                </Modal>
            );
        }else{
            return null;
        }

    }
}