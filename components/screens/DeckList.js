import React from 'react'
import PropTypes from 'prop-types'
import {View, FlatList, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import DeckPreview from '../DeckPreview'
import getDecks from '../../state/decks/getDecks'
import {color} from '../../utils/colors'

class DeckListScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  render () {
    const {decks, navigation} = this.props
    const {navigate} = navigation
    return (
      <View style={styles.wrapper}>
        <FlatList
          data={decks}
          renderItem={({item}) => (
            <DeckPreview
              deck={item}
              gotToDeck={() => navigate('Deck', {title: item.title})}
            />
          )}
        />
      </View>
    )
  }
}

const mapStateToProps = ({decks}) => ({decks: getDecks(decks)})
export default connect(mapStateToProps)(DeckListScreen)

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: color.white,
    paddingVertical: 30,
    paddingHorizontal: 15
  }
})
