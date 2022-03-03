function formatDate (value) 
{
    var time = null;
    var date = new Date(value);
    var formattedDate = {};

    if (isValidDate) {
        var year = date.getFullYear();
        var month = twoDigitsDate(date.getMonth());
        var day = twoDigitsDate(date.getDate());
        var hour = twoDigitsDate(date.getHours());
        var min = twoDigitsDate(date.getMinutes());
        var sec = twoDigitsDate(date.getSeconds());

        if (month >= 13) {
            month = 12;
        }
        if (['01','03','05','07','08','10','12'].includes(month) && day > 31) {
            day = 31;
        }
        if (['02'].includes(month) && day > 28) {
            day = 28;
        }
        if (['04','06','09','11'].includes(month) && day > 30) {
            day = 30;
        }
        if (hour >= 24) {
            hour = 23;
        }
        if (min >= 60) {
            min = 59;
        }
        if (sec >= 60) {
            sec = 59;
        }

        var time = year + '-' + month + '-' + day + 'T' + hour + ':' + min + ':' + sec + 'Z';
        // var time = "ISODate(\"" + year + '-' + month + '-' + day + 'T' + hour + ':' + min + ':' + sec + '.000+00:00\")';
        // var time = "{$date:\"" + year + '-' + month + '-' + day + 'T' + hour + ':' + min + ':' + sec + 'Z\"}';

        formattedDate = {
            "$date": time
        }

        // formattedDate = new Date(time);
    }
    
    return formattedDate;
}


function twoDigitsDate (value)
{
    return ("0" + (value + 1)).slice(-2);
}

function isValidDate (date) 
{
    return date instanceof Date && !isNaN(date);
}


function getYear (date)
{
    var datetime = new Date(date);

    return datetime.getFullYear() ?? null;
}


function cleanArray (array)
{
    var result = array.filter(function () {
        return true;
    });

    return result;
}

module.exports = { formatDate, getYear, cleanArray };