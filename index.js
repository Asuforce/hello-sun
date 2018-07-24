var name = "hoge";

new Vue({
  el: '#app',
  data: {
    name: name,
    place: ''
  },
  methods: {
    sendPlace: function () {
      alert(this.place);
    }
  }
});

window.onload = function (e) {
  liff.init(function (data) {
    initializeApp(data);
  });
};

function initializeApp(data) {
  liff.getProfile().then(function (profile) {
    name = profile.displayName;

    var profilePirctureDiv = document.getElementById('profilepicturediv');
    if (profilePirctureDiv.firstElementChild) {
      profilePirctureDiv.removeChild(profilePirctureDiv.firstElementChild);
    }
    var img = document.createElement('img');
    img.src = profile.pictureUrl;
    img.alt = "Profile Picture";
    profilePirctureDiv.appendChild(img);
  }).catch(function (error) {
    window.alert("Error getting profile: " + error);
  })
}
