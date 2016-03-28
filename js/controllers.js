angular.module("app")
  .controller('MainController', ['search', MainController])
  .controller('ResultController', ['search','$http', ResultController])
  .controller('UserController', ['userSaves','search','$http', UserController]);

    function MainController(search) {
    var main = this;
    main.search = search;
    main.setData = function(){
      main.search.setData();
      window.location = '#/result';
      console.log(main.search.formData);
    }
  }



    function ResultController(search, $http) {
    var result = this;
    result.search = search;

    //parsing
    var splitting = result.search.formData.split(',');
    result.city = splitting[0];
    result.country = splitting[1].replace(',', '').replace(' ','');
    console.log(result.city);
    console.log(result.country);
    //end parsing




    //SKYSCANNER
   skyscanner.load("snippets","2");
   function one(){
       var snippet = new skyscanner.snippets.SearchPanelControl();
       snippet.setShape("box300x250");
       snippet.setCulture("en-GB");
       snippet.setCurrency("USD");
       snippet.setMarket("US");
       snippet.setDeparture("DEN", false);
       snippet.setColourScheme("classicbluelight");
       snippet.setProduct("flights","1");

       snippet.draw(document.getElementById("snippet_searchpanel"));
   }
   skyscanner.setOnLoadCallback(one);

   skyscanner.load("snippets","2");
   function main(){
       var snippet = new skyscanner.snippets.SearchPanelControl();
       snippet.setShape("box300x250");
       snippet.setCulture("en-GB");
       snippet.setCurrency("USD");
       snippet.setMarket("US");
       snippet.setDeparture("DEN", false);
       snippet.setColourScheme("classicbluelight");
       snippet.setProduct("hotels","1");

       snippet.draw(document.getElementById("snippet_searchpanel2"));
   }
   skyscanner.setOnLoadCallback(main);





    //END SKYSCANNER

    //BEGIN PANORAMIO
    var myRequest = {
      'tag': result.search.city
      };

    var myOptions = {
      'width': 650,
      'height': 400,
      'columns': 3,
      'rows': 2,
      'croppedPhotos': panoramio.Cropping.TO_FILL
    }

    var photoset = new panoramio.PhotoWidget('photoset', myRequest, myOptions);
    photoset.setPosition(0);
    //END PANORAMIO

  }

  //END RESULTCONTROLLER


  //BEGIN USERCONTROLLER
  function UserController(userSaves, search) {
    var user = this;

    user.saves = [];
    user.city = '';
    user.country = '';

    var getSaves = userSaves.getSaves()
      .then(function(data) {
        user.saves = data;

      })

  }

  //END USERCONTROLLER
