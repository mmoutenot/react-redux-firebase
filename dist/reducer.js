'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _constants = require('./constants');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var SET = _constants.actionTypes.SET,
    SET_PROFILE = _constants.actionTypes.SET_PROFILE,
    SET_IS_EMAIL_VERIFIED = _constants.actionTypes.SET_IS_EMAIL_VERIFIED,
    SET_CONNECTED = _constants.actionTypes.SET_CONNECTED,
    LOGIN = _constants.actionTypes.LOGIN,
    LOGOUT = _constants.actionTypes.LOGOUT,
    LOGIN_ERROR = _constants.actionTypes.LOGIN_ERROR,
    NO_VALUE = _constants.actionTypes.NO_VALUE,
    AUTHENTICATION_INIT_STARTED = _constants.actionTypes.AUTHENTICATION_INIT_STARTED,
    AUTHENTICATION_INIT_FINISHED = _constants.actionTypes.AUTHENTICATION_INIT_FINISHED,
    UNAUTHORIZED_ERROR = _constants.actionTypes.UNAUTHORIZED_ERROR;


var emptyState = {
  auth: undefined,
  authError: undefined,
  profile: undefined,
  isConnected: undefined,
  isInitializing: undefined,
  isEmailVerified: undefined,
  data: {}
};

var initialState = (0, _immutable.fromJS)(emptyState);

var pathToArr = function pathToArr(path) {
  return path.split(/\//).filter(function (p) {
    return !!p;
  });
};

/**
 * @name firebaseStateReducer
 * @description Reducer for react redux firebase. This function is called
 * automatically by redux every time an action is fired. Based on which action
 * is called and its payload, the reducer will update redux state with relevant
 * changes.
 * @param {Map} state - Current Redux State
 * @param {Object} action - Action which will modify state
 * @param {String} action.type - Type of Action being called
 * @param {String} action.data - Type of Action which will modify state
 * @return {Map} State
 */

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var path = action.path;

  var pathArr = void 0;
  var retVal = void 0;

  switch (action.type) {

    case SET:
      var data = action.data;

      pathArr = pathToArr(path);
      retVal = data !== undefined ? state.setIn(['data'].concat(_toConsumableArray(pathArr)), (0, _immutable.fromJS)(data)) : state.deleteIn(['data'].concat(_toConsumableArray(pathArr)));

      return retVal;

    case NO_VALUE:
      pathArr = pathToArr(path);
      retVal = state.setIn(['data'].concat(_toConsumableArray(pathArr)), (0, _immutable.fromJS)({}));
      return retVal;

    case SET_PROFILE:
      var profile = action.profile;

      return profile !== undefined ? state.setIn(['profile'], (0, _immutable.fromJS)(profile)) : state.deleteIn(['profile']);

    case SET_CONNECTED:
      var isConnected = action.isConnected;

      return state.setIn(['isConnected'], isConnected);

    case LOGOUT:
      return (0, _immutable.fromJS)({
        auth: null,
        authError: null,
        profile: null,
        isEmailVerified: null,
        isLoading: false,
        isConnected: state.get('isConnected'),
        isInitializing: false,
        data: {}
      });

    case LOGIN:
      return state.setIn(['auth'], (0, _immutable.fromJS)(action.auth)).setIn(['authError'], null).setIn(['isEmailVerified'], action.auth.emailVerified);

    case SET_IS_EMAIL_VERIFIED:
      return state.setIn(['isEmailVerified'], action.isEmailVerified);

    case LOGIN_ERROR:
      return state.setIn(['authError'], action.authError).setIn(['auth'], null).setIn(['profile'], null);

    case AUTHENTICATION_INIT_STARTED:
      return initialState.setIn(['isInitializing'], true);

    case AUTHENTICATION_INIT_FINISHED:
      return state.setIn(['isInitializing'], false);

    case UNAUTHORIZED_ERROR:
      return state.setIn(['authError'], action.authError);

    default:
      return state;

  }
};

module.exports = exports['default'];