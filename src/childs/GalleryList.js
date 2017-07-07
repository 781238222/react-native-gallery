import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    View,
    SectionList,
} from 'react-native';
import GalleryListEntity from '../entity/GalleryListEntity';
import ListItem from './ListItem';
import SectionHeader from './SectionHeader';
import ListNoData from './ListNoData';
import {observer} from 'mobx-react/native';
import {observable, action, autorun} from 'mobx';
import EditMode from '../entity/EditMode'
import Toast from '../components/Toast'
import DeleteGalleryModal from '../modals/DeleteGalleryModal'
import * as String from '../res/values/String'

@observer
export default class GalleryList extends Component {

    _deleteModal;

    data = new GalleryListEntity();


    setMode = (mode) => {
        this.data.unSelectedAll();
        this.data.setEditMode(mode);
    }

    setData = (result) => {
        this.data.addItems(result);
        this._dataChange();
    }

    getData = ()=>{
        return this.data;
    }

    deleteByName = (name)=>{
        Toast.show(String.__DELETE_SUCC__);
        this.data.deleteByName(name);
        this._dataChange();
    }

    selectAll = () => {
        this.data.selectAll();
    }

    onShare = (platform) => {
        if (!this.data.hasSelected) {
            //无选中的数据
            Toast.show(String.__SELECT_SHARE_DATA__, {isError: true});
            return;
        }
        // var selectedItems = data.getSelectedItems();
        //     var json = JSON.stringify(selectedItems)
    }

    cancelSelectAll = () => {
        this.data.unSelectedAll();
    }
    //删除选中的数据
    deleteItems = () => {
        if (!this.data.hasSelected) {
            //无选中的数据
            Toast.show(String.__SELECT_DELETE_DATA__, {isError: true});
            return;
        }
        this._deleteModal.show();

    }

    _renderItem = (info) => {
        return (
            <ListItem
                data={info.item}
                dataSelectChange={this._dataSelectChange}
                selectOnlyOne={this._selectOnlyOne}
                navigation = {this.props.navigation}/>
        );

    }

    _renderSectionHeader = (info) => {
        return (
            <SectionHeader data={info.section}/>
        );
    }

    _dataSelectChange = () => {
        const {dataSelectChange} = this.props;
        if (dataSelectChange) {
            dataSelectChange(this.data);
        }
    }

    _selectOnlyOne = (data) => {
        this.data.selectOnlyOne(data);
    }

    _delete = () => {
        const {onModeChange} = this.props;
        var selectedItems = this.data.getSelectedItems();
        var json = JSON.stringify(selectedItems)
        //需要你去真正的删除手机上的图片和视频，这里假设删除成功

        Toast.show(String.__DELETE_SUCC__);
        //通知头、底
        if (onModeChange) {
            onModeChange(EditMode.Normal);
        }
        this.data.setEditMode(EditMode.Normal);
        this.data.deleteSelectedItems();
        this._dataChange();

    }
    /**
     * 数据发生变化的时候
     * 1、设置数据
     * 2、删除数据
     */
    _dataChange = ()=>{
        const {dataChange} = this.props;
        if(dataChange){
            dataChange(this.data);
        }
    }

    render() {


        return (
            <View>
                <DeleteGalleryModal ref={(modal)=>{this._deleteModal = modal}} deleteFun={this._delete}/>
                {
                    (this.data.items && this.data.items.length > 0) ? (
                        <SectionList
                            renderItem={this._renderItem}
                            renderSectionHeader={this._renderSectionHeader}
                            sections={this.data.items}>
                        </SectionList>

                    ) : (
                        <ListNoData />
                    )
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    sectionHeaderText: {
        color: '#666666',
        fontSize: 13,
        height: 40,
        textAlignVertical: 'center',
        paddingLeft: 24,
    }
})