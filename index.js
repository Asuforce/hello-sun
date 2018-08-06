window.onload = function (e) {
  liff.init(function (data) {
    initializeApp(data);
  });
};

var map;
var marker;
var address;
function initMap() {
  var position = {
    lat: 35.709, lng: 139.731
  };

  map = new google.maps.Map(document.getElementById('map'), {
    center: position,
    zoom: 7
  });

  marker = new google.maps.Marker({
    map: map,
    position: position
  });
}

var getMap = (function () {
  function codeAddress(code) {
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({ 'address': code, 'region': 'jp' }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        map.setZoom(18);
        map.setCenter(results[0].geometry.location);
        marker.setPosition(results[0].geometry.location);
      } else {
        adress = "";
        window.alert(status);
      }
    });
  }

  return {
    getAddress: function () {
      var button = document.getElementById("button");

      button.onclick = function () {
        address = document.getElementById("address").value;

        if (address) {
          codeAddress(address);
        } else {
          window.alert("場所を入力してください。");
        }
      }
    }
  };
})();

getMap.getAddress();

function initializeApp(data) {
  var name;

  liff.getProfile().then(function (profile) {
    name = profile.displayName;
    document.getElementById('name').textContent = name;

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

  document.getElementById('share').addEventListener('click', function () {
    liff.sendMessages([{
      type: "location",
      title: "Hello, " + name + " san",
      address: address,
      latitude: marker.getPosition().lat(),
      longitude: marker.getPosition().lng()
    }]).then(function () {
      window.alert("Message sent");
    }).catch(function (error) {
      window.alert("Error sending message: " + error);
    });
  });
}
