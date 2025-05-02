import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const serverUrl = import.meta.env.VITE_API_BASE_URL;
export const productSlice = createSlice({
  name: "product",
  initialState: {
    list: {
      data: [],
      totalPages: 0,
      currentPage: 0,
      totalData: 0,
      dataPerPage: 0,
    },
    detail: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      console.log(action.payload, "<< ap");
      state.list.data = action.payload.data;
      state.list.totalPages = action.payload.totalPages;
      state.list.currentPage = action.payload.currentPage;
      state.list.totalData = action.payload.totalData;
      state.list.dataPerPage = action.payload.dataPerPage;
    });
    builder.addCase(fetchProducts.pending, () => {
      console.log("Fetching products...");
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      console.error("Error fetching products:", action.error);
    });

    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      console.log(action.payload, "<< ap");
      state.detail = action.payload.data;
    });
    builder.addCase(fetchProductById.pending, () => {
      console.log("Fetching detail product...");
    });
    builder.addCase(fetchProductById.rejected, (state, action) => {
      console.error("Error fetching detail product:", action.error);
    });
  },
});

export const { setProducts, setProduct } = productSlice.actions;

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async ({ q, filter, sort, page } = {}) => {
    const params = new URLSearchParams();

    if (q) params.append("q", q);

    // Filter (contoh: filter.categories = "1,2")
    if (filter?.categories) {
      params.append("filter[categories]", filter.categories);
    }

    // Sort (contoh: sort.by = "name", sort.order = "asc")
    if (sort?.by) params.append("sort[by]", sort.by);
    if (sort?.order) params.append("sort[order]", sort.order);

    // Pagination
    if (page?.number) params.append("page[number]", page.number);
    if (page?.size) params.append("page[size]", page.size);

    const { data } = await axios.get(`${serverUrl}/products?${params}`);
    return data;
  }
);

export const fetchProductById = createAsyncThunk(
  "product/fetchProductById",
  async (productId) => {
    const { data } = await axios.get(`${serverUrl}/products/${productId}`);
    return data;
  }
);

export default productSlice.reducer;
