import axios from 'axios'

const httpClient = axios.create({
	baseURL: 'https://app.xiprofit.com/wp-json/wc/v3',
	auth: {
		username: 'ck_fa2789b2e112b28e9c91668b8c212e2db1bff48a',
		password: 'cs_6e5c8f4ea52c8d92282ec356a6712b3c51f3c706'
	},
	headers: {
		'Content-Type': 'application/json'
		// anything you want to add to the headers
	}
})

export default httpClient
