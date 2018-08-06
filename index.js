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
  function codeAddress(address) {
    var geocoder = new google.maps.Geocoder();

    var mapOptions = {
      zoom: 18,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      scrollwheel: false
    };

    map.setZoom(18);

    geocoder.geocode({ 'address': address, 'region': 'jp' }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
        marker.setPosition(results[0].geometry.location);
      } else {
        window.alert("入力された場所が見つかりませんでした。");
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
