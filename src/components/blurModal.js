import React from 'react'
import { View, Text,Modal } from 'react-native'

 const blurModal=({visible,children})=> {
    return (
        <Modal 
        animationType="fade"
        transparent={true}
        visible={visible}
        >
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.2)'}}>
                {children}
            </View>
    </Modal>
    )
}
export default blurModal;