import React, {Component} from "react";
import {
    StyleSheet,
    View,
    ScrollView,
    Dimensions,
    DeviceEventEmitter
} from "react-native";
import GalleryItem from "../childs/GalleryItem";
import GalleryHeader from "../childs/GalleryHeader";
import GalleryFooter from "../childs/GalleryFooter";
import {observer} from "mobx-react/native";
import {observable} from "mobx";
import EditMode from "../entity/EditMode";
import {ToastContainer} from '../components/Toast'
var WIDTH = Dimensions.get('window').width;

var photoData = [
{"dateStr":"2017-07-06","name":"20170706101548.jpg","path":"/storage/emulated/0/sone/photo2/20170706101548.jpg","thumbPath":"/storage/emulated/0/sone/photo2/20170706101548.tmb","type":1},
{"dateStr":"2017-07-06","name":"20170706101537.jpg","path":"/storage/emulated/0/sone/photo2/20170706101537.jpg","thumbPath":"/storage/emulated/0/sone/photo2/20170706101537.tmb","type":1},
{"dateStr":"2017-07-05","name":"20170705140534.jpg","path":"/storage/emulated/0/sone/photo2/20170705140534.jpg","thumbPath":"/storage/emulated/0/sone/photo2/20170705140534.tmb","type":1},
{"dateStr":"2017-07-05","name":"20170705140522.jpg","path":"/storage/emulated/0/sone/photo2/20170705140522.jpg","thumbPath":"/storage/emulated/0/sone/photo2/20170705140522.tmb","type":1},
{"dateStr":"2017-07-05","name":"20170705140445.jpg","path":"/storage/emulated/0/sone/photo2/20170705140445.jpg","thumbPath":"/storage/emulated/0/sone/photo2/20170705140445.tmb","type":1},
{"dateStr":"2017-07-04","name":"20170704161209.jpg","path":"/storage/emulated/0/sone/photo2/20170704161209.jpg","thumbPath":"/storage/emulated/0/sone/photo2/20170704161209.tmb","type":1},
{"dateStr":"2017-07-04","name":"20170704160900.jpg","path":"/storage/emulated/0/sone/photo2/20170704160900.jpg","thumbPath":"/storage/emulated/0/sone/photo2/20170704160900.tmb","type":1},
{"dateStr":"2017-07-04","name":"20170704160721.jpg","path":"/storage/emulated/0/sone/photo2/20170704160721.jpg","thumbPath":"/storage/emulated/0/sone/photo2/20170704160721.tmb","type":1},
{"dateStr":"2017-07-04","name":"20170704153736.jpg","path":"/storage/emulated/0/sone/photo2/20170704153736.jpg","thumbPath":"/storage/emulated/0/sone/photo2/20170704153736.tmb","type":1},
{"dateStr":"2017-07-04","name":"20170704145245.jpg","path":"/storage/emulated/0/sone/photo2/20170704145245.jpg","thumbPath":"/storage/emulated/0/sone/photo2/20170704145245.tmb","type":1},
{"dateStr":"2017-07-04","name":"20170704145234.jpg","path":"/storage/emulated/0/sone/photo2/20170704145234.jpg","thumbPath":"/storage/emulated/0/sone/photo2/20170704145234.tmb","type":1},
{"dateStr":"2017-07-04","name":"20170704145224.jpg","path":"/storage/emulated/0/sone/photo2/20170704145224.jpg","thumbPath":"/storage/emulated/0/sone/photo2/20170704145224.tmb","type":1},
{"dateStr":"2017-07-04","name":"20170704145207.jpg","path":"/storage/emulated/0/sone/photo2/20170704145207.jpg","thumbPath":"/storage/emulated/0/sone/photo2/20170704145207.tmb","type":1},
{"dateStr":"2017-07-04","name":"20170704143712.jpg","path":"/storage/emulated/0/sone/photo2/20170704143712.jpg","thumbPath":"/storage/emulated/0/sone/photo2/20170704143712.tmb","type":1},
{"dateStr":"2017-07-04","name":"20170704122215.jpg","path":"/storage/emulated/0/sone/photo2/20170704122215.jpg","thumbPath":"/storage/emulated/0/sone/photo2/20170704122215.tmb","type":1},
{"dateStr":"2017-07-04","name":"20170704121709.jpg","path":"/storage/emulated/0/sone/photo2/20170704121709.jpg","thumbPath":"/storage/emulated/0/sone/photo2/20170704121709.tmb","type":1},
{"dateStr":"2017-06-28","name":"20170628175059.jpg","path":"/storage/emulated/0/sone/photo2/20170628175059.jpg","thumbPath":"/storage/emulated/0/sone/photo2/20170628175059.tmb","type":1},
{"dateStr":"2017-06-28","name":"20170628175056.jpg","path":"/storage/emulated/0/sone/photo2/20170628175056.jpg","thumbPath":"/storage/emulated/0/sone/photo2/20170628175056.tmb","type":1}];


