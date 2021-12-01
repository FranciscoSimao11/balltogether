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