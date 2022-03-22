import { isEmpty, setNewProperty } from 'functionallibrary'
import httpClient from '~/plugins/axios'

export const state = () => ({
	challenges: [],
	challengesDataPage: {},
	coursePlans: {},
	details: {},
	myDetails: {},
	myChallenges: [],
	myChallengesParams: {
		limit: 8,
		page: 1,
		search: null
	},
	params: {
		limit: 8,
		page: 1,
		search: null
	},
	sets: [],
	routine: {
		excercises: [],
		details: {}
	},
	workout: [],
	showWorkoutModal: false,
	showRecipes: false,
	currentChallengeId: 0
})

export const actions = {
	async getMyChallenges ({ commit, state }) {
		try {
			const { myChallengesParams: params } = state
			const { data: myChallenges } = await this.$axios.get('courses-by-user', { params })
			console.log(myChallenges)
			commit('SET_MY_CHALLENGES', myChallenges)
		} catch (err) {
			console.log('error al cargar retos', err)
		}
	},
	async getChallenges ({ commit, state }, flagReset) {
		try {
			const { params } = state
			const { data: challenges } = await this.$axios.get('courses', { params })
			const finalList = flagReset ? challenges.data : state.challenges.concat(challenges.data)
			commit('SET_CHALLENGES', finalList)
		} catch (err) {
			console.log('error al cargar retos', err)
			console.log('error para deploy: ', err)
		}
	},
	async getDataPage ({ commit, state }) {
		if (isEmpty(state.challengesDataPage)) {
			const [responsePageData] = await Promise.all([
				this.$axios.get('sections/courses')
			])
			commit('SET_CHALLENGES_DATA_PAGE', responsePageData.data)
		}
	},
	async getDetails ({ commit }, id) {
		try {
			const { data: response } = await this.$axios.get(`/courses/${id}/detail`)
			commit('SET_CHALLENGES_DETAILS', response)
		} catch (err) {
			console.log('error al cargar detalle de reto', err)
		}
	},
	async getDetailsByUser ({ commit }, slug) {
		try {
			const { params } = state
			const { data: response } = await this.$axios.get(`/courses/${slug}/detail-user`, { params })
			commit('SET_CHALLENGES_DETAILS_BY_USER', response)
		} catch (err) {
			console.log('error al cargar detalle de reto', err)
		}
	},
	async getChallengesCoursePaid ({ commit }) {
		try {
			const { params } = state
			const { data: response1 } = await this.$axios.get('/courses/basico-en-casa/detail-user', { params })
			const { data: response2 } = await this.$axios.get('/courses/intermedio-en-casa/detail-user', { params })
			const { data: response3 } = await this.$axios.get('/courses/avanzado-en-gym/detail-user', { params })

			if (response1.course_paid === 1 && response2.course_paid === 1 && response3.course_paid === 1) {
				commit('SET_SHOW_RECIPES', true)
			}

			console.log(response1)
			console.log(response2)
			console.log(response3)
		} catch (err) {
			console.log('error al cargar detalle de reto', err)
		}
	},
	changePageMyChallenges ({ commit, state, dispatch }) {
		const { page } = state.myChallengesParams
		commit('SET_MY_CHALLENGES_NEW_PAGE', page + 1)
	},
	changePage ({ commit, state, dispatch }) {
		const { page } = state.params
		commit('SET_NEW_PAGE', page + 1)
	},
	async setSearch ({ commit, dispatch }, value) {
		commit('SET_NEW_PAGE', 1)
		commit('SET_SEARCH_VALUE', value)
		await dispatch('getChallenges', true)
	},
	async updateSet ({ dispatch, commit, state }, { setState, unitId, questionId, index }) {
		try {
			const body = {
				unit_id: unitId,
				question_id: questionId,
				set_number: (index + 1)
			}
			const localSet = [...state.sets.series]
			const [updateSet] = localSet.splice(index, 1)
			const { data: response } = await this.$axios.post('/questions/final', body)
			if (response.code === 'SET_FINISH_SUCCESS') {
				console.log('SET_FINISH_SUCCESS')
				localSet.splice(
					index,
					0,
					setNewProperty('flag_complete', setState, updateSet)
				)
				commit('UPDATE_SETS', localSet)
			} else if (response.code === 'EXCERCISE_FINISH_SUCCESS') {
				console.log('EXCERCISE_FINISH_SUCCESS')
				localSet.splice(
					index,
					0,
					setNewProperty('flag_complete', setState, updateSet)
				)
				commit('UPDATE_SETS', localSet)
				commit('UPDATE_EXCERCISES', questionId)
				dispatch('updateExercise', questionId)
			}
		} catch (err) {
			console.log('error al cargar detalle de reto', err)
		}
	},
	async suscribeUserToChallenge ({ commit }, id) {
		try {
			const body = {
				orderId: 1234,
				link: 'http://127.0.0.1:8000/courses/basico-en-casa/payment',
				plan_id: id
			}
			// const { requestParams } = state

			const token = this.$auth.strategies.local.token.get()
			console.log(token)
			const response = await httpClient({
				url: '/courses/payment',
				method: 'patch',
				headers: {
					Authorization: token
				},
				data: body
			})
			// const { data: response } = await this.$axios.patch(`/courses/${slug}/payment`, { params, data: body })
			console.log('funciona la suscripcion')
			console.log(response)
		} catch (err) {
			console.log('fallo por el patch', err)
		}
	},
	async getCoursePlans ({ commit }, slug) {
		try {
			const { data: response } = await this.$axios.get(`/course/${slug}/plans-list`)
			commit('SET_CHALLENGE_PLANS', response)
		} catch (err) {
			console.log('error al cargar planes del reto', err)
		}
	},
	async getDetailsWorkout ({ commit }, slug) {
		try {
			const { data: response } = await this.$axios.get(`/courses/${slug}/units`)
			const sortResponse = response.sort((a, b) => a.day - b.day)

			commit('SET_CHALLENGES_WORKOUT', sortResponse)
		} catch (err) {
			console.log('error al cargar detalle de reto', err)
		}
	},
	async getDetailRoutine ({ commit }, { slugRutina, idDetail }) {
		try {
			const body = {
				course_id: Number(idDetail)
			}
			const { data: response } = await this.$axios.get(`/units/${slugRutina}/detail`, { params: body })
			commit('SET_ROUTINE_DETAIL', response)
		} catch (err) {
			console.log('error al cargar detalle de reto', err)
		}
	},
	async getRoutineExcercises ({ commit }, id) {
		try {
			const { data: response } = await this.$axios.get(`/units/${id}/questions`)
			commit('SET_ROUTINE_EXCERCISES', response)
		} catch (err) {
			console.log('error al cargar detalle de reto', err)
		}
	},
	async getDetailExcercises ({ commit }, { id, slugExercises }) {
		try {
			/* 		const body = {
				unit_id: Number(id)
			} */
			const { data: response } = await this.$axios.get(`/questions/${slugExercises}/detail`)
			commit('SET_EXCERCISES_DETAIL', response)
		} catch (err) {
			console.log('error al cargar detalle de reto', err)
		}
	},
	updateExercise ({ state, commit }) {
		const newExcercise = state.routine.excercises.findIndex(exercise => exercise.flag_completed === 0)
		if (newExcercise !== '') {
			const slugExercises = state.routine.excercises[newExcercise].slug
			const { slugRetos, slugRutina } = this.$router.history.current.params
			this.$router.push(`/entrenamientos/${slugRetos}/rutinas/${slugRutina}/${slugExercises}`)
		} else {
			commit('SET_FINISH_MODAL', true)
		}
	},
	updateFinishModal ({ commit }, status) {
		commit('SET_FINISH_MODAL', status)
	}
}

