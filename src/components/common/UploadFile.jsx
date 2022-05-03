import React, {useState} from 'react';
import {Button, Fab} from "@mui/material";
import {AddPhotoAlternateOutlined} from "@mui/icons-material";
import UploadOutlinedIcon from '@mui/icons-material/UploadOutlined';
import { handlePostRequest } from "../../helper/requests";
import {MaterialImageUpload} from "./MaterialDesignComponents";
import {useSnackbar} from "notistack";

export const UploadSingleImage = (props) => {
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const [selectedFile, setSelectedFile] = useState();
	const uploadSingleImage = async (file) => {
		file.preventDefault()

		const formData = new FormData();
		formData.append('image', selectedFile, selectedFile.name);

		const response = await handlePostRequest(formData, props.uploadURL, sessionStorage.getItem('authToken'))

		if (response.status === 200) {
			enqueueSnackbar(response.data, {variant: 'success', preventDuplicate: true,});

			setTimeout(() => {
                window.location.reload()
			}, 5000)
		}
	}

	const singleImageSelectHandler = (e) => {
		console.log(e.target.files[0])
		setSelectedFile(e.target.files[0])
	}

	return (
	  <React.Fragment>
		  <div className="my-2">
			  <form onSubmit={uploadSingleImage}>
				  <input accept="image/*" id="file" className="d-none" type="file" onChange={singleImageSelectHandler}/>
				  <label htmlFor="file">
					  <Fab component="span">
						  <AddPhotoAlternateOutlined />
					  </Fab>
				  </label>
				  <Button type="submit"><UploadOutlinedIcon/></Button>
			  </form>

			  {/*<MaterialImageUpload/>*/}
		  </div>
	  </React.Fragment>
  )
}