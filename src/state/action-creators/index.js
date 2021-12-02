export const login = (user) => {
    return (dispatch) => {
        dispatch({
            type: "login",
            payload: user
        })
    }
}

export const logout = (user) => {
    return (dispatch) => {
        dispatch({
            type: "logout",
            payload: null
        })
    }
}

export const updateSessionInfo = (user) => {
    return (dispatch) => {
        dispatch({
            type: "updateSessionInfo",
            payload: user
        })
    }
}