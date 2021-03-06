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

            //Push values to Firebase 
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

        //Firebase Listener 
        database.ref().on("child_added", function (childSnapshot) {
            var userTrain = childSnapshot.val().trainName;
            var userDestination = childSnapshot.val().destination;
            var userFirstTrain = childSnapshot.val().firstTrainTime;
            var userFrequency = childSnapshot.val().frequency;

            //First Train Time - push back one year
            var arrivalTime = moment(userFirstTrain, 'HH:mm').subtract(1, "years");
            console.log(moment(arrivalTime).format("hh:mm"));

            //Difference between the times
            var diffTime = moment().diff(moment(arrivalTime), "minutes");
            console.log(diffTime);

            //Time Apart (remainder)
            var tRemainder = diffTime % userFrequency;
            console.log(tRemainder);

            //Minutes until train
            var tMinutesTilTrain = userFrequency - tRemainder;
            console.log(tMinutesTilTrain);

            //Next Train
            var nextTrain = moment().add(tMinutesTilTrain, "minutes");
            console.log(moment(nextTrain).format("hh:mm"));

            //Format Time to AM PM
            var userFirstTrain = moment(nextTrain).format("hh:mm a");

            //display on page
            $("#trains").append("<tr><td>" + userTrain + "</td><td>" + userDestination + "</td><td>" + userFrequency + "</td><td>" + userFirstTrain + "</td><td>" + tMinutesTilTrain + "</td></tr>");


        });


    });

}); 