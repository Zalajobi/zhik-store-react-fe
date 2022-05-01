import React, {useEffect, useState} from 'react'
import { useSelector} from "react-redux";
import Header from "../../components/common/header/Header";
import ViewProfile from "../../components/profile/ViewProfile";
import {handleGetRequest} from "../../helper/requests";
import {BASEURL} from "../../helper/constants";
import PreLoader from "../../components/common/preloader/PreLoader";
import {infoColoredTopCenter} from "../../components/common/Beautify/Alert";
// import AuthToken from "../../helper/contextApi";
// import {getAuthToken, selectAuthToken} from "../../redux/Reducers";

const UserProfile = (props) => {
    const [userProfile,  setUserProfile] = useState({})
    const [loading, setLoading] = useState(true);
    // const token = useSelector((state) => state.authToken.value);
    // const token = useSelector(getAuthToken)

    useEffect(() => {
        // console.log(AuthToken.token)
        // console.log(`Here is ur Token ${token}`)
        {infoColoredTopCenter('Hello Zhikrullah')}
        const fetchData = async () => {
            setLoading(true);

            try {
                const {data: response} = await handleGetRequest(`${BASEURL}user/profile/view`, sessionStorage.getItem('authToken'))
                setUserProfile(response);
            } catch (error) {
                console.error(error.message);
            }
            setLoading(false);
        }
        fetchData();
  }, []);


    return (
        <React.Fragment>
            {loading && <div><PreLoader title="Profile Loading..."/></div>}

            {!loading && (
                <div>
                    <ViewProfile userProfileDetails={userProfile}/>
                </div>
            )}
        </React.Fragment>
    )
}

export default UserProfile;