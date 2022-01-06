import axios from 'axios'

const culqiHttpClient = axios.create({
	baseURL: 'https://api.culqi.com/v2',
	headers: {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Credentials': 'true'
		// anything you want to add to the headers
	}
})

export default culqiHttpClient
