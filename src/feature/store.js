
import questionreducer from './questionSlice.js'
import { configureStore } from '@reduxjs/toolkit'

export const store=configureStore({
    reducer:{
        questionslice:questionreducer,
    }
})