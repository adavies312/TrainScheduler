$(document).ready(function () {


    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyB4vE00hJKCGeaBASgSUDRvqUPY-VXv5XA",
        authDomain: "train-scheduler-a5c79.firebaseapp.com",
        databaseURL: "https://train-scheduler-a5c79.firebaseio.com",
        projectId: "train-scheduler-a5c79",
        storageBucket: "train-scheduler-a5c79.appspot.com",
        messagingSenderId: "838830311500"
    };

    firebase.initializeApp(config);

    var database = firebase.database();

   database.ref().on("value", function (snapshot) {
        var data = snapshot.val();

        $("#submit").on("click", function () {
            var trainName = $("#train-name").val().trim();
            var destination = $("#destination").val().trim();
            var firstTrainTime = $("#first-train-time").val().trim();
            var frequency = $("#frequency").val().trim();
            console.log(trainName);
            console.log(destination);
            console.log(firstTrainTime);
            console.log(frequency);

            database.ref().push({
                trainName: trainName,
                destination: destination,
                firstTrainTime: firstTrainTime,
                frequency: frequency

            });
            //clears the form 
            $("#train-name").val("");
            $("#destination").val("");
            $("#first-train-time").val("");
            $("#frequency").val("");

        })
        database.ref().off();
        database.ref().on("child_added", function (childSnapshot) {
            var userTrain = childSnapshot.val().trainName;
            var userDestination = childSnapshot.val().destination;
            var userFirstTrain = childSnapshot.val().firstTrainTime;
            var userFrequency = childSnapshot.val().frequency;

            var nextArrival = userFirstTrain

            var arrivalTime = moment(nextArrival, 'HH:mm').format('hh:mm a');

            //display on page

            $("#trains").append("<tr><td>" + userTrain + "</td><td>" + userDestination + "</td><td>" + userFrequency + "</td><td>" + arrivalTime + "</td></tr>");


        });


    });

}); 