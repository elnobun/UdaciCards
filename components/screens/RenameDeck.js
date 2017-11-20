import React from 'react'
import PropTypes from 'prop-types'
import {View, Text, TextInput, StyleSheet, Keyboard} from 'react-native'
import {NavigationActions} from 'react-navigation'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {connect} from 'react-redux'
import renameDeck from '../../state/actions/renameDeck'
import getDeckIds from '../../state/decks/getDeck_ids'
import {PrimaryButton} from '../Buttons'
import {color} from '../../utils/colors'

class AddDeckScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  componentWillMount () {
    this.setState({name: this.props.navigation.state.params.title})
  }

  state = {name: ''}

  onSubmit = () => {
    Keyboard.dismiss()
    const name = this.props.navigation.state.params.title
    const newName = this.state.name
    this.setState({name: ''}, () => {
      this.props.renameDeck({name, newName})
      this.props.navigation.dispatch(
        NavigationActions.reset({
          index: 1,
          actions: [
            NavigationActions.navigate({routeName: 'DeckList'}),
            NavigationActions.navigate({
              routeName: 'Deck',
              params: {title: newName}
            })
          ]
        })
      )
    })
  }

  render () {
    const {title} = this.props.navigation.state.params
    const empty = this.state.name === ''
    const duplicateName =
      this.state.name !== title && this.props.deckIds.includes(this.state.name)
    const disabled = empty || duplicateName

    return (
      <KeyboardAwareScrollView
        style={{backgroundColor: color.blue}}
        contentContainerStyle={styles.wrapper}
        resetScrollToCoords={{x: 0, y: 0}}
      >
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={name => this.setState({name})}
            value={this.state.name}
            keyboardAppearance='dark'
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
          title='Rename Deck'
          disabled={disabled}
        />
      </KeyboardAwareScrollView>
    )
  }
}

const mapStateToProps = ({decks}) => ({deckIds: getDeckIds(decks)})
export default connect(mapStateToProps, {renameDeck})(AddDeckScreen)

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: color.blue,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  inputWrapper: {
    marginBottom: 20
  },
  label: {
    fontSize: 24,
    paddingBottom: 10,
    color: color.grey
  },
  input: {
    fontSize: 20,
    borderRadius: 5,
    paddingVertical: 7.5,
    paddingHorizontal: 15,
    backgroundColor: color.darkGrey,
    color: color.grey
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
