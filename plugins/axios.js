import axios from 'axios'

const httpClient = axios.create({
	baseURL: process.env.URL_BASE,
	headers: {
		'Content-Type': 'application/json'
		// anything you want to add to the headers
	}
})

export default httpClient
