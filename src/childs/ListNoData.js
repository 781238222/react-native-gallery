import React, { Component,PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';
import * as String from '../res/values/String'
import Touchable from '../components/Touchable'
export default class ListNoData extends Component{

  render(){
    return(
      <View style={{flex:1,alignItems:'center',marginTop:158}}>
        <Image style={{height:50,width:50}} source={require('../res/imgs/gallery_empty.png')}/>
        <Touchable
          style={{width:190,height:42,justifyContent:'center',alignItems:'center',backgroundColor:'#E4364A',marginTop:38}}
          onPress={()=>{

          }}>
          <Text style={{color:'white',fontSize:15}}>{String.__TO_CAMERA__}</Text>
        </Touchable>
      </View>
    );
  }
}
