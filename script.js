$(document).ready(function() {
  // Hide the preloader initially
  $('#preloader').css('display', 'none');
  $('#country_form').submit(function(event) {
    event.preventDefault();

    var countryName = $('#countryNameInput').val();

    function emptyResults() { // Reset results and input
      $('#no_results_msg').css('display', 'block');
      $('#results_displayer').css('display', 'none');
      $('#emptyContainer').css('display', 'none');
      $('#countryNameInput').val('');
    }

    $('#preloader').css('display', 'block'); // display loader

    $.ajax({
      url: 'data.php',
      method: 'POST',
      data: { countryName: countryName },
      dataType: 'JSON',
      success: function(response) {
        $('#preloader').css('display', 'none'); // hide loader when data received

        if (response.success) {
          const data = response.data[0];

          var languages = data.languages; // hanlde language change
          var languagesList = Object.values(languages).join(', ');

          var currencies = data.currencies; // hanlde currency change
          var currenciesList = Object.values(currencies).map(function(currency) {
            return currency.symbol + ' ' + currency.name;
          }).join(', ');

          // Hide default message, display data with reset button
          $('#no_results_msg').css('display', 'none');
          $('#results_displayer').css('display', 'block');
          $('#emptyContainer').css('display', 'block');

          $('#results_displayer').addClass('animate__animated animate__fadeIn');
          
          // data display
          $('#resultName').text(data.name.official);
          $('#resultFlag').attr('src', data.flags.png);
          $('#resultCapital').text(data.capital);
          $('#resultRegion').text(data.region);
          $('#resultPopulation').text(data.population);
          $('#resultLanguage').text(languagesList);
          $('#resultCurrency').text(currenciesList);
        } else {
          alert(response.message);
          emptyResults();
        }

        $('#emptyResult_btn').click(function() {
          emptyResults();
        })
      },
      error: function() {
        $('#preloader').css('display', 'none'); // hide loader if error
        alert('Failed fetching data');
      }
    })
  });
});