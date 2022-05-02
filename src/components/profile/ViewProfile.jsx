import React, {useState} from 'react'
import {Box, Button, IconButton, Modal, Typography} from "@mui/material";
import {Add, Delete, Edit} from "@mui/icons-material";
import {toast} from "react-toastify";
import {handleDeleteRequest, handlePostRequest} from "../../helper/requests";
import {BASEURL} from "../../helper/constants";
import { useSnackbar } from 'notistack'
import { IKImage, IKContext, IKUpload } from "imagekitio-react";
import { MaterialImageUpload } from "../common/MaterialDesignComponents";
import UserAddress from "./UserAddress";


const addressBoxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ViewProfile = (props) => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [openAddressModal, setOpenAddressModal] = React.useState(false);
    const [newAddress, setNewAddress] = React.useState(props.user)

    const handleOpenAddressModal = () => setOpenAddressModal(true);
    const handleCloseAddressModal = () => setOpenAddressModal(false);

    const addAddress = async () => {
		const response = await handlePostRequest(newAddress, `${BASEURL}user/address/add`, sessionStorage.getItem('authToken'))
        enqueueSnackbar(response.data, {variant: 'success', preventDuplicate: true,});

         setTimeout(() => {
                window.location.reload()
         }, 5000)
    }

    return (
		<React.Fragment>
			<div className="container rounded bg-white mt-5 mb-5">
                <div className="row">
                    <div className="col-md-3 border-right">
                        <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                            <img className="rounded-circle mt-5" width="150px" src={props.userProfileDetails.profilePicture} alt="Profile Image"/>

                            <div className="my-2">
                                <MaterialImageUpload/>
                            </div>
                            <span className="text-black-50">{props.userProfileDetails.email}</span>
                        </div>
                    </div>

                    <div className="col-md-5 border-right">
                        <div className="p-3 py-5">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h4 className="text-right">Profile Settings</h4>
                            </div>
                            <div className="row mt-2">
                                <div className="col-md-4 py-2"><label className="labels">Title</label><input disabled type="text" className="form-control" placeholder={props.userProfileDetails.title} name="title"/></div>
                                <div className="col-md-8 py-2"><label className="labels">Username</label><input disabled type="text" className="form-control" placeholder={props.userProfileDetails.username} name="username"/></div>
                                <div className="col-md-6 py-2"><label className="labels">Last Name</label><input type="text" className="form-control" placeholder={props.userProfileDetails.lastName} name="last_name"/></div>
                                <div className="col-md-6 py-2"><label className="labels">First Name</label><input type="text" className="form-control" placeholder={props.userProfileDetails.firstName} name="first_name"/></div>
                                <div className="col-md-6 py-2"><label className="labels">Middle Name</label><input type="text" className="form-control" placeholder={props.userProfileDetails.middleName} name="middle_name"/></div>
                                <div className="col-md-6 py-2"><label className="labels">Sex</label><input disabled type="text" className="form-control" placeholder={props.userProfileDetails.gender} name="gender"/></div>
                                <div className="col-md-12 py-2"><label className="labels">Email</label><input disabled type="text" className="form-control" placeholder={props.userProfileDetails.email} name="email"/></div>
                                <div className="col-md-6 py-2"><label className="labels">Phone Number</label><input disabled type="number" className="form-control" placeholder={props.userProfileDetails.phoneNumber} name="phone"/></div>
                                <div className="col-md-6 py-2"><label className="labels">Date of Birth</label><input disabled type="number" className="form-control" placeholder={props.userProfileDetails.dateOfBirth} name="dob"/></div>
                            </div>

                            {/*<h5 className="text-center my-4">Address</h5>*/}

                            <div className="mt-5 text-center">
                                <button className="btn btn-primary profile-button" type="button">Save Profile</button>
                            </div>

                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="p-3 py-5">
                            <div className="d-flex justify-content-between align-items-center experience">
                                <span>Address</span>
                                <Button onClick={() => { handleOpenAddressModal()}} className="border px-3 p-1 add-experience"><IconButton aria-label="edit" className="mx-3"><Add color="primary" /></IconButton>&nbsp;Address</Button>
                            </div>

                            <UserAddress/>
                        </div>
                    </div>
                    
                    <Modal open={openAddressModal} onClose={handleCloseAddressModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                        <Box component="form" noValidate onSubmit={addAddress} sx={addressBoxStyle}>
                            <div className="row my-4">
                                <div className="col-md-6 py-2">
                                    <label className="labels">Country</label>
                                    <input type="text" className="form-control" name="country" id="country" onChange={e => {setNewAddress({...newAddress, country: e.target.value})}} placeholder="Country"/>
                                </div>

                                <div className="col-md-6 py-2">
                                    <label className="labels">State/Province</label>
                                    <input type="text" className="form-control" name="state" id="state" onChange={e => {setNewAddress({...newAddress, state: e.target.value})}} placeholder="State"/>
                                </div>

                                <div className="col-md-4 py-2">
                                    <label className="labels">Zip Code</label>
                                    <input type="text" className="form-control" name="zip_code" id="zip_code" onChange={e => {setNewAddress({...newAddress, zipCode: e.target.value})}} placeholder="Zip Code"/>
                                </div>

                                <div className="col-md-8 py-2">
                                    <label className="labels">Permanent Address</label>
                                    <input type="text" className="form-control" name="perm_address" id="perm_address" onChange={e => {setNewAddress({...newAddress, permAddress: e.target.value})}} placeholder="Permanent Address"/>
                                </div>

                                <div className="col-md-6 py-2">
                                    <label className="labels">House Number</label>
                                    <input type="text" className="form-control" name="house_number" id="house_number"  onChange={e => {setNewAddress({...newAddress, houseNumber: e.target.value})}} placeholder="House Number"/>
                                </div>

                                <div className="col-md-6 py-2">
                                    <label className="labels">Flat Number</label>
                                    <input type="text" className="form-control" name="flat_number" id="flat_number" onChange={e => {setNewAddress({...newAddress, flatNumber: e.target.value})}} placeholder="Flat Number"/>
                                </div>

                                <div className="mt-1 d-flex flex-row align-items-center justify-content-center px-3 w-100">
                                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Add Address</Button>
                                </div>
                            </div>
                        </Box>
                    </Modal>
                </div>
            </div>
		</React.Fragment>
	)
}

export default ViewProfile