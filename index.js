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

var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 35.709, lng: 139.731 },
    zoom: 7
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

        var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
        });
      } else {
        window.alert("入力された場所が見つかりませんでした。");
      }
    });
  }

  return {
    getAddress: function () {
      var button = document.getElementById("button");

      button.onclick = function () {
        var address = document.getElementById("address").value;

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
