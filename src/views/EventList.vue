<template>
  <div>
    <h1>Events listing</h1>

    <EventCard v-for="event in events" :key="event.id" :event="event"></EventCard>
    <template v-if="page != 1">
      <router-link :to="{ name: 'event-list', query:{ page: page - 1 } }" rel="prev">Prev page</router-link>.|
    </template>
    <router-link :to="{ name: 'event-list', query:{ page: page + 1 } }" rel="next">Next page</router-link>
  </div>
</template>


<script>
	import EventCard from '@/components/EventCard'

	import { mapState } from 'vuex'

	export default {
		components: {
			EventCard
		},
		created() {
			this.$store.dispatch('fetchEvents', {
				perPage: 4,
				page: this.page
			})
		},
		computed: {
			page() {
				return parseInt(this.$route.query.page) || 1
			},
			...mapState(['events'])
		}
	}
</script>

<style scoped>
</style>