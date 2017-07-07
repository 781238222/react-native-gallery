import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Animated,
    Image,
    NativeModules,
    Easing,
} from 'react-native';
import {observer} from 'mobx-react/native';
import {observable, computed, action, autorun} from 'mobx';

const _position = {
    TOP: 0,
    BOTTOM: 0,
    CENTER: 0
}

const _duration = {
    LONG: 3500,
    SHORT: 2000
}
let styles = StyleSheet.create({
    container: {
        position: 'absolute',
        height: 53,
        justifyContent: 'center',
        alignItems: 'center',
        right: 0,
        left: 0,
        backgroundColor: 'black',
    },
    error: {
        backgroundColor: '#790000',
    },
    top: {
        top: 0,
    },
    bottom: {
        bottom: 0,
    },
    center: {},
});


class ToastMobx {

    @observable
    isShow = false;

    message = '';

    isError = false;

    duration = _duration.SHORT;

    position = _position.TOP;


    @action
    show = (message, options = {position: _position.TOP, duration: _duration.SHORT, isError: false}) => {
        this.isShow = true;
        this.message = message;
        this.isError = options.isError;
        this.position = options.position || _position.TOP;
        this.duration = options.duration || _duration.SHORT;

    }

    @action
    hide = () => {
        this.isShow = false;
    }
}

export default Toast = new ToastMobx();

@observer
export class ToastContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            opacityValue: new Animated.Value(0.4),
        }
    }

    animDuration = 300;
    _startAnim = () => {
        Animated.timing(this.state.opacityValue,
            {
                toValue: 1,
                duration: this.animDuration,
                easing: Easing.out(Easing.ease)
            }).start(() => {
            setTimeout(() => this._hideAnim(), Toast.duration-this.animDuration*2)

        });
    }

    _hideAnim = ()=>{
        Animated.timing(this.state.opacityValue,
            {
                toValue: 0.4,
                duration: this.animDuration,
                easing: Easing.in(Easing.ease)
            }).start(() => {
            Toast.hide();
        });
    }

    render() {
        //,Toast.isError?styles.error:null,positionStyles,{opacity:Toast.opacityValue}
        var positionStyles = styles.top;
        if (Toast.position == _position.BOTTOM) {
            positionStyles = styles.bottom;
        } else if (Toast.position == _position.CENTRE) {
            positionStyles = styles.center;
        }
        if (Toast.isShow) {
            this._startAnim();
        }
        return (
            <View>
                {
                    Toast.isShow ? (
                        <Animated.View
                            style={[styles.container,Toast.isError?styles.error:null,{opacity:this.state.opacityValue}]}>
                            <Text style={{color:'white'}}>{Toast.message}</Text>
                        </Animated.View>) : (null)
                }
            </View>

        );
    }
}
