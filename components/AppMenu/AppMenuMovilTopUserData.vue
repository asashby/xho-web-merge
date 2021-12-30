<template>
  <div class="header-user">
    <div v-if="isLoggedIn" class="header-user--avatar">
      <picture>
        <img :src="userPhoto"></img>
      </picture>
      <div>
        <h1>{{ userName }}</h1>
        <NuxtLink to="/perfil">
          Perfil
        </NuxtLink>
      </div>
    </div>

    <NuxtLink
	to="/tienda"
      class="header-user--shopstore"
    >
      Tienda
    </NuxtLink>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	name: 'AppMenuMovilTopUserData',
	computed: {
		...mapGetters('profile', [
			'userPhoto',
			'userName'
		]),
		isLoggedIn () {
			return this.$auth.$state.loggedIn
		}
	}
}
</script>

<styles lang="scss" scoped>
.header-user {
	@apply flex items-center justify-between;
	@apply p-4;
	@apply bg-black-base;

	&--avatar {
		@apply flex items-center;
		@apply font-light;

		img {
			@apply w-10 h-10;
			@apply rounded-full;
			@apply mr-4;
		}

		h1 {
			@apply text-gray-light;
		}

		a {
			color: #95d100;
		}
	}

	&--shopstore {
		color: #95d100;
		border: 1px solid #95d100;
		@apply px-2 py-1;
	}
}
</styles>
