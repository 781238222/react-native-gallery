/**
 * Created by 孟庆东 on 2017/4/5.
 */
import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Modal,
    Image,
    TouchableHighlight,
} from 'react-native';
import Touchable from './Touchable';

export default class Picker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectIndex: 0,
            show: false,
        }
    }

    static propTypes = {
        onValueChange: PropTypes.func,
        selectIndex: PropTypes.number,
        enable: PropTypes.boolean,
    }

    _renderItem = (item, index, onValueChange) => {
        var itemStyle = {
            height: 42,
            width: 144
        }
        if (index == this.state.selectIndex) {
            Object.assign(itemStyle, {backgroundColor: '#444444'})
        }
        return (
            <Touchable style={itemStyle}
                       onPress={()=>{
                    if(index != this.state.selectIndex){
                        this.setState({
                            selectIndex:index,
                            show:false,
                        });
                        if(onValueChange){
                            onValueChange(index);
                        }
                    }

                }}>
                <Text style={styles.text}>{item}</Text>
            </Touchable>
        );


    }

    render() {

        const {onValueChange, selectIndex, data, style, enable} = this.props;
        var containerStyle = {};
        if (style) {
            Object.assign(containerStyle, style);
        }
        if (selectIndex) {
            this.setState({
                selectIndex: selectIndex,
            });
        }
        return (
            <View style={containerStyle}>
                <Touchable
                    style={{flex:1}}
                    onPress={()=>{
                                    if(!enable){
                                        this.setState({
                                        show:true,
                                        });
                                    }
                                }}>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',}}>
                        <Text style={{color:'white'}}>{data[this.state.selectIndex]}</Text>
                        <Image style={{width:10,height:5,marginLeft:5}}
                               source={require('../res/imgs/down_icon.png')}/>
                    </View>

                </Touchable>
                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={this.state.show}>
                    <Touchable
                        style={{backgroundColor: '#00000000',position:'absolute',left:0,top:0,right:0,bottom:0,justifyContent:'flex-start'}}
                        onPress={()=>{
                            //点击空白处
                            this.setState({
                                show:false,
                            });
                        }}>
                        <View
                            style={{marginTop:44,backgroundColor:'#222222'}}>
                            {
                                data.map((item, index) => this._renderItem(item, index, onValueChange))
                            }
                        </View>
                    </Touchable>
                </Modal>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    touch: {
        height: 40,
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontSize: 15,
        marginTop: 7,
        marginBottom: 7
    }
});