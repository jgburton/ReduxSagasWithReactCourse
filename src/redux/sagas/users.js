import { takeEvery, takeLatest, call, fork, put } from 'redux-saga/effects'; //helpers
import * as actions from '../actions/users';
import * as api from '../../apis/users';

//worker sagas
function* getUsers() {
    try {
        const result = yield call(api.getUsers);
        // console.log(result);
        yield put(actions.getUsersSuccess({ items: result.data.data }));
    } catch (e) {
        console.log(e);
    }
}

function* createUser(action) {
    // console.log(action);
    try{
        yield call(api.createUser, {firstName: action.payload.firstName, lastName: action.payload.lastName});
        yield call(getUsers);
    } catch (e){
        console.log(e);
    }
}
//worker sagas

//watcher sagas
function* watchGetUsersRequest() {
    yield takeEvery(actions.Types.GET_USERS_REQUEST, getUsers)
}

function* watchCreateUserRequest() {
    yield takeLatest(actions.Types.CREATE_USER_REQUEST, createUser)
}
//watcher sagas

const usersSagas = [
    fork(watchGetUsersRequest),
    fork(watchCreateUserRequest)
];

export default usersSagas;