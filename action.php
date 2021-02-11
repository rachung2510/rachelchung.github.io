<?php
    if(isset($_POST['submit'])) {
        $name = $_POST['name'];
        $contact = $_POST['contact'];
        $msg = $_POST['msg'];

        $to = 'rage8169@gmail.com';
        $subject = 'Form Submission';
        $message = "Name: ".$name."\n"."Contact: ".$contact."\n"."Message: ".$msg;

        if (empty($name) || empty($contact) || empty($msg)) {
            echo "Please do not leave any fields empty.";
        } else {
            if (mail($to, $subject, $message)) {
                echo "Thank you for contacting me. I will get back to you shortly.";
            } else {
                echo "Unsuccessful. Please try again.";
            }
        }
    }
?>