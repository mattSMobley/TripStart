angular.module("app")
  .factory("search", function(){
    var formData = {
      city: '',
      country:'',
      currency: '',
      latitude: '',
      longitude: '',
      countrypopulation: '',
      timezone: '',
      region: ''
    };


    return {
      getData: function(){
        return formData;
      },
      setData: function(gbcity, gbcountry, gbcurrency, gblatitude, gblongitude, gbcountrypopulation, gbtimezone, gbregion){
        formData = {
          city: gbcity,
          country: gbcountry,
          currency: gbcurrency,
          latitude: gblatitude,
          longitude: gblongitude,
          countrypopulation: gbcountrypopulation,
          timezone: gbtimezone,
          region: gbregion
        };
      }
    };
  });
