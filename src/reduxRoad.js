const initialWagonState = {
  supplies: 100,
  distance: 0,
  days: 0,
};

const swagReducer = (state = initialWagonState, action) => {
  switch (action.type) {
    case "gather": {
      return {
        ...state,
        supplies: state.supplies + 15,
        distance: state.distance,
        days: state.days + 1,
      };
    }
    case "travel": {
      const travelDays = action.payload; // Corrected typo here
      const suppliesNeeded = 20 * travelDays;
      if (state.supplies < suppliesNeeded) {
        return state;
      }
      return {
        ...state,
        supplies: state.supplies - suppliesNeeded,
        distance: state.distance + 10 * travelDays,
        days: state.days + travelDays,
      };
    }
    case "tippedWagon": {
      return {
        ...state,
        supplies: state.supplies - 30,
        distance: state.distance,
        days: state.days + 1,
      };
    }
    default: {
      return state;
    }
  }
};

let wagon = swagReducer(undefined, {});
wagon = swagReducer(wagon, { type: "travel", payload: 1 });
wagon = swagReducer(wagon, { type: "gather" });
wagon = swagReducer(wagon, { type: "tippedWagon" });
wagon = swagReducer(wagon, { type: "travel", payload: 3 });
console.log(wagon); // State after traveling for 3 days
