import { ACTION_TYPE } from "./actionType"

export const INIT_STATE = {
    loading : false,
    post : {},
    error: false,
    showMessage: false,
    message : "",
    messageType : 'success',
}

export const formReducer =( state :any, action: any) =>{
    switch(action.type){
        case ACTION_TYPE.FETCH_START:
            return {
                loading: true,
                error: false,
                post: {}
            }
        case ACTION_TYPE.FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                post: action.payload
            }
        case ACTION_TYPE.FETCH_ERROR:
            return {
                ...state,
                loading: false,
                error: true,
                message : '',
                post: {},
                showMessage: false
            }
        case ACTION_TYPE.FORM_PROCESSING:
            return {
                loading: true,
                error: false,
                message : '',
                post: {},
                showMessage: false
            }
        case ACTION_TYPE.SUBMIT_SUCCESS:
            return {
                loading: false,
                error: false,
                message : action.payload.msg,
                post: {},
                showMessage: true,
                messageType : 'success'
            }
        case ACTION_TYPE.SUBMIT_FAILED:
            return {
                loading: false,
                error: true,
                message : action.payload.msg,
                post: {},
                showMessage: true,
                messageType : 'error'
            }
        case ACTION_TYPE.EDIT_SUCCESS:
            return {

            }
        case ACTION_TYPE.EDIT_FAILEED:
            return {

            }
        case ACTION_TYPE.DELTE_SUCCESS:
            return {

            }
        case ACTION_TYPE.DELTE_FAILED:
            return {

            }
        default:
            return state //return current state

    }
}