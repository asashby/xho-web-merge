import axios from 'axios'

const httpClient = axios.create({
	baseURL: process.env.CULQI_API_URL,
	headers: {
		'Content-Type': 'application/json'
		// anything you want to add to the headers
	}
})

export default httpClient
