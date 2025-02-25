// import { useDispatch, useSelector, useStore } from "react-redux"
// export const useAppDispatch = useDispatch.withTypes()
// export const useAppSelector = useSelector.withTypes()
// export const useAppStore = useStore.withTypes()

import { useDispatch, useSelector } from "react-redux";

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
