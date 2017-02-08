'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.watchConnection = exports.unWatchConnection = undefined;

var _constants = require('../constants');

/**
 * @description Remove listener from user profile
 * @param {Object} firebase - Internal firebase object
 */
var unWatchConnection = exports.unWatchConnection = function unWatchConnection(firebase) {
  if (firebase._.connectionWatch) {
    firebase.database().ref(".info/connected").off('value', firebase._.connectionWatch);
    firebase._.connectionWatch = null;
  }
};

/**
 * @description Watch user profile
 * @param {Function} dispatch - Action dispatch function
 * @param {Object} firebase - Internal firebase object
 */
var watchConnection = exports.watchConnection = function watchConnection(dispatch, firebase) {
  unWatchConnection(firebase);
  firebase._.connectionWatch = firebase.database().ref(".info/connected").on('value', function (snap) {
    dispatch({
      type: _constants.actionTypes.SET_CONNECTED,
      isConnected: snap.val()
    });
  });
};

exports.default = { watchConnection: watchConnection, unWatchConnection: unWatchConnection };