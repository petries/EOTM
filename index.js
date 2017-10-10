
Survey.Survey.cssType = "bootstrap";
Survey.defaultBootstrapCss.navigationButton = "btn btn-green";

Survey.JsonObject.metaData.addProperty("dropdown", {name: "renderAs", default: "standard", choices: ["standard", "imagepicker"]});

window.survey = new Survey.Model({ title: 'Employee of the Month',pages: [{ questions: [
    {
            type: "text",
            isRequired: true,
            name: "Email:"
        },

    { type: "dropdown", isRequired: true, name: "Ellotheans", renderAs: "imagepicker", title: "Please select the employee of the month:",
        choices: [
            {value: "Aphiwe", text: "images/Aphiwe.png"},
            {value: "Awi", text: "images/Awi.png"},
            {value: "Bennie", text: "images/Bennie.png"},
            {value: "Danté", text: "images/Danté.png"},
            {value: "George", text: "images/George.png"},
            {value: "Jayson", text: "images/Jayson.png"},
            {value: "Tyrone", text: "images/Tyrone.png"},
            {value: "Dehan", text: "images/Dehan.png"},
            {value: "WernerP", text: "images/WernerP.png"},
            {value: "Davin", text: "images/Davin.png"},
            {value: "Les", text: "images/Les.png"},
            {value: "Michael", text: "images/Michael.png"},
            {value: "Petrie", text: "images/Petrie.png"},       
            {value: "Alex", text: "images/Alexander.png"},
            {value: "Deon", text: "images/Deon.png"},
            {value: "Hannelie", text: "images/Hannelie.png"},
            {value: "Hesphia", text: "images/Hesphia.png"},
            {value: "Jonathan", text: "images/Jonathan.png"},
            {value: "Sharné", text: "images/Sharné.png"},                        
            {value: "Francois", text: "images/Francois.png"},
            {value: "Rory", text: "images/Rory.png"},
            {value: "Kayla", text: "images/Kayla.png"},
            {value: "Marisha", text: "images/Marisha.png"},
	    {value: "Marisha", text: "images/JohanB.png"},
	    {value: "Marisha", text: "images/JonathanS.png"},
         ]
    },

]}
]});
survey.onComplete.add(function (s) {
            document.getElementById("surveyElement").innerHTML = "<div style='display: inline-block;position: fixed;top: 0;bottom: 0;left: 0;right: 0;width: 500px;height: 100px;margin: auto;'><span style='font-size:40px'>Thank you for voting!</span></div>";
         });

    //survey.onComplete.add(function(result) {
	//document.querySelector('#surveyResult').innerHTML = "result: " + JSON.stringify(result.data);
    //});

var widget = {
    name: "imagepicker",
    isFit : function(question) { return question["renderAs"] === 'imagepicker'; },
    isDefaultRender: true,
    afterRender: function(question, el) {

        var $el = $(el).find("select");

        var options = $el.find('option');
        for (var i=1; i<options.length; i++) {
            $(options[i]).data("imgSrc", options[i].text);
            options[i].selected = question.value == options[i].value;
        }
        $el.imagepicker({
            hide_select : true,
            show_label  : false,
            selected: function(opts) {
                question.value = opts.picker.select[0].value;
            }
        })
    }

        ,
        willUnmount: function(question, el) {
            var $el = $(el).find("select");
            $el.data('picker').destroy();
        }

}

Survey.CustomWidgetCollection.Instance.addCustomWidget(widget);




ReactDOM.render(<Survey.Survey model={survey}/>, document.getElementById("surveyElement"));



window.surveyForceUpdate = function() {
    document.getElementById("surveyElement").innerHTML = "";

    ReactDOM.render(<Survey.Survey model={survey}/>, document.getElementById("surveyElement"));

}




survey.onComplete.add (function (result) {
// Initialize Firebase
    var config = {
        apiKey: "AIzaSyD7p_o5GskxVJi1bd9VVrAnHJMymvXcyfE",
        authDomain: "eotm-f7baa.firebaseapp.com",
        databaseURL: "https://eotm-f7baa.firebaseio.com",
        projectId: "eotm-f7baa",
        storageBucket: "eotm-f7baa.appspot.com",
        messagingSenderId: "323814286365"

    };
    firebase.initializeApp(config);

    const preObject = document.getElementById('object');

    const dbRefObject = firebase.database().ref().child('object');

    dbRefObject.push().set(result.data);

    dbRefObject.on('value', snap => console.log(snap.val()));

});


