import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  mode: "light",
  user: null,
  token: null,
  // sessionExpireDate: null, // Client side session expiration
  sortBySection: "shorttops", // Controls apparel sorting in wardrobe and queries
  sectionSortingMode: "auto", // Enables automatic section switching when creating styles
  sortByOccasion: "", // Controls styles sorting
  creatingStyle: false, // Displays CreateStyleWidget
  editingStyle: false, // Displays EditStyleWidget
  editingStyleId: null, // ID for style in edit mode
  stylingHeadwear: null, // Style widget's display section
  stylingShortTops: null, // Style widget's display section
  stylingLongTops: null, // Style widget's display section
  stylingOuterwear: null, // Style widget's display section
  stylingOnePiece: null, // Style widget's display section
  stylingPants: null, // Style widget's display section
  stylingShorts: null, // Style widget's display section
  stylingFootwear: null, // Style widget's display section
  stylingOccasions: [], // Loads the 'occasions' property of a style when editing
  dailyAllowedResets: 2, // Demo actions for guest users
  dailyAllowedUploads: 3, // Demo actions for guest users
  dailyAllowedSaves: 10, // Demo actions for guest users
  dailyAllowedEdits: 10, // Demo actions for guest users
  dailyAllowedDeletes: 10, // Demo actions for guest users
  nextRefreshDate: null // Demo actions refresh time for daily allowed functions
}

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light"
    },
    setLogin: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
    },
    setLogout: (state) => {
      state.user = null
      state.token = null
    },
    // setSessionExpireDate: (state, action) => {
    //   state.sessionExpireDate = action.payload.sessionExpireDate
    // },
    setSortBySection: (state, action) => {
      state.sortBySection = action.payload.sortBySection
    },
    setSectionSortingMode: (state) => {
      state.sectionSortingMode = state.sectionSortingMode === "auto" ? "manual" : "auto"
    },
    setSortByOccasion: (state, action) => {
      state.sortByOccasion = action.payload.sortByOccasion
    },
    setCreatingStyle: (state, action) => {
      state.creatingStyle = action.payload.creatingStyle
    },
    setEditingStyle: (state, action) => {
      state.editingStyle = action.payload.editingStyle
    },
    setEditingStyleId: (state, action) => {
      state.editingStyleId = action.payload.editingStyleId
    },
    setStylingHeadwear: (state, action) => {
      state.stylingHeadwear = action.payload.stylingHeadwear
    },
    setStylingShortTops: (state, action) => {
      state.stylingShortTops = action.payload.stylingShortTops
    },
    setStylingLongTops: (state, action) => {
      state.stylingLongTops = action.payload.stylingLongTops
    },
    setStylingOuterwear: (state, action) => {
      state.stylingOuterwear = action.payload.stylingOuterwear
    },
    setStylingOnePiece: (state, action) => {
      state.stylingOnePiece = action.payload.stylingOnePiece
    },
    setStylingPants: (state, action) => {
      state.stylingPants = action.payload.stylingPants
    },
    setStylingShorts: (state, action) => {
      state.stylingShorts = action.payload.stylingShorts
    },
    setStylingFootwear: (state, action) => {
      state.stylingFootwear = action.payload.stylingFootwear
    },
    setStylingOccasions: (state, action) => {
      state.stylingOccasions = action.payload.stylingOccasions
    },
    setDailyAllowedResets: (state, action) => {
      state.dailyAllowedResets = action.payload.dailyAllowedResets
    },
    setDailyAllowedUploads: (state, action) => {
      state.dailyAllowedUploads = action.payload.dailyAllowedUploads
    },
    setDailyAllowedSaves: (state, action) => {
      state.dailyAllowedSaves = action.payload.dailyAllowedSaves
    },
    setDailyAllowedEdits: (state, action) => {
      state.dailyAllowedEdits = action.payload.dailyAllowedEdits
    },
    setDailyAllowedDeletes: (state, action) => {
      state.dailyAllowedDeletes = action.payload.dailyAllowedDeletes
    },
    setNextRefreshDate: (state, action) => {
      state.nextRefreshDate = action.payload.nextRefreshDate
    },
  }
})

export const {
  setMode,
  setLogin,
  setLogout,
  // setSessionExpireDate,
  setSortBySection,
  setSectionSortingMode,
  setSortByOccasion,
  setCreatingStyle,
  setEditingStyle,
  setEditingStyleId,
  setStylingHeadwear,
  setStylingShortTops,
  setStylingLongTops,
  setStylingOuterwear,
  setStylingOnePiece,
  setStylingPants,
  setStylingShorts,
  setStylingFootwear,
  setStylingOccasions,
  setDailyAllowedResets,
  setDailyAllowedUploads,
  setDailyAllowedSaves,
  setDailyAllowedEdits,
  setDailyAllowedDeletes,
  setNextRefreshDate
} = appSlice.actions
export default appSlice.reducer