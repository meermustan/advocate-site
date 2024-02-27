import { createSlice } from "@reduxjs/toolkit";
import blogList from "../../api/blogList";
import posts from "../../api/posts";

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blogItems: blogList,
    posts: posts,
    selectedBlog: "",
  },
  reducers: {
    setSelectedBlog(state, action) {
      state.selectedBlog = action.payload;
    },
  },
});

export const { setSelectedBlog } = blogSlice.actions;

export default blogSlice.reducer;
