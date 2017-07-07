import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    NativeModules,
    Dimensions,
} from 'react-native';
import LoadingView from '../components/LoadingView';
import GalleryList from './GalleryList';
var WIDTH = Dimensions.get('window').width;
import {observable, action} from 'mobx';
import {observer} from 'mobx-react/native';

@observer
export default class GalleryItem extends Component {

    @observable
    loading = true;

    _sectionList;
    //是否已经加载过数据
    isLoadData = false;

    setData = (result) => {
        this.loading = false;
        this.isLoadData = true;
        this._sectionList.setData(result);
    }

    getData = ()=>{
        return this._sectionList.getData();
    }

    getIsLoadData = ()=>{
        return this.isLoadData;
    }

    setMode = (mode) => {
        this._sectionList.setMode(mode);
    }

    selectAll = () => {
        this._sectionList.selectAll();
    }

    cancelSelectAll = () => {
        this._sectionList.cancelSelectAll();
    }

    deleteItems = ()=>{
        this._sectionList.deleteItems();
    }

    onShare=(platform)=>{
        this._sectionList.onShare(platform);
    }

    deleteByName = (name)=>{
        this._sectionList.deleteByName(name);
    }

    render() {
        const {dataSelectChange,onModeChange,dataChange} = this.props;
        return (
            <View style={{flex:1,width:WIDTH}}>
                {
                    this.loading ? (
                        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                            <LoadingView style={{height:30,width:30}}/>
                        </View>
                    )
                        :
                        <GalleryList
                            ref={(section)=>{this._sectionList = section}}
                            dataSelectChange={dataSelectChange}
                            onModeChange={onModeChange}
                            dataChange={dataChange}
                            navigation = {this.props.navigation}
                        />
                }
            </View>
        );
    }
}
