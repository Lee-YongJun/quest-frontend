import {SET_MESSAGE, CLEAR_MESSAGE} from "../actions/types";

//초기상태지정
const initialState = {};

//3. 세부 reducer정의
export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case SET_MESSAGE:
            return {message: payload};

        case CLEAR_MESSAGE:
            return {message: ""};

        default:
            return state;
    }
}
