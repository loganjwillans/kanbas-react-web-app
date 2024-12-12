import {createSlice} from "@reduxjs/toolkit";

interface Assignment {
    _id: string;
    title: string;
    course: string;
    points: number;
    available_from: string;
    available_until: string;
    description: string;
    due: string;
}

const initialState = {
    assignments: [] as Assignment[],
};
const assignmentsSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
        addAssignment: (state, {payload: assignment}) => {
            const newAssignment: any = {
                ...assignment,
                _id: new Date().getTime().toString(),
            };
            state.assignments = [...state.assignments, newAssignment] as any;
        },
        deleteAssignment: (state, {payload: assignmentId}) => {
            state.assignments = state.assignments.filter(
                (a: any) => a._id !== assignmentId);
        },
        updateAssignment: (state, {payload: assignment}) => {
            state.assignments = state.assignments.map((a: any) => {
                    if (a._id === assignment._id) {
                        return assignment;
                    } else {
                        return a;
                    }
                }
            );
        },
        setAssignments: (state, action) => {
            state.assignments = action.payload;
        },

    },
});
export const {
    addAssignment,
    deleteAssignment,
    updateAssignment,
    setAssignments
} =
    assignmentsSlice.actions;
export default assignmentsSlice.reducer;