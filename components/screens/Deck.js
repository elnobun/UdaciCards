import React from 'react'
import PropTypes from 'prop-types'
import {Text, View, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import {
  PrimaryButton,
  SecondaryButton,
  SimpleButton
} from '../Buttons'
import deleteDeck from '../../state/actions/deleteAllDecks'
import getDeck from '../../state/decks/getDeck'
import {color} from '../../utils/colors'

class DeckScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  static navigationOptions = ({navigation, screenProps}) => {
    const {params = {}} = navigation.state
    return {
      headerRight: (
        <SecondaryButton
          title={''}
          icon={'trash-o'}
          onPress={() => params.deleteDeck()}
        />
      )
    }
  }

  componentDidMount () {
    this.props.navigation.setParams({deleteDeck: this.deleteDeck})
  }

  renameDeck = () => {
    this.props.navigation.navigate('RenameDeck', {title: this.props.deck.title})
  }

  deleteDeck = () => {
    const {title} = this.props.deck
    this.props.deleteDeck({name: title})
    this.props.navigation.goBack()
  }

  render () {
    const {navigate} = this.props.navigation
    if (this.props.deck == null) return null
    const {title, questions} = this.props.deck
    const navigateToQuiz = () => navigate('Quiz', {title})
    const navigateToNewCard = () => navigate('NewCard', {title})
    const disabled = questions.length < 1

    return (
      <View style={styles.wrapper}>
        <View style={styles.deckDetails}>
          <View style={styles.titleView}>
            <Text style={styles.titleText}>{title}</Text>
          </View>
          <View style={styles.cardCountView}>
            <Text style={styles.cardCountText}>
              <Text style={styles.cardCountNumber}>
                {questions.length}
              </Text>{' '}
              <Text>Card{questions.length === 1 ? '' : 's'}</Text>
            </Text>
          </View>
          <View>
            <SimpleButton
              title={'rename'}
              icon={'pencil'}
              onPress={this.renameDeck}
            />
          </View>
        </View>

        <View style={styles.buttonWrapper}>
          <PrimaryButton
            title={'Add Card'}
            icon={'vcard-o'}
            onPress={navigateToNewCard}
          />
          <PrimaryButton
            title={'Start Quiz'}
            icon={'rocket'}
            onPress={navigateToQuiz}
            disabled={disabled}
          />
        </View>
      </View>
    )
  }
}

const mapStateToProps = ({decks}, props) => {
  return {deck: getDeck(decks, props.navigation.state.params.title)}
}
export default connect(mapStateToProps, {deleteDeck})(DeckScreen)

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: color.blue,
    padding: 5,
    justifyContent: 'space-between',
    alignItems: 'stretch'
  },
  deckDetails: {
    padding: 30
  },
  titleView: {
    marginBottom: 15
  },
  titleText: {
    fontSize: 28,
    color: color.grey
  },
  cardCountView: {
    marginBottom: 15
  },
  cardCountText: {
    fontSize: 18,
    color: color.grey
  },
  cardCountNumber: {
    fontSize: 20,
    fontWeight: '600'
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20
  }
})
