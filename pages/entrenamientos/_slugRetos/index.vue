<template>
  <div class="workout-details--main-container">
    <BannerChallengeDetails
      :img="challenge.banner"
      :img-mobile="challenge.mobile_image"
      :show-video="!!challenge.url_video"
      @open-video="openVideo"
    />

    <div class="workout-details--content">
      <div class="workout-details--introduction-container">
        <IntroductionChallengeDetails
          :comments="challenge.comments"
          :days="challenge.days"
          :description="challenge.description"
          :duration="challenge.duration"
          :frequency="challenge.frequency"
          :level="challenge.level"
          :slug="challenge.slug"
          :rating="challenge.rating"
          :title="challenge.title"
          :type="challenge.type"
          :users="challenge.users"
          :coursepaid="userChallenge.course_paid"
          :prices="challenge.prices"
          :subtitle="challenge.subtitle"
          :extid="challenge.ext_id"
          :plans="coursePlans.plansByCourse"
          readonly-rating
          @show-modal="showPaymentModal"
        />
      </div>

      <SummaryChallengeDetails
        :content="challenge.description"
      />

      <div class="workout-details--workout-container">
        <WorkoutByDay
          v-for="w in workout"
          :id="w.id"
          :key="w.code"
          :code="w.code"
          :day="w.day"
          :done="userChallenge.course_paid"
          :img="w.url_icon"
          :title="w.title"
          :route="w.slug || w.title"
          :idcourse="challenge.id"
          :coursepaid="userChallenge.course_paid"
        />
      </div>
    </div>
    <VideoModal
      v-if="challenge.url_video"
      :value="showVideo"
      :url-video="challenge.url_video"
      @close-video-modal="closeVideoModal"
    />
    <transition name="payment-window">
      <div v-show="this.$store.state.showPaymentModal" class="modal-overlay">
        <PaymentCompleted />
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import basicoEnCasaUnits from '@/api/basicoEnCasaData'
import intermedioEnCasaUnits from '@/api/intermedioEnCasaData'
import avanzadoEnGymUnits from '@/api/avanzadoEnGymData'
import { BannerChallengeDetails, IntroductionChallengeDetails, SummaryChallengeDetails, WorkoutByDay } from '~/components/Challenges'
import VideoModal from '~/components/Modal/VideoModal'
import PaymentCompleted from '~/components/Modal/PaymentCompleted'

async function fetch () {
	const { slugRetos } = this.$route.params
	await this.$store.dispatch('challenges/getDetails', slugRetos)
	await this.$store.dispatch('challenges/getDetailsByUser', slugRetos)
	await this.$store.dispatch('challenges/getDetailsWorkout', slugRetos)
	await this.$store.dispatch('challenges/getCoursePlans', slugRetos)
}

/* function setPaymentInfo () {
	this.$route.state.actualChallengeName = this.challenge.title
	this.$route.state.actualChallengePrice = this.challenge.prices
} */

function openVideo () {
	this.showVideo = true
}

function closeVideoModal () {
	this.showVideo = false
}

function showPaymentModal () {
	this.showModal = true
}

function data () {
	return {
		showVideo: false,
		showModal: false
	}
}

export default {
	name: 'PaginaDetalleReto',
	auth: false,
	components: {
		BannerChallengeDetails,
		IntroductionChallengeDetails,
		SummaryChallengeDetails,
		WorkoutByDay,
		VideoModal,
		PaymentCompleted
	},
	data,
	fetch,
	computed: {
		...mapState('challenges', {
			challenge: state => state.details,
			myChallenge: state => state.myDetails,
			workout: state => state.workout,
			coursePlans: state => state.coursePlans,
			showPaymentModal: state => state.showPaymentModal
		}),
		workoutDays () {
			if (this.slugRetos === 'basico-en-casa') {
				return basicoEnCasaUnits
			} else if (this.slugRetos === 'intermedio-en-casa') {
				return intermedioEnCasaUnits
			} else if (this.slugRetos === 'avanzado-en-gym') {
				return avanzadoEnGymUnits
			} else {
				return this.workout
			}
		},
		userChallenge () {
			if (this.$auth.$state.loggedIn) {
				return this.myChallenge
			} else {
				return this.challenge
			}
		}
	},
	methods: {
		openVideo,
		closeVideoModal,
		showPaymentModal
	}
}
</script>

<styles lang="scss" scoped>
.workout-details--main-container {
	.workout-details--content {
		@apply px-3 pb-8;
		@apply mx-auto;
		max-width: 805px;

		.workout-details--introduction-container {
			@apply transform -translate-y-12;
		}
	}

	.workout-details--workout-container {
		@apply mt-12;
		@apply grid gap-4;

		@media screen and (min-width:600px) {
			@apply grid-cols-2 gap-12;
		}
	}
}

.modal-overlay {
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	z-index: 10000000;
	background: rgba(0, 0, 0, 0.4);
}
</styles>
