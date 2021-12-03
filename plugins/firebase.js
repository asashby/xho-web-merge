import firebase from 'firebase'

const firebaseConfig = {
	apiKey: 'AIzaSyCvwZruvx0m_W_RemkjXcPh5udvyuu9eoo',
	authDomain: 'ximenahoyosapp.firebaseapp.com',
	projectId: 'ximenahoyosapp',
	storageBucket: 'ximenahoyosapp.appspot.com',
	messagingSenderId: '176182706852',
	appId: '1:176182706852:web:283b0a8eab4f00badadc31',
	measurementId: 'G-PE96S0XSYE'
}

let app = null
if (!firebase.getApps.length) {
	app = firebase.initializeApp(firebaseConfig)
}

export const db = app.database()
