import React, {useEffect, useState} from 'react';
import { TreePreLoader } from "../common/preloader/PreLoader";
import {Button, IconButton, Pagination, Stack } from "@mui/material";
import {handleDeleteRequest, handleGetRequest, handlePostRequest, handlePutRequest} from "../../helper/requests";
import {BASEURL} from "../../helper/constants";
import './address.css'
import {Delete, Edit} from "@mui/icons-material";
import {useSnackbar} from "notistack";

const UserAddress = (props) => {
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const [address, setAddress] = useState([])
	const [maxPaginationPage, setMaxPaginationPage] = useState(0)
	const [page, setPage] = useState(1)
	const [loading, setLoading] = useState(true);
	const [editAddress, setEditAddress] = useState(props.user)

	useEffect(() => {
		const fetchUserAddress = async () => {
			setLoading(true);

			try  {
				const response = await handleGetRequest(`${BASEURL}user/address/get/paginate/1`, sessionStorage.getItem('authToken'))
				setAddress(response.data.address);
				setMaxPaginationPage(Math.round(response.data.maxPage))
			} catch (error) {
                console.error(error.message);
            }
			setLoading(false);
		}
		fetchUserAddress()
	}, [])

	const handlePageChange = async (event, value) => {
		setLoading(true);
		setPage(value)
		try {
			const response = await handleGetRequest(`${BASEURL}user/address/get/paginate/${value}`, sessionStorage.getItem('authToken'))
			setAddress(response.data.address);
		} catch (error) {
			console.error(error.message);
		}
		setLoading(false);
		console.log(address)
	}

	const deleteUserAddress = async (address_id) => {
        console.log(address_id)
        const response = await handleDeleteRequest(`${BASEURL}user/address/delete`, address_id, sessionStorage.getItem('authToken'))
        if (response.status === 200) {
            enqueueSnackbar(response.data, {variant: 'error', preventDuplicate: true,});

            setTimeout(() => {
                window.location.reload()
            }, 5000)
        }
        console.log(response)
    }

	const editUserAddress = async (addressId) => {
		setEditAddress({...editAddress, addressId: addressId})
		const response = await handlePutRequest(`${BASEURL}user/address/edit`, editAddress, sessionStorage.getItem('authToken'))
		console.log(`Editing ${addressId}`)
		console.log(response.data)
		console.log(`Permanent Address ${editAddress.permAddress}`)
	}

	return (
        <React.Fragment>
	        {loading && <div><TreePreLoader title="Address Loading..."/></div>}

	        {!loading && (
                <div>
	                {address.map((data, key) => {
		                return (
							<div className="row my-4" key={key} >
				                <div className="col-md-6 py-2">
				                    <label className="labels">Country</label>
				                    <input type="text" className="form-control" id="country" name="country" placeholder={data.country}
				                           onChange={e => {setEditAddress({...editAddress, country: e.target.value})}}/>
				                </div>

				                <div className="col-md-6 py-2">
				                    <label className="labels">State/Province</label>
				                    <input type="text" className="form-control" id="state" name="state" placeholder={data.state}
				                           onChange={e => {setEditAddress({...editAddress, state: e.target.value})}}/>
				                </div>

				                <div className="col-md-4 py-2">
				                    <label className="labels">Zip Code</label>
				                    <input type="text" className="form-control" id="zip_code" name="zip_code" placeholder={data.zipCode}
				                           onChange={e => {setEditAddress({...editAddress, zipCode: e.target.value})}}/>
				                </div>

				                <div className="col-md-8 py-2">
				                    <label className="labels">Permanent Address</label>
				                    <input type="text" className="form-control" id="perm_address" name="perm_address" placeholder={data.permAddress}
				                           onChange={e => {setEditAddress({...editAddress, permAddress: e.target.value})}}/>
				                </div>

				                <div className="col-md-6 py-2">
				                    <label className="labels">House Number</label>
				                    <input type="text" className="form-control" id="house_number" name="house_number" placeholder={data.houseNumber}
				                           onChange={e => {setEditAddress({...editAddress, houseNumber: e.target.value})}}/>
				                </div>

				                <div className="col-md-6 py-2">
				                    <label className="labels">Flat Number</label>
				                    <input type="text" className="form-control" id="flat_number" name="flat_number" placeholder={data.flatNumber}
				                           onChange={e => {setEditAddress({...editAddress, flatNumber: e.target.value})}}/>
				                </div>

				                <div className="mt-1 d-flex flex-row align-items-center justify-content-center px-3 w-100">
				                    <Button color="error" onClick={() => { deleteUserAddress(data.id) }}><Delete color="error"/></Button>
				                    <Button color="primary" className="mx-3" onClick={() => editUserAddress(data.id)}><Edit color="primary" /></Button>
				                </div>
				            </div>
						)
	                })}
                </div>
            )}

	        <Stack spacing={2}>
		        <Pagination className="w-100" count={maxPaginationPage} page={page} onChange={handlePageChange}/>
	        </Stack>
        </React.Fragment>
    )
}

export default UserAddress