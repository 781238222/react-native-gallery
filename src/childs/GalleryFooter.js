import React, {Component} from "react";
import {StyleSheet, View, Text, Image, TouchableOpacity, NativeModules} from "react-native";
import {observer} from "mobx-react/native";
import {observable, computed, action} from "mobx";
import Touchable from "../components/Touchable";
import EditMode from '../entity/EditMode'
import * as String from '../res/values/String'
@observer
export default class GalleryFooterComponent extends Component {



    //当前模式
    @observable
    currMode = EditMode.Normal;
    //是否全选
    @observable
    isSelectAll = false;

    //是否禁用分享
    @observable
    isShare = false;

    //是否禁用删除
    @observable
    isDelete = false;

    changeNormalMode = () => {
        this.currMode = EditMode.Normal;
    }
    setMode = (mode) => {
        this.currMode = mode;
    }
    setSelectAll = (isSelectAll) => {
        this.isSelectAll = isSelectAll;
    }


    //是否禁用分享功能
    setIsShare = (isShare) => {
        this.isShare = isShare;
    }
    //是否禁用删除功能
    setIsDelete = (isDelete) => {
        this.isDelete = isDelete;
    }

    //初始化数据
    init = () => {
        this.isSelectAll = false;
    }

    _createElement = () => {

        if (this.currMode == EditMode.Share) {
            return this._createShareElement();
        } else if (this.currMode == EditMode.Delete) {
            return this._createDeleteElement();
        } else {
            return this._createNormalElement();
        }
    }

    _createDeleteElement = () => {
        const {selectChange, deleteItems} = this.props;
        return (
            <View style={styles.container}>
                <Touchable
                    style={{paddingLeft:24,paddingRight:24}}
                    onPress={()=>{
                        if (deleteItems) {
                            deleteItems();
                        }
                    }}>
                    <Image style={styles.img}
                           source={require('../res/imgs/gallery_delete_se.png')}/>
                </Touchable>
                <View style={{flex:1}}/>
                <Touchable
                    style={{paddingLeft:24,paddingRight:24}}
                    onPress={()=>{
                        this.isSelectAll = !this.isSelectAll;
                        if(selectChange){
                            selectChange(this.isSelectAll);
                        }
                    }}>
                    <Text
                        style={{fontSize:17,color:'#060705'}}>{this.isSelectAll ? String.__CANCEL_SELECT__ : String.__SELECT_ALL__}</Text>
                </Touchable>
            </View>
        );
    }

    _onShare = (onShare, platform) => {
        if (onShare) {
            onShare(platform);
        }
    }

    _createShareElement = () => {
        return (null);
    }


    _onModeChange = () => {
        const {shareDisable, onModeChange} = this.props;

        if (onModeChange) {
            if (this.currMode == EditMode.Share && !shareDisable) {
                onModeChange(EditMode.Share);
            }
            if (this.currMode == EditMode.Delete) {
                onModeChange(EditMode.Delete);
            }
        }

    }

    _onClickNormalShare = () => {
        if (!this.isShare) {
            return;
        }
        this.currMode = EditMode.Share;
        this._onModeChange();
    }

    __onClickNormalDelete = () => {
        if (!this.isShare) {
            return;
        }
        this.init();
        this.currMode = EditMode.Delete;
        this._onModeChange();
    }

    _createNormalElement = () => {
        return (
            <View style={styles.container}>
                <Touchable
                    style={{flex:1}}
                    onPress={this._onClickNormalShare}>
                    <Image
                        style={styles.img}
                        source={this.isShare ? require('../res/imgs/gallery_share_se.png') : require('../res/imgs/gallery_share.png')}/>
                </Touchable >

                <Touchable
                    style={{flex:1}}
                    onPress={this.__onClickNormalDelete}>
                    <Image style={styles.img}
                           source={this.isDelete ? require('../res/imgs/gallery_delete_se.png') : require('../res/imgs/gallery_delete.png')}
                    />
                </Touchable>
            </View>
        );
    }

    render() {
        var element = this._createElement();
        return (
            <View>

                <View style={{height:StyleSheet.hairlineWidth,backgroundColor:'#CCCCCC'}}/>

                {element}

            </View>
        );
    }
}
const styles = StyleSheet.create({
    shareImg: {
        height: 25,
        width: 30,
    },
    shareImgContainer: {
        flex: 1
    },
    container: {
        height: 48,
        flexDirection: 'row',
        backgroundColor: 'white',
    },
    img: {
        width: 16,
        height: 19,
    }
});