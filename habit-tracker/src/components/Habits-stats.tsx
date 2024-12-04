import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { fetchHabits, Habit } from '../store/habit-slice';
import { LinearProgress, Paper, Typography } from '@mui/material';

const HabitStats: React.FC = () => {
    const {habits, isLoading, error} = useSelector((state: RootState) => state.habits)
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {{
        dispatch(fetchHabits());
    }}, [])

    const getCompletedToday = () => {
        const today = new Date().toISOString().split("T")[0];
        return habits.filter((habit) => habit.completedDates.includes(today)).length;
    }

    const getStreak = (habit: Habit) => {
        let streak = 0;
        const currentDate = new Date();
        while(true){
            const dateString = currentDate.toISOString().split("T")[0];
            if(habit.completedDates.includes(dateString)){
                streak++;
                currentDate.setDate(currentDate.getDate() - 1);
            } else {
                break;
            }
        }
        console.log("streak", streak);
        return streak;
    }

    const getLongestStreak = () => {
        return Math.max(...habits.map(getStreak), 0);
    }

    if(isLoading) return <LinearProgress />;

    if(error) return <Typography variant="h6" gutterBottom>{error}</Typography>;

  return <Paper elevation={2} sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="h6" gutterBottom>Habit Stats</Typography>        
        <Typography variant="body1" gutterBottom>Total Habit: {habits.length}</Typography>        
        <Typography variant="h6" gutterBottom>Completed Today: {getCompletedToday()}</Typography>        
        <Typography variant="h6" gutterBottom>Longest Streak: {getLongestStreak()}</Typography>        
    </Paper>
 
    
}

export default HabitStats