/**
 * Created by mengqingdong on 2017/6/20.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import {observer} from 'mobx-react/native';

@observer
export default class SectionHeader extends Component {

    render() {
        const {data} = this.props;
        if (data.key.indexOf(';del') > -1) {
            return (null);
        } else {
            return (
                <Text style={styles.sectionHeaderText}>{data.key}</Text>
            );
        }
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