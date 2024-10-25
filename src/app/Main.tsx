import React, {useCallback} from 'react';
import Grid from "@mui/material/Grid2";
import {AddItemForm} from "../common/components/AddItemForm/AddItemForm";
import {addTodolistAC} from "../features/todolists/model/todolist-reducer";
import {Container} from "@mui/material";
import {useAppDispatch} from "../common/hooks/useAppDispatch";
import Todolists from "../features/todolists/ui/Todolists/Todolists";


export const Main = () => {
    const dispatch = useAppDispatch();

    const addTodolist = useCallback( (title: string) => {
        dispatch(addTodolistAC(title))
    }, [dispatch])

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

