import React, {useEffect, useState} from 'react';
import { TreePreLoader } from "../common/preloader/PreLoader";
import {Button, IconButton, Pagination, Stack } from "@mui/material";
import {handleDeleteRequest, handleGetRequest} from "../../helper/requests";
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

	async function deleteAddress(address_id) {
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
				                    <input type="text" className="form-control" name="country" placeholder={data.country}/>
				                </div>

				                <div className="col-md-6 py-2">
				                    <label className="labels">State/Province</label>
				                    <input type="text" className="form-control" name="state" placeholder={data.state}/>
				                </div>

				                <div className="col-md-4 py-2">
				                    <label className="labels">Zip Code</label>
				                    <input type="text" className="form-control" name="zip_code" placeholder={data.zipCode}/>
				                </div>

				                <div className="col-md-8 py-2">
				                    <label className="labels">Permanent Address</label>
				                    <input type="text" className="form-control" name="perm_address" placeholder={data.permAddress}/>
				                </div>

				                <div className="col-md-6 py-2">
				                    <label className="labels">House Number</label>
				                    <input type="text" className="form-control" name="house_number" placeholder={data.houseNumber}/>
				                </div>

				                <div className="col-md-6 py-2">
				                    <label className="labels">Flat Number</label>
				                    <input type="text" className="form-control" name="flat_number" placeholder={data.flatNumber}/>
				                </div>

				                <div className="mt-1 d-flex flex-row align-items-center justify-content-center px-3 w-100">
				                    <Button color="primary" onClick={() => { deleteAddress(data.id) }}><Delete color="error"/></Button>
				                    <IconButton aria-label="edit" className="mx-3"><Edit color="primary" /></IconButton>
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