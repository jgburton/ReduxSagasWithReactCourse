import { takeEvery, takeLatest, take, call, fork, put } from 'redux-saga/effects'; //helpers
import * as actions from '../actions/users';
import * as api from '../../apis/users';

//worker sagas
function* getUsers() {
    try {
        const result = yield call(api.getUsers);
        // console.log(result);
        yield put(actions.getUsersSuccess({ items: result.data.data }));
    } catch (e) {
        yield put(actions.usersError({
            error: 'An error occured when trying to get the users'
        }))
    }
}

function* createUser(action) {
    // console.log(action);
    try{
        yield call(api.createUser, {firstName: action.payload.firstName, lastName: action.payload.lastName});
        yield call(getUsers);
    } catch (e){
        yield put(actions.usersError({
            error: 'An error occured when trying to create the user'
        }))
    }
}

function* deleteUser({userId}) {
    try{
        yield call(api.deleteUser,userId);
        yield call(getUsers);
    }catch(e) {
        yield put(actions.usersError({
            error: 'An error occured when trying to delete the user'
        }))
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

function* watchDeleteUserRequest() {
    while(true){
        const action = yield take(actions.Types.DELETE_USER_REQUEST);
        yield call(deleteUser, {
            userId: action.payload.userId
        });
    }
}
//watcher sagas

const usersSagas = [
    fork(watchGetUsersRequest),
    fork(watchCreateUserRequest),
    fork(watchDeleteUserRequest)
];

export default usersSagas;