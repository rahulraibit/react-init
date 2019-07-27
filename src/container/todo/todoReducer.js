import ACTIONS from "./todoAction";
import cloneDeep from "lodash/cloneDeep";
import findIndex from "lodash/findIndex";

const defaultState = {
    items: []
};

const todoReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ACTIONS.Types.CREATE_ITEM: {
            console.log(action);

            let item = action.payload;
            let newItem = { id: state.items.length + 1, description: item };
            let newState = cloneDeep(state);
            newState.items.push(newItem);
            return newState;
        }

        case ACTIONS.Types.DELETE_ITEM: {
            let newState = cloneDeep(state);
            let index = findIndex(newState.items, { id: action.payload });
            newState.items.splice(index, 1);
            return newState;
        }

        default:
            return state;
    }
};

export default todoReducer;