export const mutations = {
	SET_MY_CHALLENGES (state, challenges) {
		state.myChallenges = [...challenges]
	},
	SET_CHALLENGES (state, challenges) {
		state.challenges = [...challenges]
	},
	UPDATE_SETS (state, updatedSets) {
		state.sets.series = [].concat(updatedSets)
	},
	SET_CHALLENGES_DATA_PAGE (state, data) {
		state.challengesDataPage = { ...data }
	},
	SET_MY_CHALLENGES_NEW_PAGE (state, page) {
		state.myChallengesParams.page = page
	},
	SET_NEW_PAGE (state, page) {
		state.params.page = page
	},
	SET_SEARCH_VALUE (state, searchValue) {
		state.params.search = searchValue
	},
	SET_CHALLENGES_DETAILS (state, challengesDetails) {
		state.details = challengesDetails
		state.currentChallengeId = challengesDetails.id
		console.log(state.currentChallengeId)
	},
	SET_CHALLENGES_DETAILS_BY_USER (state, details) {
		state.myDetails = details
	},
	SET_CHALLENGES_WORKOUT (state, items) {
		state.workout = items
	},
	SET_CHALLENGE_PLANS (state, items) {
		state.coursePlans = items
	},
	SET_ROUTINE_DETAIL (state, details) {
		state.routine.details = details
	},
	SET_ROUTINE_EXCERCISES (state, excercises) {
		state.routine.excercises = excercises
	},
	SET_EXCERCISES_DETAIL (state, details) {
		state.sets = details
	},
	SET_FINISH_MODAL (state, status) {
		state.showWorkoutModal = status
	},
	SET_SHOW_RECIPES (state, status) {
		state.showRecipes = status
	},
	UPDATE_EXCERCISES (state, id) {
		const updateState = state.routine.excercises.findIndex(exercise => exercise.id === id)
		state.routine.excercises[updateState].flag_completed = 1
	}
}

export const getters = {
	getAllSeries (state) {
		return state.sets.series
	},
	getDay: state => (id) => {
		const workoutItem = state.workout.filter(item => item.id === Number(id))
		if (workoutItem) {
			return workoutItem[0].day
		}
	},
	getDays (state) {
		return state.details.days
	},
	getUsers (state) {
		return state.details.users
	},
	getTime (state) {
		return state.routine.details.duration
	}
}
