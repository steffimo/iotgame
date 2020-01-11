<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      Here are informations about your current session and the overall placements.
    </p>
    <div class='output-info'>
      <table>
        <tr>
          <th>Placement</th>
          <th>Name</th>
          <th>Energy</th>
          <th>Date</th>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
table, th, td {
  border: 1px solid black;
}
</style>
