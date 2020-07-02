<template>
  <v-form v-model="valid">
    <!-- <v-alert type="success" :value="alert">
      withdraw success
    </v-alert> -->
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="account_number"
            disabled
            label="Acc Number"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12">
          <v-text-field
            v-model="account_type"
            disabled
            label="Acc type"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12">
          <v-text-field
            v-model="balance"
            disabled
            label="Balance"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="amount"
            :rules="inputsRules"
            label="Withdral Amount"
            required
          ></v-text-field>
        </v-col>
        <v-btn class="ma-2" color="success" @click="withdrawcash">
          Get Cash
        </v-btn>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import database from '../components/firebaseInit'
export default {
  name: 'withdraw',
  data () {
    return {
      account_number: null,
      account_type: null,
      balance: null,
      amount: 0
      //   inputsRules: [v => v.length < 4 || 'the value should be greater than 500']
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
    },
    withdrawcash () {
      if (this.account_type === 'Savings') {
        if (this.balance < this.amount) {
          return alert('You cannot withdraw more than your balance')
        } else {
          database
            .collection('account_list')
            .where('account_number', '==', this.$route.params.account_number)
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(doc => {
                doc.ref
                  .update({
                    balance: this.balance - this.amount
                  })
                  .then(() => {
                    alert('Success')
                    this.$router.push({
                      name: 'home',
                      params: { account_number: this.account_number }
                    })
                  })
              })
            })
        }
      } else {
        if (this.amount <= 500) {
          database
            .collection('account_list')
            .where('account_number', '==', this.$route.params.account_number)
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(doc => {
                doc.ref
                  .update({
                    balance: this.balance - this.amount
                  })
                  .then(() => {
                    alert('Success')
                    this.$router.push({
                      name: 'home',
                      params: { account_number: this.account_number }
                    })
                  })
              })
            })
        } else {
          return alert('The maximum amount you can withdraw is ZAR 500')
        }
      }
    }
  }
}
</script>

<style></style>
