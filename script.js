
// Get current time
let now = moment();

// calling/executing the below defined functions
startScheduler(".time-block", ".planner");
setDivColor(now, ".time-block");
$("#currentDay").text(moment().format("dddd, MMMM Do YYYY"));

// *** LOGIC TO LOAD PLANNER FROM STORAGE ***
function startScheduler(parentDivClass, textAreaClass) {

    //loop over every element with the class of .time-block
    $(parentDivClass).each(function () {
        //get the id attribute of the current element
        let id = $(this).attr("id");
        //get local storage key matching html div id
        let key = localStorage.getItem(id);
        //check to see if local storage key is null
        if (key !== null) {
            //if local storage key is not null
            // get child element with a class of planner 
            //and write local storage value to that element
            $(this).children(textAreaClass).val(key);
        }
    });
}

// *** LOGIC TO SAVE INPUT TO TEXTAREAS ***

// Get the element with the class of 'saveBtn'
let classSaveBtn = $(".saveBtn");

// Add an event handler on click of saveBtn elements
classSaveBtn.on("click", function () {
    // Get the button parent element's id
    let key = $(this).parent().attr("id");
    // Get the current value of the sibling textarea
    let textAreaValue = $(this).siblings(".planner").val();
    // Store the value from the textarea in localStorage, using the id of the parent div
    localStorage.setItem(key, textAreaValue);
});

// *** LOGIC TO STYLE ELEMENTS BASED ON TIME ***

function setDivColor(currentTime, parentDivClass) {
    // Get current hours
    let hourlyTime = currentTime.hours();
    //checking to make sure I was getting correct output for hour
    console.log(hourlyTime) 
    // Loop over every element with a class of 'time-block'
    $(parentDivClass).each(function () {
        // Get the current element id and parse it into an integer
        let integerHour = parseInt($(this).attr("id"));

        // Initialize as past by default
        $(this).addClass("past");
        // Compare the hour from the html div from above against current hour
        if (integerHour > hourlyTime) {
            // If html div's hour is greater than current hour 
            $(this).addClass("future");
        }
        // If html div's hour equals the current hour
        else if (integerHour === hourlyTime) {
            $(this).addClass("present");
        }
    })
}
