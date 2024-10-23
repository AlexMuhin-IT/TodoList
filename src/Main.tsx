import React from 'react';
import Grid from "@mui/material/Grid2";
import {AddItemForm} from "./components/addItemForm/AddItemForm";
import {Container} from "@mui/material";
import {useAppDispatch} from "./app/hooks";
import {addTodolistAC} from "./model/todolist-reducer";
import Todolists from "./Todolists";


const Main = () => {

    const dispatch = useAppDispatch();
    const addTodolist = (title: string) => {
        dispatch(addTodolistAC(title))
    }
    return (
        <Container fixed>
            <Grid sx={{mb: '30px'}} container spacing={2}>
                <Grid size={8} alignItems={"center"}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={4}>
                    <Todolists/>
                </Grid>
            </Grid>
        </Container>

    );
};

export default Main;