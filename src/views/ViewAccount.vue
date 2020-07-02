<template>
  <div>
    <v-card class="mx-auto" max-width="344">
      <v-card-text>
        <div>Account Number</div>
        <p class="display-1 text--primary">
          {{ account_number }}
        </p>
        <div>Account Type</div>
        <div class="text--primary">
          <p class="display-1 text--primary">{{ account_type }} Account</p>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn class="ma-2" color="success" @click="withdrawcash">
          Next
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import database from '../components/firebaseInit'
export default {
  name: 'view-account',
  data () {
    return {
      account_number: null,
      account_type: null,
      balance: null
    }
  },
  beforeRouteEnter (to, from, next) {
    database
      .collection('account_list')
      .where('account_number', '==', to.params.account_number)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          next(vm => {
            vm.account_number = doc.data().account_number
            vm.account_type = doc.data().account_type
            vm.balance = doc.data().balance
          })
        })
      })
  },
  watch: {
    $route: 'fetchData'
  },
  methods: {
    withdrawcash () {
      this.$router.push({
        name: 'withdraw',
        params: { account_number: this.account_number }
      })
    },
    fetchData () {
      database
        .collection('account_list')
        .where('account_number', '==', this.$route.params.account_number)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.account_number = doc.data().account_number
            this.account_type = doc.data().account_type
            this.balance = doc.data().balance
          })
        })
    }
  }
}
</script>

<style></style>
