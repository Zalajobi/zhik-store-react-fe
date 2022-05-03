import React from 'react'
import { Fab } from "@mui/material";
import { Image, AddPhotoAlternateOutlined } from '@mui/icons-material';

export const MaterialImageUpload = (props) => {
	return (
		<React.Fragment>
			<input accept="image/*" id="contained-button-file" className="d-none" type="file" />
            <label htmlFor="contained-button-file">
	            <Fab component="span">
		            <AddPhotoAlternateOutlined />
              </Fab>
            </label>
		</React.Fragment>
	)
}