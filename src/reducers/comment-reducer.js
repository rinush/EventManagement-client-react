
const initialState = {
    comments: [],
    comment:[]
}

const commentReducer = (state=initialState, action) => {
    switch (action.type) {
        case "FIND_COMMENTS_FOR_EVENT":
            return {
                ...state,
                comments: action.comments
            }

        case "ADD_COMMENT_BY_USER_FOR_EVENT":
            return {
                ...state,
                comments: [
                    ...state.comments,
                    action.comment
                ]
            }
        case "UPDATE_COMMENT":
            return {
                comments: state.comments.map(m => {
                    if(m.id === action.comment.id) {
                        m.likes=m.likes+1
                    }
                    return m
                })
            }
        default:
            return state
    }
}
export default commentReducer