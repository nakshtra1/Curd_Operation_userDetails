import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//====> Action

export const createUser = createAsyncThunk(
  "createUser",
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      "https://64eb1fb8e51e1e82c5770287.mockapi.io/curd",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//END

//=====> Read

export const showUser = createAsyncThunk(
  "showUser",
  async (_, { rejectWithValue }) => {
    const response = await fetch(
      "https://64eb1fb8e51e1e82c5770287.mockapi.io/curd"
    );
    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//=====> Edit

export const updateUser = createAsyncThunk(
  "updateUser",
  async (data, { rejectWithValue }) => {
    console.log("updatedData33==>", data);
    const response = await fetch(
      `https://64eb1fb8e51e1e82c5770287.mockapi.io/curd/${data.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//=====> Delete

export const deleteUser = createAsyncThunk(
  "deleteUser",
  async (id, { rejectWithValue }) => {
    const response = await fetch(
      `https://64eb1fb8e51e1e82c5770287.mockapi.io/curd/${id}`,
      { method: "DELETE" }
    );
    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//====> Slice Function

export const userDetail = createSlice({
  name: "userDetail",
  initialState: {
    user: [],
    loading: false,
    error: null,

    //====> Search 
    searchUser: [],
  },
  reducers: {
    //===> Search
    searchUser : (state, action) => {
      state.searchData = action.payload;
    },
  },
  extraReducers: {

    //====> Createuser

    [createUser.pending]: (state) => {
      state.loading = true;
    },
    [createUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.user.push(action.payload);
    },
    [createUser.rejected]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },

    //=====> Showuser

    [showUser.pending]: (state) => {
      state.loading = true;
    },
    [showUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    [showUser.rejected]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },

    //====> Edituser

    [updateUser.pending]: (state) => {
      state.loading = true;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.user.push(action.payload);
    },
    [updateUser.rejected]: (state, action) => {
      state.loading = false;
      state.user = state.user.map((ele) =>
        ele.id === action.payload.id ? action.payload : ele
      );
    },

    //=====>Delete

    [deleteUser.pending]: (state) => {
      state.loading = true;
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.loading = false;
      // state.user.push(action.payload);
      const { id } = action.payload;
      // console.log("delete action", action.payload);

      if (id) {
        state.user = state.user.filter((ele) => ele.id !== id);
      }
    },
    [deleteUser.rejected]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
  },
});

//END

export default userDetail.reducer;

//====>search data send 

export const { searchUser } = userDetail.actions;
