import axios from 'axios'

const culqiHttpClient = axios.create({
	baseURL: 'https://api.culqi.com/v2',
	headers: {
		'Content-Type': 'application/json'
		// anything you want to add to the headers
	}
})

export default culqiHttpClient
