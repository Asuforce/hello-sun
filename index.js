window.onload = function (e) {
  liff.init(function (data) {
    initializeApp(data);
  });
};

function initializeApp(data) {
  liff.getProfile().then(function (profile) {
    document.getElementById('name').textContent = profile.displayName;

    var picture = document.getElementById('picture');
    if (picture.firstElementChild) {
      picture.removeChild(picture.firstElementChild);
    }
    var img = document.createElement('img');
    img.src = profile.pictureUrl;
    img.alt = "Profile Picture";
    img.classList.add("icon");
    picture.appendChild(img);
  }).catch(function (error) {
    window.alert("Error getting profile: " + error);
  })
}
