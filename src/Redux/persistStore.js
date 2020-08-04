export const loadState = () => {
  try {
    const serializedState = sessionStorage.getItem("forhire_state");
    if (!serializedState) return undefined;
    else return JSON.parse(serializedState);
  } catch(err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem("forhire_state", serializedState);
  } catch(err) {
    console.log(err);
  }
};