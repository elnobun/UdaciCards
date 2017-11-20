import React from 'react'
import PropTypes from 'prop-types'
import {Text, View, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import getDeckQuestionsShuffled from '../../state/decks/getDeckQuestions'
import {color} from '../../utils/colors'
import {updateLocalNotificationWithNewQuiz} from '../../utils/notifications'
import {PrimaryButton, SecondaryButton} from '../Buttons'

const defaultState = {
  currentCardIndex: 0,
  side: 'front',
  complete: false,
  correctAnswers: 0
}

class QuizScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  state = {...defaultState}

  showAnswer = () => {
    this.setState({side: 'back'})
  }

  markCorrect = () => {
    this.setState(
      state => ({correctAnswers: state.correctAnswers + 1}),
      () => this.next()
    )
  }

  next = () => {
    const {questions} = this.props
    const nextCardIndex = this.state.currentCardIndex + 1
    if (nextCardIndex < questions.length) {
      this.setState({currentCardIndex: nextCardIndex, side: 'front'})
    } else {
      this.setState({complete: true}, () =>
        updateLocalNotificationWithNewQuiz()
      )
    }
  }

  restart = () => {
    this.setState({...defaultState})
  }

  goToDeck = () => {
    this.props.navigation.goBack()
  }

  render () {
    const {currentCardIndex, side, complete, correctAnswers} = this.state
    const {questions} = this.props
    const {question, answer} = questions[currentCardIndex]

    return (
      <View style={styles.wrapper}>
        {complete === false && (
          <View style={styles.questionsRemaining}>
            <Text style={styles.questionsRemainingText}>
              {currentCardIndex + 1}/{questions.length}
            </Text>
          </View>
        )}
        {(() => {
          if (complete) {
            return (
              <View style={styles.section}>
                <View>
                  <View style={styles.titleWrapper}>
                    <Text style={styles.title}>Quiz Complete</Text>
                  </View>
                  <Text style={styles.message}>
                    You got {correctAnswers} out of {questions.length} questions
                    correct
                  </Text>
                </View>
                <View style={styles.buttonWrapper}>
                  <SecondaryButton onPress={this.restart} title='Start Again' />
                  <PrimaryButton onPress={this.goToDeck} title='Got to Deck' />
                </View>
              </View>
            )
          } else if (side === 'front') {
            return (
              <View style={styles.section}>
                <View>
                  <View style={styles.titleWrapper}>
                    <Text style={styles.title}>Question</Text>
                  </View>
                  <View style={styles.messageWrapper}>
                    <Text style={styles.message}>{question}</Text>
                  </View>
                </View>
                <PrimaryButton onPress={this.showAnswer} title='Show Answer' />
              </View>
            )
          } else if (side === 'back') {
            return (
              <View style={styles.section}>
                <View>
                  <View style={styles.titleWrapper}>
                    <Text style={styles.title}>Answer</Text>
                  </View>
                  <View style={styles.messageWrapper}>
                    <Text style={styles.message}>{answer}</Text>
                  </View>
                </View>
                <View style={styles.buttonWrapper}>
                  <SecondaryButton onPress={this.next} title='Incorrect' />
                  <PrimaryButton onPress={this.markCorrect} title='Correct' />
                </View>
              </View>
            )
          }
        })()}
      </View>
    )
  }
}

const mapStateToProps = ({decks}, props) => {
  const deckTitle = props.navigation.state.params.title
  return {questions: getDeckQuestionsShuffled(decks, deckTitle)}
}
export default connect(mapStateToProps)(QuizScreen)

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: color.blue,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  questionsRemaining: {
    position: 'absolute',
    top: 15,
    right: 15
  },
  questionsRemainingText: {
    color: color.grey
  },
  section: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'stretch',
    padding: 30
  },
  titleWrapper: {
    marginBottom: 10
  },
  title: {
    fontSize: 30,
    color: color.orange,
    textAlign: 'center'
  },
  messageWrapper: {
    marginBottom: 20
  },
  message: {
    fontSize: 18,
    color: color.grey,
    textAlign: 'center'
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20
  }
})
