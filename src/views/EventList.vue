<template>
  <div>
    <h1>Events listing</h1>

    <EventCard v-for="event in events" :key="event.id" :event="event"></EventCard>
  </div>
</template>


<script>
	import EventCard from '@/components/EventCard'

	import EventService from '@/services/EventServices'

	export default {
		components: {
			EventCard
		},
		data() {
			return {
				events: []
			}
		},
		created() {
			EventService.getEvents()
				.then(response => {
					this.events = response.data
				})
				.catch(error => console.log('Houve um erro:' + error.response))
		}
	}
</script>

<style scoped>
</style>