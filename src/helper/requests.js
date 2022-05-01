import axios from 'axios'

export async function handlePostRequest(bodyFormData, url) {
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