import {actionTypes} from '../constants';

/**
 * @description Remove listener from user profile
 * @param {Object} firebase - Internal firebase object
 */
export const unWatchConnection = (firebase) => {
  if (firebase._.connectionWatch) {
    firebase.database().ref(".info/connected").off('value', firebase._.connectionWatch)
    firebase._.connectionWatch = null
  }
}

/**
 * @description Watch user profile
 * @param {Function} dispatch - Action dispatch function
 * @param {Object} firebase - Internal firebase object
 */
export const watchConnection = (dispatch, firebase) => {
  unWatchConnection(firebase)
  firebase._.connectionWatch = firebase.database()
    .ref(".info/connected")
    .on('value', snap => {
      dispatch({
        type: actionTypes.SET_CONNECTED,
        isConnected: snap.val()
      })
    })
}

export default { watchConnection, unWatchConnection }

