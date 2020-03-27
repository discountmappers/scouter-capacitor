export const SEARCH_ACTION='SEARCH_ACTION'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'

// testing out some redux saga/obserbable stuff
export const loginUser = (url : any) => {
    return {
        type: LOGIN_REQUEST,
        urlParams : url
    }
}