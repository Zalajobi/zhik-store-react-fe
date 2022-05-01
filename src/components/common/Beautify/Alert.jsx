import {toast} from "react-toastify";

const topCenterColored = {
	position: "top-center",
	autoClose: 5000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
}

export const successColoredTopCenter = (title) => {toast.success(title, topCenterColored)}

export const infoColoredTopCenter = (title) => {toast.info(title, topCenterColored)}

export const warningColoredTopCenter = (title) => {toast.warn(title, topCenterColored)}

export const errorColoredTopCenter = (title) => {toast.error(title, topCenterColored)}

export const defaultTopCenter = (title) => {toast(title, topCenterColored)}