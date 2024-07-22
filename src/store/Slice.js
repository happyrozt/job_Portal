import { createSlice } from "@reduxjs/toolkit";
import { getLoggeduserDatafromlocStr, getUsersWithRoleHirer } from "../utils/localStorageHelpers";
const initialState = {
    isUserLoggedIn: null,
    isUserRole: null,
    logedUserData:getLoggeduserDatafromlocStr(),
    jobsData: getUsersWithRoleHirer(),
    userJobData: null,
    jobPostStatus: null,
    closeJobData: [],
    selectedJob: null,
    proposal: null,
    appliedJobData: null,
    receivedProposal: [],
    userSearchedData: [],
    isApplied: false,
    verifyEmail: false,
    registerUserData: null,
}



const userAuthSlice = createSlice({
    name: "Auth",
    initialState,
    reducers: {
        getLoggeduserData: (state, action) => {
            state.logedUserData = action.payload;
        },
        checkLoggedIn: (state, action) => {
            state.isUserLoggedIn = action.payload
        },
        userLogout: (state, action) => {
            state.isUserLoggedIn = action.payload,
            state.logedUserData = action.payload
        },
        setUserRole: (state, action) => {
            state.isUserRole = action.payload
        },
        setUserData: (state, action) => {
            
            state.logedUserData = action.payload 
        },
        setAllHirerData: (state, action) => {
            state.jobsData = action.payload
        },
        setUsersJobData: (state, action) => {
            state.userJobData = action.payload
        },
        updateJobPoststatus: (state, action) => {
            state.jobPostStatus = action.payload
        },
        getUserLogedUserDataByEmail: (state, action) => {
            state.closeJobData = action.payload
        },

        userSelectedJob: (state, action) => {
            state.selectedJob = action.payload
        },

        sendProposal: (state, action) => {
            state.proposal = action.payload
        },

        getAppliedJobData: (state, action) => {
            state.appliedJobData = action.payload
        },

        setAppliedJobData: (state, action) => {
            state.appliedJobData = action.payload
        },
        setReceivedProposal: (state, action) => {
            state.receivedProposal = action.payload
        },
        setSearchedData: (state, action) => {
            state.userSearchedData = action.payload
        },

        checkFreeLancerJobApplication: (state, action) => {
            state.isApplied = action.payload;
        }
    }
})


export const { getLoggeduserData, checkLoggedIn, userLogout, setUserRole, setUserData, setUsersJobData, updateJobPoststatus,
    getUserLogedUserDataByEmail, userSelectedJob, sendProposal, getAppliedJobData, setAppliedJobData,
    setReceivedProposal, setSearchedData,
    fetchUserSelectedjob, checkFreeLancerJobApplication, authEmail, registerUser, setAllHirerData } = userAuthSlice.actions;

export default userAuthSlice.reducer;