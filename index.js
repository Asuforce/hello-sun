new Vue({
  el: '#app',
  data: {
    name: 'hoge',
    place: ''
  },
  methods: {
    sendPlace: function () {
      alert(this.place);
    }
  }
});
