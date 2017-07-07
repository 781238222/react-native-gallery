import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Dimensions,
    NativeModules,
} from 'react-native';
import {observer} from 'mobx-react/native';
import {observable, action} from 'mobx';
import Touchable from '../components/Touchable';
import EditMode from '../entity/EditMode'
import Toast from '../components/Toast'
import * as String from '../res/values/String'
var WINDOW_WIDTH = Dimensions.get('window').width;

@observer
export default class ListItem extends Component {


    _onClickItem = () => {
        const {data, dataSelectChange, selectOnlyOne} = this.props;
        if (data.editMode == EditMode.Normal) {
            //跳转到预览界面
            Toast.show(String.__TO_PREVIEW__)
        } else if (data.editMode == EditMode.Share) {
            //跳转到分享界面
            Toast.show(String.__TO_SHARE__)
        } else if (data.editMode == EditMode.Delete) {
            data.selected = !data.selected;
            if (dataSelectChange) {
                dataSelectChange();
            }
        }
    }


    render() {
        const {data} = this.props;
        var tmbUri = 'file://' + data.thumbPath;
        var selectSource;
        if (data.editMode == EditMode.Share) {
            if (data.selected) {
                selectSource = require('../res/imgs/share_select.png');
            } else {
                selectSource = require('../res/imgs/share_unselect.png');
            }
        } else if (data.editMode == EditMode.Delete) {
            if (data.selected) {
                selectSource = require('../res/imgs/select.png');
            } else {
                selectSource = require('../res/imgs/choose.png');
            }
        }
        var height = WINDOW_WIDTH / 2;
        if (data.delete) {
            height = 0;
        }
        return (
            <View style={{width:WINDOW_WIDTH,height:height}}>
                <Touchable
                    style={{flex:1}}
                    onPress={this._onClickItem}>

                    <Image
                        style={{width:WINDOW_WIDTH,height:WINDOW_WIDTH/2,justifyContent:'center',alignItems:'center'}}
                        source={{uri:tmbUri}}>

                        {
                            //1:图片  2：视频
                            data.type == 2 ? (
                                <View style={{flex:1,width:WINDOW_WIDTH,justifyContent:'center',alignItems:'center'}}>
                                    <Image style={{width:50,height:50}}
                                           source={require('../res/imgs/play.png')}/>
                                    <View
                                        style={{flexDirection:'row',position:'absolute',left:24,bottom:12,right:0,alignItems:'center'}}>
                                        <Image style={{width:16,height:11,}}
                                               source={require('../res/imgs/video.png')}/>
                                        <Text style={{color:'white',fontSize:13,marginLeft:8}}>{data.timeLong}</Text>
                                    </View>
                                </View>
                            ) : (
                                <Image
                                    style={{width:16,height:13,position:'absolute',left:24,bottom:12}}
                                    source={require('../res/imgs/photo.png')}/>
                            )
                        }
                        {
                            data.selected ? (
                                <View style={[styles.layer,{width:WINDOW_WIDTH,height:WINDOW_WIDTH/2}]}/>
                            ) : (null)
                        }
                        {
                            data.editMode == EditMode.Delete ? (
                                <Image style={styles.selectImg}
                                       source={selectSource}/>
                            ) : (null)
                        }
                    </Image>
                </Touchable>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    selectImg: {
        height: 20,
        width: 20,
        position: 'absolute',
        top: 16,
        right: 16,
    },
    layer: {
        backgroundColor: '#00000080',
    }
})