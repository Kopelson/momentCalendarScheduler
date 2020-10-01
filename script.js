//JQuery will run this function on window load
$(document).ready(function() {
    //This function gets current day and formats it and adds it to the p tag in the header
    getCurrentDay();
    //This creates time blocks for the day 9:00am to 5:00pm
    createTimeBlocks();
    //THis changes the style of each time block according to what time it is
    updateTimeBlocks();
    //fill in each time block with local storage data
    renderStoredData();
    //save each hour time block data to local storage
    $("button").on("click", saveData);

})

//Uses moment to grab todays date, format it to be Day("Monday"), Month(October) Nth(12th), and adds it to the id tag of currentDay
function getCurrentDay() {
    let currentDay = moment().format("dddd, MMMM Do");
    $('#currentDay').text(currentDay);
}
//creates new time blocks for the day scheduler 
function createTimeBlocks() {
    let container = $(".container");
    let startOfDay = moment().startOf('day');
    let myTime = startOfDay.add(9, 'h').format("h:mma");
    for(let i = 0; i < 9; i++){
        //Create new variables for each time block
        let row = $("<div>");
        let hourSpan = $("<span>");
        let textSpan = $("<span>");
        let textArea = $("<textarea>");
        let button = $("<button>");
        let icon = $("<i>");
        //set id attributes
        row.attr("value", i);
        row.attr("data-index", "dataObj"+i);
        //set class attributes
        row.attr("class", "row time-block");
        hourSpan.attr("class", "hour col-2");
        button.attr("class", "saveBtn col-2");
        icon.attr("class", "far fa-save");
        textSpan.attr("class", "textSpan col-8")
        textArea.attr("class", "col-12 h-100")
        //add texts to element
        hourSpan.text(myTime);
        //append each element in order of layout
        button.append(icon);
        textSpan.append(textArea);
        row.append(hourSpan);
        row.append(textSpan);
        row.append(button);
        //change time block by 1 hour
        startOfDay = startOfDay.add(1, 'h');
        myTime = startOfDay.format("h:mma");
        container.append(row);
    };
};
//This function updates the time-blocks "textSpan" class to change colors based on time - past, present, future.
function updateTimeBlocks(){
    //this assigns hourBlock all elements with the class "textSpan"
    let hourBlock = $('.textSpan');
    //this assigns two variables a moment of time start of day
    let startOfDay = moment().startOf('day');
    let startOfDay2 = moment().startOf('day');
    //this adds 8 hours to the first moment of time
    let time = startOfDay.add(8, 'h');
    //this adds 9 hours to the first moment of time
    let time2 = startOfDay2.add(9, "h");
    //this jquery each block will check the current time and compare it to the time that is associated with each time block, then assign a new class to the current time block textSpan either past, present, or future.
    hourBlock.each(function(){
        //this assigns adds a hour to the current time of the variable, the second time variable is to calculate the is between method that moment.js provides.
        time = startOfDay.add(1,"h");
        time2 = startOfDay2.add(1,"h");
        //this variable stores a boolean value that checks if the time block is before the current time of day
        let checkTime = moment(time).isBefore();
        //this variable stores a boolean value that checks if the time block is between the hour time blocks
        let currentTime = moment().isBetween(time, time2); 
        //this checks if the time is before the current time and not in between the current block hours
        if(checkTime && !currentTime){
            //jquery addClass adds a new class "past" to the textSpan
            $(this).addClass("past");
            //this checks if the current time is between the block hours
        } else if (currentTime) {
            //jquery addClass adds a new class "present" to the textSpan
            $(this).addClass("present");
            //this runs if the current time is in the future
        } else {
            //jquery addClass adds a new class "future" to the textSpan
            $(this).addClass("future");
        };
    });
};

function renderStoredData(){
    //console.log($(".row").length);
    // console.log($(".row").get(0));
    // console.log($(".row").attr("data-index"));
    // console.log(localStorage.length);
    console.log($(".row").attr("data-index"));
        // for(let i = 0; i < localStorage.length; i++){
        //     let key = localStorage.key(i)
        //     let data = JSON.parse(localStorage.getItem(key))
        //     console.log(key);
        //     console.log(data.textarea);
            // let row = $(".row").attr("data-index");
            // for(let j = 0; j < $(".row").length; j++){
            //     if (row === key){
            //         let getTextarea = $(".row").find("textarea").get(j).value;
            //         getTextarea = data.textarea;
            //     };
            //     return;
            // }
            
            
           // let storedData = JSON.parse(localStorage.getItem("dataObj"+i));
            // if(storedData === null){
            //     return;
            // }
            // let getTextarea = $(".row").find("textarea").get(i).value;
            // getTextarea = storedData.textarea;
        // };
        // for(let j = 0; j < $(".row").length; j++){
        //     let getTextarea = $(".row").find("textarea").get(j).value;
        //     let row = $("data-index");
        //     console.log(getTextarea);
        //     console.log(row);
        // };
}

function saveData(event) {
    event.preventDefault();
    //grabs the selected time-block textarea value;
    textarea = $(this).parent().find("textarea").get(0).value;
    //grabs value of time-block to index the dataObj 
    dataObjNum = $(this).parent().attr("value")
    //stores data as an object
    dataObj = {
        "textarea": textarea
    };
    //returns and stores in local storage an indexed key value and a stringify JSON object
    return localStorage.setItem("dataObj"+dataObjNum, JSON.stringify(dataObj));
};

