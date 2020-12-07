import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from "prop-types";
import { TextInput } from 'react-native-paper';

class PasswordInputText extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            icEye: 'visibility-off',
            isPassword: true
        }
    }

    getRef = (ref) => {
        if (this.props.getRef)
            this.props.getRef(ref)
    }

    changePwdType = () => {
        const { isPassword } = this.state;
        // set new state value
        this.setState({
            icEye: isPassword ? "visibility" : "visibility-off",
            isPassword: !isPassword,
        });

    };         

    render() {
        const { iconSize, iconColor, label, style } = this.props;
        const { icEye, isPassword } = this.state;

        return (
            <View style={style}>
                <TextInput
                    {...this.props}
                    ref={this.getRef}
                    secureTextEntry={isPassword}
                />
                <Icon style={styles.icon}
                    name={icEye}
                    size={iconSize}
                    color={iconColor}
                    onPress={this.changePwdType}
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    icon: {
        position: 'absolute',
        top: 25,
        right: 10
    }
});

PasswordInputText.defaultProps = {
    iconSize: 21,
    iconColor: "#407FFA"
}

PasswordInputText.propTypes = {
    iconSize: PropTypes.number,
    iconColor: PropTypes.string
};

export default PasswordInputText;