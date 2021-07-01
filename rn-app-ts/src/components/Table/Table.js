import React from 'react'
import { StyleSheet, View } from 'react-native'
import Text from '../CustomText/CustomText'
import { setSize, border1Px, setSizeText, classnames } from '@/utils';

const Table = ({ thColumns = [], dataSource, thStyle }) => {
    if (!thColumns.length || !dataSource || !dataSource?.length) {
        return null;
    }

    function _renderRowCell(column, rowData, i) {
        let key = column.dataIndex;
        if (!key) {
            console.warn('thColumns需要dataIndex');
            return null;
        }

        if (typeof rowData[key] != 'object') {
            return <Text key={i} style={[styles.col, rowData[key + 'Style'] ?? {}]}>{rowData[key]}</Text>
        } else {
            let render = rowData[key].render;
            return React.isValidElement(render)
                ? <render key={i} rowData={rowData} />
                : null
        }
    }

    return (
        <View style={styles.table}>
            <View style={[styles.th, thStyle]}>
                {
                    thColumns.map((column, index) =>
                        React.isValidElement(column.render)
                            ? <column.render text={column.title} key={index} />
                            : <Text key={index} style={[styles.col, styles.colTh, column.style ?? {}]}>{column.title} </Text>
                    )
                }
            </View>
            {
                dataSource.map((item, index) =>
                    <View key={index} style={[classnames(styles, 'row', { noBB: index == dataSource.length - 1 }), dataSource.rowStyle]}>
                        {
                            thColumns.map((column, i) =>
                                _renderRowCell(column, item, i)
                            )
                        }
                    </View>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    table: {
        borderWidth: border1Px(),
        borderColor: '#dcdcdc',
    },
    th: {
        flexDirection: 'row',
        height: setSize(88),
        borderBottomWidth: border1Px(),
        borderColor: '#dcdcdc',
        backgroundColor: '#F2F2F2'
    },
    row: {
        flexDirection: 'row',
        height: setSize(88),
        borderBottomWidth: border1Px(),
        borderColor: '#dcdcdc',
    },
    col: {
        fontSize: setSizeText(26),
        color: '#000',
        borderRightWidth: border1Px(),
        borderColor: '#dcdcdc',
        textAlign: 'center'
    },
    colTh: {
        fontWeight: 'bold'
    },
    noBR: {
        borderRightWidth: 0
    },
    noBB: {
        borderBottomWidth: 0
    }
})

export default Table