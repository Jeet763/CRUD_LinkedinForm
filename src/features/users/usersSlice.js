import {createSlice ,    nanoid } from "@reduxjs/toolkit";

const initialState = {
    list:[],
};

const usersSlice = createSlice({
    name:'users',
    initialState ,
    reducers :{
        addUser:{
            reducer(state , action){
                state.list.push(action.payload)
            },

        }
    }
})

