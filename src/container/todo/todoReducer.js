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
            newState.items = newState.items.filter(f => f.id != action.payload)
            return newState;
        }
        case ACTIONS.Types.EDIT_ITEM: {
            let newState = cloneDeep(state);
            let index = findIndex(newState.items, { id: action.payload.id });
            newState.items[index].description = action.payload.description
            return newState;
        }

        default:
            return state;
    }
};

export default todoReducer;
