import {observable, computed, action} from 'mobx';
import EditMode from './EditMode'

export default class GalleryListEntity {

    @observable
    items = [];


    //是否全部选中
    @computed
    get isSelectAll() {
        if (this.items && this.items.length > 0) {
            var selectAll = true;
            this.items.map((obj) => {
                obj.data.map((obj) => {
                    if (!obj.selected) {
                        selectAll = false;
                    }
                });
            });
            return selectAll;
        } else {
            return false;
        }
    }

    //是否有选中
    @computed
    get hasSelected() {
        if (this.items && this.items.length > 0) {
            var hasSelected = false;
            this.items.map((obj) => {
                obj.data.map((obj) => {
                    if (obj.selected) {
                        hasSelected = true;
                        return;
                    }
                });

            });
            return hasSelected;
        } else {
            return false;
        }
    }

    //设置全部选中
    @action
    selectAll = () => {
        if (this.items && this.items.length > 0) {
            this.items.map((obj) => {
                obj.data.map((obj) => {
                    obj.selected = true;
                });
            });
        }
    }


    //添加数据
    @action
    addItems = (result) => {
        if (result) {
            for (var i = 0; i < result.length; i++) {
                var isSameDay = this.isSameDay(result[i].dateStr);
                if (isSameDay) {
                    this.items[this.items.length - 1].data.push(new DataItem(result[i]));
                } else {
                    this.items.push(new GalleryItemEntity(result[i]));
                }
            }

        }
    }

    //和前一条数据是否为同一天
    isSameDay = (time) => {
        var isSameDay = false;
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].key === time) {
                isSameDay = true;
                break;
            }
        }
        return isSameDay;
    }

    //设置全部不选中
    @action
    unSelectedAll = () => {
        if (this.items && this.items.length > 0) {
            this.items.map((obj) => {
                obj.data.map((obj) => {
                    obj.selected = false;
                });

            });
        }
    }

    //只选中当前的
    @action
    selectOnlyOne = (data) => {
        this.unSelectedAll();
        data.selected = !data.selected;
    }

    //获取选中的相册
    getSelectedItems = () => {
        var selectedItems = [];
        this.items.map((obj) => {
            obj.data.map((obj) => {
                if (obj.selected) {
                    selectedItems.push(obj);
                }
            });

        });
        return selectedItems;
    }
    //删除选中的数据
    @action
    deleteSelectedItems = () => {
        var goon = true;
        while (goon) {
            var isDelete = false;
            goon = false;
            for (var i = 0; i < this.items.length; i++) {

                for (var j = 0; j < this.items[i].data.length; j++) {
                    if (this.items[i].data[j].selected) {
                        this.items[i].data[j].delete = true;
                        this.items[i].data.splice(j, 1);
                        isDelete = true;
                        break;
                    }
                }
                if (this.items[i].data.length == 0) {
                    this.items[i].key = this.items[i].key+';del';
                    this.items.splice(i, 1);
                    isDelete = true;
                    break;
                }
            }
            if (isDelete) {
                goon = true;
            }
        }


    }


    @action
    setEditMode = (mode) => {
        if (this.items && this.items.length > 0) {
            this.items.map((obj) => {
                obj.data.map((obj) => {
                    obj.editMode = mode;
                });

            });
        }
    }

    @action
    deleteByName = (name)=>{
        for (var i = 0; i < this.items.length; i++) {

            for (var j = 0; j < this.items[i].data.length; j++) {
                if (name === this.items[i].data[j].name) {
                    console.log('delete:'+name);
                    this.items[i].data[j].delete = true;
                    this.items[i].data.splice(j, 1);
                    break;
                }
            }
            if (this.items[i].data.length == 0) {
                this.items[i].key = this.items[i].key+';del';
                this.items.splice(i, 1);
            }
        }
    }
}

class GalleryItemEntity {
    constructor(data) {
        this.key = data.dateStr;
        this.data.push(new DataItem(data));
    }

    @observable
    key;
    @observable
    data = [];

}
class KeyItem {
    constructor(key) {
        this.key = key;
        this.delete = false;
    }

    @observable
    key = '';
    @observable
    delete = false;
}
class DataItem {
    constructor(data) {
        this.name = data.name;
        this.path = data.path;
        this.thumbPath = data.thumbPath;
        this.type = data.type;
        this.dateStr = data.dateStr;
        this.selected = false;
        this.editMode = EditMode.Normal;
        this.delete = false;
    }

    @observable
    name = '';
    @observable
    path = '';
    @observable
    thumbPath = '';
    @observable
    type = 0;
    @observable
    dateStr = '';
    @observable
    selected = false;
    @observable
    editMode = EditMode.Normal;
    @observable
    delete = false;
}