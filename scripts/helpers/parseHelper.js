function formatDate (value) 
{
    var time = null;
    var date = new Date(value);

    if (isValidDate) {
        var year = date.getFullYear();
        var month = twoDigitsDate(date.getMonth());
        var day = twoDigitsDate(date.getDate());
        var hour = twoDigitsDate(date.getHours());
        var min = twoDigitsDate(date.getMinutes());
        var sec = twoDigitsDate(date.getSeconds());

        if (hour >= 24) {
            hour = 23;
        }

        var time = year + '-' + month + '-' + day + 'T' + hour + ':' + min + ':' + sec + '.000+00:00';
    }
    
    return time;
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