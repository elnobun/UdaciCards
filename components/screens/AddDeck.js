import React from 'react'
import PropTypes from 'prop-types'
import {View, Text, TextInput, StyleSheet, Keyboard} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {connect} from 'react-redux'
import createNewDeck from '../../state/actions/createNewDeck'
import getDeckIds from '../../state/decks/getDeck_ids'
import {PrimaryButton} from '../Buttons'
import {color} from '../../utils/colors'

class AddDeckScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  state = {name: ''}

  onSubmit = () => {
    Keyboard.dismiss()
    const {name} = this.state
    this.setState({name: ''}, () => {
      this.props.createNewDeck({name: name})
      this.props.navigation.navigate('Deck', {title: name})
    })
  }

  render () {
    const empty = this.state.name === ''
    const duplicateName = this.props.deckIds.includes(this.state.name)
    const disabled = empty || duplicateName

    return (
      <KeyboardAwareScrollView
        style={{backgroundColor: color.blue}}
        contentContainerStyle={styles.wrapper}
        resetScrollToCoords={{x: 0, y: 0}}
      >
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Deck Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={name => this.setState({name})}
            value={this.state.name}
            keyboardAppearance='light'
            returnKeyType='done'
          />
        </View>
        {duplicateName && (
          <View style={styles.errorWrapper}>
            <Text style={styles.errorText}>
              Deck with name `<Text style={{fontWeight: '600'}}>
                {this.state.name}
              </Text>` already exists.
            </Text>
            <Text style={styles.errorText}>Please choose another name</Text>
          </View>
        )}
        <PrimaryButton
          onPress={this.onSubmit}
          title='Add Deck'
          disabled={disabled}
        />
      </KeyboardAwareScrollView>
    )
  }
}

const mapStateToProps = ({decks}) => ({deckIds: getDeckIds(decks)})
export default connect(mapStateToProps, {createNewDeck})(AddDeckScreen)

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: color.white,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  inputWrapper: {
    marginBottom: 20
  },
  label: {
    fontSize: 20,
    paddingBottom: 10,
    textAlign: 'center',
    color: color.black
  },
  input: {
    fontSize: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: color.darkGrey,
    paddingVertical: 7.5,
    paddingHorizontal: 15,
    backgroundColor: color.grey,
    color: color.black
  },
  errorWrapper: {
    paddingVertical: 7.5,
    paddingHorizontal: 15,
    marginBottom: 20
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    color: color.orange
  }
})
