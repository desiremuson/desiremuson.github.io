<template>
  <v-data-table
    :headers="headers"
    :items="account_list"
    sort-by="account_number"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title class="title_h">Account List</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-btn color="success" @click="withdrawcash(item)">Withdraw</v-btn>
    </template>
    <template slot="body.append">
      <tr class="pink--text">
        <th class="title">Totals</th>
        <th class="title">{{ }}</th>
        <th class="title"> ZAR {{ sumField("balance") }}</th>

      </tr>
    </template>
  </v-data-table>
</template>
<script>
import database from '../components/firebaseInit'
export default {
  data () {
    return {
      account_list: [],
      headers: [
        {
          text: 'Account Number',
          align: 'start',
          sortable: true,
          value: 'account_number'
        },
        { text: 'Account Type', value: 'account_type' },
        { text: 'Balance', value: 'balance' },
        { text: '', value: 'actions', sortable: false }
      ]
    }
  },

  computed: {},

  watch: {},

  created () {
    database
      .collection('account_list')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(doc.data)
          const data = {
            account_number: doc.data().account_number,
            account_type: doc.data().account_type,
            balance: doc.data().balance
          }
          this.account_list.push(data)
        })
      })
  },

  methods: {
    withdrawcash (acc) {
      this.$router.push({
        name: 'viewAccount',
        params: { account_number: acc.account_number }
      })
    },
    sumField (key) {
      // sum data in give key (property)
      return this.account_list.reduce((a, b) => a + (b[key] || 0), 0)
    }
  }
}
</script>
<style scoped>
.title_h {
  color: #dc0733;
}
</style>
