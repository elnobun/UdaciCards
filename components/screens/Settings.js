import React from 'react'
import PropTypes from 'prop-types'
import {StyleSheet, Switch, View, Text} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {connect} from 'react-redux'
import deleteAllDecks from '../../state/actions/deleteAllDecks'
import restoreDefaultDecks from '../../state/actions/restoreDefaultDecks'
import {PrimaryButton} from '../Buttons'
import {color} from '../../utils/colors'
import {
  getNotificationEnabled,
  setNotificationEnabled
} from '../../utils/notifications'

class NewCardScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  state = {notifications: true}

  componentDidMount () {
    getNotificationEnabled().then(enabled => {
      this.setState({notifications: enabled})
    })
  }

  deleteAllDecks = () => {
    this.props.deleteAllDecks()
    this.props.navigation.navigate('DeckList')
  }

  restoreDefaultDecks = () => {
    this.props.restoreDefaultDecks()
    this.props.navigation.navigate('DeckList')
  }

  handleNotifications = checked => {
    this.setState(
      state => ({notifications: checked}),
      () => setNotificationEnabled(checked)
    )
  }

  render () {
    return (
      <KeyboardAwareScrollView
        style={{backgroundColor: color.blue}}
        contentContainerStyle={styles.wrapper}
        resetScrollToCoords={{x: 0, y: 0}}
      >
        <PrimaryButton
          onPress={this.deleteAllDecks}
          title='Delete All Decks'
          stackButton
        />
        <PrimaryButton
          onPress={this.restoreDefaultDecks}
          title='Load Sample Decks'
          stackButton
        />
        <View style={styles.switchWrapper}>
          <Text style={{color: color.grey}}>Notifications</Text>
          <Switch
            value={this.state.notifications}
            onValueChange={checked => this.handleNotifications(checked)}
          />
        </View>
      </KeyboardAwareScrollView>
    )
  }
}

export default connect(null, {deleteAllDecks, restoreDefaultDecks})(
  NewCardScreen
)

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: color.blue,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  switchWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})
