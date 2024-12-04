import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Habit {
    id: string,
    name: string,
    frequency: 'daily' | 'weekly',
    completedDates: string[],
    createdAt: string;
}

interface HabitState {
    habits: Habit[];
    isLoading: boolean;
    error: string | null;
}

const initialState: HabitState = {
    habits: [],
    isLoading: false,
    error: null
};
export const fetchHabits = createAsyncThunk('habits/fetchHabits', async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const mockHabits:Habit[] = [
        {
            id: "1",
            name: "Read a book",
            frequency: "daily",
            completedDates: [],
            createdAt: new Date().toISOString(),
        },
        {
            id: "2",
            name: "Go for a run",
            frequency: "weekly",
            completedDates: [],
            createdAt: new Date().toISOString(),
        },  
        {
            id: "3",
            name: "Meditate",
            frequency: "daily",
            completedDates: [],
            createdAt: new Date().toISOString(),
        },
        {
            id: "4",
            name: "Write a journal entry",
            frequency: "daily",
            completedDates: [],
            createdAt: new Date().toISOString(),
        },
        {
            id: "5",
            name: "Go for a walk",
            frequency: "daily",
            completedDates: [],
            createdAt: new Date().toISOString(),
        },
    ]
    return mockHabits
});

const habitSlice = createSlice({
    name: 'habits',
    initialState,
    reducers: {
        addHabit: (state, action: PayloadAction<{name: string, frequency: 'daily' | 'weekly'}>) => {
            const newHabit:Habit = {
                id: Date.now().toString(),
                name: action.payload.name,
                frequency: action.payload.frequency,
                completedDates: [],
                createdAt: new Date().toISOString(),
            };
            state.habits.push(newHabit);
        },
        toggleHabit: (state, action: PayloadAction<{id: string; date: string }>) => {
            const habit = state.habits.find((h) => h.id === action.payload.id);
            if(habit) {
                const index = habit.completedDates.indexOf(action.payload.date);
                if(index > -1) {
                    habit.completedDates.splice(index, 1);
                } else {
                    habit.completedDates.push(action.payload.date);
                    
                }
            }
        },
        removeHabit: (state, action: PayloadAction<string>) => {
            state.habits = state.habits.filter((h) => h.id !== action.payload);         
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchHabits.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchHabits.fulfilled, (state, action) => {
            state.isLoading = false;
            state.habits = action.payload;
        })
        builder.addCase(fetchHabits.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || 'Failed to fetch habits';
        })
    }
})

export const {addHabit, toggleHabit, removeHabit} = habitSlice.actions;
export default habitSlice.reducer;