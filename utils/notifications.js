import {AsyncStorage} from 'react-native'
import {Notifications, Permissions} from 'expo'
import isAfter from 'date-fns/is_after'
import isSameDay from 'date-fns/is_same_day'

const LAST_QUIZ_COMPLETED_DATE = 'LAST_QUIZ_COMPLETED_DATE'
const NOTIFICATIONS_ENABLED = 'NOTIFICATIONS_ENABLED'

export function setLocalNotification () {
  Permissions.askAsync(Permissions.NOTIFICATIONS).then(({status}) => {
    Notifications.cancelAllScheduledNotificationsAsync()
    if (status === 'granted') {
      AsyncStorage.getItem(LAST_QUIZ_COMPLETED_DATE)
        .then(JSON.parse)
        .then(lastQuizCompleteDate => {
          getNotificationEnabled().then(enabled => {
            if (enabled) {
              Notifications.scheduleLocalNotificationAsync(
                localNotification(),
                schedulingOptions(lastQuizCompleteDate)
              )
            }
          })
        })
    }
  })
}

export function updateLocalNotificationWithNewQuiz () {
  AsyncStorage.setItem(
    LAST_QUIZ_COMPLETED_DATE,
    JSON.stringify(new Date()),
    () => setLocalNotification()
  )
}

export function getNotificationEnabled () {
  return AsyncStorage.getItem(NOTIFICATIONS_ENABLED).then(JSON.parse)
}

export function setNotificationEnabled (value) {
  return AsyncStorage.setItem(
    NOTIFICATIONS_ENABLED,
    JSON.stringify(value),
    () => setLocalNotification()
  )
}

function localNotification () {
  return {
    title: `UdaciCards`,
    body: `👋 don't forget to complete a quiz today!`,
    ios: {sound: true},
    android: {sound: true, priority: 'high', sticky: false, vibrate: true}
  }
}

function schedulingOptions (lastQuizCompleteDate) {
  const today8pm = (() => {
    const date = new Date()
    date.setHours(20)
    date.setMinutes(0)
    return date
  })()
  const tomorrow8pm = (() => {
    const date = new Date()
    date.setDate(date.getDate() + 1)
    date.setHours(20)
    date.setMinutes(0)
    return date
  })()
  const now = new Date()
  const time =
    isAfter(now, today8pm) || isSameDay(now, lastQuizCompleteDate)
      ? tomorrow8pm
      : today8pm
  return {time, repeat: 'day'}
}
