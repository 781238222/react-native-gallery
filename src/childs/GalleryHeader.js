import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    NativeModules,
} from 'react-native';
import {observer} from 'mobx-react/native';
import Back from '../components/Back';
import Touchable from '../components/Touchable';
import Picker from '../components/Picker';
import * as String from '../res/values/String'
import {observable, computed, action} from 'mobx';

@observer
export default class GalleryHeaderComponent extends Component {


    @observable
    isEditMode = false;

    //设置为编辑模式
    setIsEditMode = (isEditMode) => {
        this.isEditMode = isEditMode;
    }

    render() {
        const {onValueChange, onCancel} = this.props;
        return (
            <View
                style={{height:44,flexDirection:'row',backgroundColor:'#161616',justifyContent:'center'}}>
                <Back style={{width:56,height:44}} imageStyle={{width:20,height:16}}
                      source={require('../res/imgs/back.png')} navigation={this.props.navigation}
                      onPress={(result)=>{
                           if(!result){

                           }
                      }}/>
                <Picker
                    style={{flex:1}}
                    data={[String.__PHOTO_2K__,String.__VIDEO_2K__]}
                    onValueChange={onValueChange}
                    enable={this.isEditMode}/>

                {
                    this.isEditMode ? (
                        <Touchable
                            style={{width:56}}
                            onPress={()=>{
                                this.isEditMode = false;
                                if(onCancel){
                                    onCancel();
                                }
                            }}>
                            <Text
                                style={{color:'white',fontSize:17}}>{String.__CANCEL__}</Text>
                        </Touchable>
                    ) : (<View style={{width:56}}/>)
                }

            </View>
        );
    }
}

