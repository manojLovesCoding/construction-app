<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Contact Email</title>
</head>
<body>
    <h2>You have received an enquiry</h2>
    <p><strong>Name:</strong> {{ $mailData['name'] }}</p>
    <p><strong>Email:</strong> {{ $mailData['email'] }}</p>
    <p><strong>Phone:</strong> {{ $mailData['phone'] }}</p>
    <p><strong>Subject:</strong> {{ $mailData['subject'] }}</p>
    <p><strong>Message:</strong></p>
    <p>{{ $mailData['message'] }}</p>

    <p>Best regards,<br>
    UrbanEdge Construction Company</p>   

</body>
</html>