var videoData = [
    {"dateStr":"2017-07-04","name":"20170704160230.mp4","path":"/storage/emulated/0/sone/video2/20170704160230.mp4","thumbPath":"/storage/emulated/0/sone/video2/20170704160230.tmb","type":2},
    {"dateStr":"2017-07-04","name":"20170704160215.mp4","path":"/storage/emulated/0/sone/video2/20170704160215.mp4","thumbPath":"/storage/emulated/0/sone/video2/20170704160215.tmb","type":2},
    {"dateStr":"2017-06-28","name":"20170628175029.mp4","path":"/storage/emulated/0/sone/video2/20170628175029.mp4","thumbPath":"/storage/emulated/0/sone/video2/20170628175029.tmb","type":2}];

@observer
export default class GalleryPage extends Component {

    _scrollView;
    _footer;
    _header;
    _photo2K;
    _video2K;
    tabIndex = 0;


    componentDidMount() {
        setTimeout(()=>{
            this._photo2K.setData(photoData);
        },2000);

        DeviceEventEmitter.addListener('deleteData', this._deleteDataFromNative);
    }
    componentWillUnmount(){
        DeviceEventEmitter.removeListener('deleteData', this._deleteDataFromNative)
    }
    /**
     * 预览删除
     */
    _deleteDataFromNative = (data)=>{

        var list = this._currShowList();
        list.deleteByName(data.name);
    }
    /**
     * 底部点击删除／分享
     */
    _onModeChange = (mode) => {
        this._header.setIsEditMode(true);
        var list = this._currShowList();
        list.setMode(mode);
    }
    /**
     * 列表删除数据／分享结束后切换到正常状态
     */
    _onModeChangeByList = (mode) => {
        this._header.setIsEditMode(false);
        this._footer.setMode(mode);
    }

    /**
     * 点击全选／取消全选
     */
    _selectChange = (isSelectAll) => {
        var list = this._currShowList();
        if (isSelectAll) {
            list.selectAll();
        } else {
            list.cancelSelectAll();
        }
    }
    /**
     * 点击删除数据
     */
    _deleteItems = () => {
        var list = this._currShowList();
        list.deleteItems();
    }
    /**
     * 分享模式下点击具体的分享平台
     */
    _onShare = (platform) => {
        var list = this._currShowList();
        list.onShare(platform);
    }
    /**
     * 删除、分享模式下点击左上角的取消
     */
    _onHeaderCancel = () => {
        this._footer.changeNormalMode();
        var list = this._currShowList();
        list.setMode(EditMode.Normal);
    }
    /**
     * 2K、4K照片、视频切换
     */
    _onPickerValueChange = (index) => {
        this.tabIndex = index;
        var x = index * WIDTH;
        this._scrollView.scrollTo({x: x});
        var list = this._currShowList();
        if (!list.getIsLoadData()) {
            if (this.tabIndex == 1) {
                setTimeout(()=>{
                    this._video2K.setData(videoData);
                },2000);
            }
        }else{
            this._dataChange(list.getData());
        }
    }
    /**
     * 当前展示的列表
     */
    _currShowList = () => {
        var list;
        if (this.tabIndex == 0) {
            list = this._photo2K;
        } else if (this.tabIndex == 1) {

            list = this._video2K;
        }
        return list;
    }

    _dataSelectChange = (data) => {
        this._footer.setSelectAll(data.isSelectAll);
    }

    _dataChange = (data) => {
        if (data.items.length > 0) {
            this._footer.setIsDelete(true);
            if (this.tabIndex == 0) {
                this._footer.setIsShare(true);
            } else if (this.tabIndex == 1) {
                this._footer.setIsShare(true);
            }
        } else {
            this._footer.setIsDelete(false);
            this._footer.setIsShare(false);
        }
    }

    render() {

        return (
            <View style={{flex:1,flexDirection:'column'}}>
                <GalleryHeader
                    ref={(header)=>{this._header=header;}}
                    navigation={this.props.navigation}
                    onValueChange={(index)=>{
                        this._onPickerValueChange(index);
                    }}
                    onCancel={this._onHeaderCancel}/>

                <ScrollView
                    style={{flex:1,}}
                    horizontal={true}
                    scrollEnabled={false}
                    showsHorizontalScrollIndicator={false}
                    ref={(scrollView) => { this._scrollView = scrollView; }}>

                    <GalleryItem
                        ref={(ref)=>{this._photo2K = ref}}
                        dataSelectChange={this._dataSelectChange}
                        onModeChange={this._onModeChangeByList}
                        dataChange={this._dataChange}
                        navigation={this.props.navigation}/>

                    <GalleryItem
                        ref={(ref)=>{this._video2K = ref}}
                        dataSelectChange={this._dataSelectChange}
                        onModeChange={this._onModeChangeByList}
                        dataChange={this._dataChange}
                        navigation={this.props.navigation}/>


                </ScrollView>

                <GalleryFooter
                    ref={(footer)=>{this._footer = footer}}
                    navigation={this.props.navigation}
                    //是否禁用分享功能
                    shareDisable={this.shareDisable}
                    //点击删除／分享
                    onModeChange={this._onModeChange}
                    //点击全选／取消全选
                    selectChange={this._selectChange}
                    //点击删除数据
                    deleteItems={this._deleteItems}
                    //点击分享
                    onShare={this._onShare}
                />

                <View style={styles.container}>
                    <ToastContainer />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        position:'absolute',
        top:0,
        left:0,
        right:0,
        bottom:0,
    },

})