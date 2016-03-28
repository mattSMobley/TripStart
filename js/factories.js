angular.module("app")
  .factory("search", function(){
    var formData = '';


    return {
      getData: function(){
        return formData;
      },
      setData: function(newData){
        formData = newData;
      }
    };
  });
