import axios from 'axios'

export async function handlePostRequest(bodyFormData, url, authToken) {
	if (authToken)
		return await axios.post(url, bodyFormData, {
			headers: {
				'Authorization': `Bearer ${authToken}`
			}
		})
	else
		return await axios.post(url, bodyFormData)
	// axios({
	// 	method: method,
	// 	url: `${BASEURL}${url}`,
	// 	data: bodyFormData,
	// 	headers: { "Content-Type": "multipart/form-data" },
	// })
	// .then(function (response) {
	// 	return  response
	// })
	// .catch(function (response) {
    //     return response
    // });
}

export async function handleGetRequest(url,  authToken) {
	return await axios.get(url, {
		headers: {
			'Authorization': `Bearer ${authToken}`
		}
	})
}

export async function handleDeleteRequest(url, jsonData, authToken) {
	return await axios.delete(url, {
		headers: {
			'Authorization': `Bearer ${authToken}`
		},
		data: {
			id: jsonData
		}
	})
}

export async function handlePutRequest(url, data, authToken) {
	return await axios.put(url, data, {
		headers: {
			'Authorization': `Bearer ${authToken}`
		}
	})
}