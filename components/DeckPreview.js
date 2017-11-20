import React from 'react'
import PropTypes from 'prop-types'
import {Text, View, TouchableHighlight, StyleSheet} from 'react-native'
import {FontAwesome} from '@expo/vector-icons'
import {color} from '../utils/colors'

class DeckPreview extends React.Component {
  static propTypes = {
    deck: PropTypes.object.isRequired,
    gotToDeck: PropTypes.func.isRequired
  }

  render () {
    const {deck, gotToDeck} = this.props
    const {title, questions} = deck
    return (
      <TouchableHighlight onPress={gotToDeck} style={styles.touchableHighlight}>
        <View style={styles.wrapper}>
          <View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.cardCount}>
              {questions.length} Card{questions.length === 1 ? '' : 's'}
            </Text>
          </View>
          <FontAwesome name={'angle-right'} style={styles.icon} />
        </View>
      </TouchableHighlight>
    )
  }
}

export default DeckPreview

const styles = StyleSheet.create({
  touchableHighlight: {
    marginBottom: 15,
    borderRadius: 5
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 7.5,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: color.darkGrey
  },
  title: {
    fontSize: 30,
    color: color.grey,
    marginBottom: 5
  },
  cardCount: {
    color: color.grey
  },
  icon: {
    color: color.orange,
    fontSize: 28
  }
})
