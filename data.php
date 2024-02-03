<?php

header('Content-Type: application/json; charset=utf-8');
$response = array();

if (isset($_POST['countryName'])) { // if country name exists, excute the following code
  $countryName = $_POST['countryName'];
  $URL = 'https://restcountries.com/v3.1/name/' . $countryName; // restcountries API url

  // initianlize curl
  $ch = curl_init();

  // set curl options
  curl_setopt($ch, CURLOPT_URL, $URL);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

  // excute curl and close
  $result = curl_exec($ch);
  curl_close($ch);

  // decode result for json
  $decode_result = json_decode($result, true);

  if ($decode_result) { // if decoded, response success, return data, display data as json
    $response['success'] = true;
    $response['message'] = 'Country information retrieved successfully';
    $response['data'] = $decode_result;
    echo json_encode($response);

  } else {
    $response['success'] = false;
    $response['message'] = 'Failed to decode JSON';

    echo json_encode($response);
  }

} else {
  $response['success'] = false;
  $response['message'] = 'Country information cannot be retrieved at the moment';

  echo json_encode($response);
}
?>
