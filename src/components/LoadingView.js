import React, { Component } from 'react';
import {
  View,
  Text,
  Animated,
  Image,
} from 'react-native';

export default class LoadingView extends Component{
  constructor(props){
    super(props);
    this.state={
      rotateValue:new Animated.Value(0),
    }
    this.startAnimation = this.startAnimation.bind(this);
  }
  startAnimation(){
    this.state.rotateValue.setValue(0);
    Animated.timing(this.state.rotateValue, {
          toValue: 1,  //角度从0变1
          duration: 1000,  //从0到1的时间
          // easing: Easing.out(Easing.linear),//线性变化，匀速旋转
        }).start( ()=>this.startAnimation() );
  }
  componentDidMount(){
    this.startAnimation();
  }
  render(){
    return(
        <Animated.Image
          style={[this.props.style,
            {
              transform: [
                {rotate: this.state.rotateValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '360deg'],
                })},]
              }
          ]}
          source={require('../res/imgs/loading.png')}>
        </Animated.Image>
    );
  }
}
