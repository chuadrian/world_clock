<?php
if (isset($_GET['timezone'])) {
    $timezone = $_GET['timezone'];
    date_default_timezone_set($timezone);
    
    $currentHour = date('H');
    $currentMinute = date('i');
    $currentSecond = date('s');
    
    echo json_encode([
        'hours' => (int)$currentHour,
        'minutes' => (int)$currentMinute,
        'seconds' => (int)$currentSecond
    ]);
}
?>
