import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useState } from 'react'

const AddHabitForm: React.FC = () => {
    const [name, setName] = useState<string>("");
    const [frequency, setFrequency] = useState<"daily" | "weekly">("daily");
  return (
    <form>
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2
        }}>
            <TextField label="Habit Name"
             value={name}
             onChange={(e) => setName(e.target.value)} 
             placeholder='Habit name'
             fullWidth
             />
             <FormControl fullWidth>
                    <InputLabel>Frequency</InputLabel>
                    <Select sx={{mb: 2}} value={frequency} onChange={(e) => setFrequency(e.target.value as "daily" | "weekly")}  label="Frequency">
                        <MenuItem value="daily">Daily</MenuItem>
                        <MenuItem value="weekly">Weekly</MenuItem>
                    </Select>
                    <Button type='submit' variant='contained' color='primary'>Add Habit</Button>
             </FormControl>
        </Box>
    </form>
  )
}

export default AddHabitForm