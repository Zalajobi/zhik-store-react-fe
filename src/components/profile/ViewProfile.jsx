import React, {useState} from 'react'
import {Box, Button, IconButton, Modal, Typography} from "@mui/material";
import {Add, Delete, Edit} from "@mui/icons-material";
import {handleDeleteRequest, handlePostRequest} from "../../helper/requests";
import {BASEURL} from "../../helper/constants";
import {toast} from "react-toastify";


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
    const addressList = [];
    const [openAddressModal, setOpenAddressModal] = React.useState(false);
    const [newAddress, setNewAddress] = React.useState({})
    const handleOpenAddressModal = () => setOpenAddressModal(true);
    const handleCloseAddressModal = () => setOpenAddressModal(false);

    async function deleteAddress(address_id) {
        console.log(address_id)
        const response = await handleDeleteRequest(`${BASEURL}user/address/delete`, address_id, sessionStorage.getItem('authToken'))
        if (response.status === 200) {
            toast.success(`${response.data}`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            setTimeout(() => {
                window.location.reload()
            }, 5000)
        }
        console.log(response)
    }

    for (let address of props.userProfileDetails.addresses) {
        const row = (
            <div className="row my-4" key={address.id} >
                <div className="col-md-6 py-2">
                    <label className="labels">Country</label>
                    <input type="text" className="form-control" name="country" placeholder={address.country}/>
                </div>

                <div className="col-md-6 py-2">
                    <label className="labels">State/Province</label>
                    <input type="text" className="form-control" name="state" placeholder={address.state}/>
                </div>

                <div className="col-md-4 py-2">
                    <label className="labels">Zip Code</label>
                    <input type="text" className="form-control" name="zip_code" placeholder={address.zipCode}/>
                </div>

                <div className="col-md-8 py-2">
                    <label className="labels">Permanent Address</label>
                    <input type="text" className="form-control" name="perm_address" placeholder={address.permAddress}/>
                </div>

                <div className="col-md-6 py-2">
                    <label className="labels">House Number</label>
                    <input type="text" className="form-control" name="house_number" placeholder={address.houseNumber}/>
                </div>

                <div className="col-md-6 py-2">
                    <label className="labels">Flat Number</label>
                    <input type="text" className="form-control" name="flat_number" placeholder={address.flatNumber}/>
                </div>

                <div className="mt-1 d-flex flex-row align-items-center justify-content-center px-3 w-100">
                    <Button color="primary" onClick={() => { deleteAddress(address.id) }}><Delete color="error"/></Button>
                    <IconButton aria-label="edit" className="mx-3"><Edit color="primary" /></IconButton>
                </div>
            </div>
        );
        addressList.push(row);
    }

    const addAddress = async (event) => {
        const data = {
            "country": document.getElementById("country").value,
            "state": document.getElementById("state").value,
            "zipCode": document.getElementById("zip_code").value,
            "permAddress": document.getElementById("perm_address").value,
            "houseNumber": document.getElementById("house_number").value,
            "flatNumber": document.getElementById("flat_number").value
        }
        event.preventDefault();
		const response = await handlePostRequest(data, `${BASEURL}user/address/add`, sessionStorage.getItem('authToken'))
        console.log(response)
    }

    return (
		<React.Fragment>
			<div className="container rounded bg-white mt-5 mb-5">
                <div className="row">
                    <div className="col-md-3 border-right">
                        <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                            <img className="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" alt="Profile Image"/>
                            <span className="font-weight-bold">{props.userProfileDetails.username}</span><span className="text-black-50">{props.userProfileDetails.email}</span><span> </span>
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

                            {addressList}
                        </div>
                    </div>
                    
                    <Modal open={openAddressModal} onClose={handleCloseAddressModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                        <Box component="form" noValidate onSubmit={addAddress} sx={addressBoxStyle}>
                            <div className="row my-4">
                                <div className="col-md-6 py-2">
                                    <label className="labels">Country</label>
                                    <input type="text" className="form-control" name="country" id="country" placeholder="Country"/>
                                </div>

                                <div className="col-md-6 py-2">
                                    <label className="labels">State/Province</label>
                                    <input type="text" className="form-control" name="state" id="state" placeholder="State"/>
                                </div>

                                <div className="col-md-4 py-2">
                                    <label className="labels">Zip Code</label>
                                    <input type="text" className="form-control" name="zip_code" id="zip_code" placeholder="Zip Code"/>
                                </div>

                                <div className="col-md-8 py-2">
                                    <label className="labels">Permanent Address</label>
                                    <input type="text" className="form-control" name="perm_address" id="perm_address" placeholder="Permanent Address"/>
                                </div>

                                <div className="col-md-6 py-2">
                                    <label className="labels">House Number</label>
                                    <input type="text" className="form-control" name="house_number" id="house_number" placeholder="House Number"/>
                                </div>

                                <div className="col-md-6 py-2">
                                    <label className="labels">Flat Number</label>
                                    <input type="text" className="form-control" name="flat_number" id="flat_number" placeholder="Flat Number"/>
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