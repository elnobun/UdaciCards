import React from 'react'
import PropTypes from 'prop-types'
import {Text, View, TouchableHighlight, StyleSheet} from 'react-native'
import {FontAwesome} from '@expo/vector-icons'
import glamorous from 'glamorous-native'
import {color} from '../utils/colors'

export class PrimaryButton extends React.Component {
  static propTypes = buttonPropTypes
  render () {
    const {icon, title, onPress, ...props} = this.props
    return (
      <ButtonEl onPress={onPress} {...props}>
        <View style={[styles.button, styles.buttonPrimary]}>
          {icon != null && (
            <FontAwesome
              name={icon}
              size={24}
              style={styles.buttonPrimaryIcon}
            />
          )}
          <Text style={styles.buttonPrimaryText}>{title}</Text>
        </View>
      </ButtonEl>
    )
  }
}

export class SecondaryButton extends React.Component {
  static propTypes = buttonPropTypes
  render () {
    const {icon, title, onPress, ...props} = this.props
    return (
      <ButtonEl onPress={onPress} {...props}>
        <View style={[styles.button, styles.buttonSecondary]}>
          {icon != null && (
            <FontAwesome
              name={icon}
              size={24}
              style={styles.buttonSecondaryIcon}
            />
          )}
          <Text style={styles.buttonSecondaryText}>{title}</Text>
        </View>
      </ButtonEl>
    )
  }
}

export class SimpleButton extends React.Component {
  static propTypes = buttonPropTypes
  render () {
    const {icon, title, onPress, ...props} = this.props
    return (
      <ButtonEl onPress={onPress} style={{alignSelf: 'flex-start'}} {...props}>
        <View style={[styles.button, styles.buttonSimple]}>
          {icon != null && (
            <FontAwesome
              name={icon}
              size={16}
              style={styles.buttonSimpleIcon}
            />
          )}
          <Text style={styles.buttonSimpleText}>{title}</Text>
        </View>
      </ButtonEl>
    )
  }
}

const buttonPropTypes = {
  title: PropTypes.array.isRequired,
  onPress: PropTypes.func.isRequired,
  icon: PropTypes.string
}

const buttonElStyles = {alignSelf: 'center'}
const buttonElDisabledStyles = {opacity: 0.4}
const buttonElStackStyles = {alignSelf: 'stretch', marginBottom: 20}

const ButtonEl = glamorous(TouchableHighlight)(
  buttonElStyles,
  ({disabled}) => disabled && buttonElDisabledStyles,
  ({stackButton}) => stackButton && buttonElStackStyles
)

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  buttonPrimary: {
    backgroundColor: color.darkBlue
  },
  buttonPrimaryIcon: {
    marginRight: 10,
    color: color.white
  },
  buttonPrimaryText: {
    color: color.white
  },
  buttonSecondary: {
    backgroundColor: 'transparent'
  },
  buttonSecondaryIcon: {
    marginRight: 10,
    color: color.white
  },
  buttonSecondaryText: {
    color: color.white
  },
  buttonSimple: {
    backgroundColor: 'transparent',
    paddingHorizontal: 0
  },
  buttonSimpleIcon: {
    marginRight: 5,
    color: color.white
  },
  buttonSimpleText: {
    color: color.white
  }
})
