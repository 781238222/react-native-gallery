/**
 * 删除相册数据 确认
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Modal,
    Dimensions,
} from 'react-native';
import * as String from '../res/values/String';
import XModal from './XModal'
import Touchable from '../components/Touchable'
var WINDOW_WIDTH = Dimensions.get('window').width-20;


export default class DeleteGalleryModal extends XModal {

    createComponent() {
        const {deleteFun} = this.props;
        return (
            <View style={{flex:1,justifyContent:'flex-end',}}>

                <Touchable
                    style={{borderRadius:3,backgroundColor:'white',height:60,width:WINDOW_WIDTH}}
                    onPress={()=>{
                       deleteFun();
                       this.hide();
                     }}>
                    <Text style={{fontSize:20,color:'#E4364A'}}>{String.__DELETE__}</Text>
                </Touchable>

                <Touchable
                    style={{borderRadius:3,backgroundColor:'white',height:60,marginTop:8,width:WINDOW_WIDTH}}
                    onPress={()=>{
                         this.hide();
                     }}>
                    <Text style={{fontSize:20,color:'#0076FF'}}>{String.__CANCEL__}</Text>
                </Touchable>
            </View>
        );
    }

}
