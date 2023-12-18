import { useDispatch, useSelector } from "react-redux";
import store from "../redux/store";

/**
 * @typedef {typeof store.dispatch} AppDispatch
 * @type {() => AppDispatch}
 */
export const useAppDispatch = useDispatch;

/**
 * @typedef {ReturnType<typeof store.getState>} RootState
 * @type {import("react-redux").TypedUseSelectorHook<RootState}
 */
export const useAppSelector = useSelector;
