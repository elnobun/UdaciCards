import React from 'react'
import PropTypes from 'prop-types'
import {View, Text, TextInput, StyleSheet, Keyboard} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {connect} from 'react-redux'
import addCardToDeck from '../../state/actions/addCardToDeck'
import {PrimaryButton} from '../Buttons'
import {color} from '../../utils/colors'

class NewCardScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  state = {question: '', answer: ''}

  onSubmit = () => {
    Keyboard.dismiss()
    const {question, answer} = this.state
    const deckName = this.props.navigation.state.params.title
    this.setState({question: '', answer: ''}, () => {
      this.props.addCardToDeck({deckName, card: {question, answer}})
      this.props.navigation.goBack()
    })
  }

  render () {
    const questionEmpty = this.state.question === ''
    const answerEmpty = this.state.answer === ''
    const disabled = questionEmpty || answerEmpty

    return (
      <KeyboardAwareScrollView
        style={{backgroundColor: color.blue}}
        contentContainerStyle={styles.wrapper}
        resetScrollToCoords={{x: 0, y: 0}}
      >
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Question</Text>
          <TextInput
            style={styles.input}
            onChangeText={question => this.setState({question})}
            value={this.state.question}
            keyboardAppearance='dark'
            multiline
          />
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Answer</Text>
          <TextInput
            style={styles.input}
            onChangeText={answer => this.setState({answer})}
            value={this.state.answer}
            keyboardAppearance='dark'
            multiline
          />
        </View>

        <PrimaryButton
          onPress={this.onSubmit}
          title='Add Card'
          disabled={disabled}
        />
      </KeyboardAwareScrollView>
    )
  }
}

export default connect(null, {addCardToDeck})(NewCardScreen)

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: color.blue,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  header: {
    fontSize: 28,
    paddingBottom: 5,
    color: color.darkBlue,
    backgroundColor: 'transparent'
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
  }
})
