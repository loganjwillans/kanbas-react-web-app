import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/reducer";
import assignmentReducer from "./Courses/Assignments/reducer";
import accountReducer from "./Account/reducer";
import quizzesReducer from "./Courses/Quizzes/reducer";
const store = configureStore({
  reducer: {
    modulesReducer,
    assignmentReducer,
    accountReducer,
    quizzesReducer,
  },
});
export default store;