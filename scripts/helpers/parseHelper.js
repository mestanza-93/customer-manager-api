function convertTimestamp (timestamp) 
{
    var a = new Date(timestamp * 1000);

    console.log(a);

    var year = a.getFullYear();
    var month = ("0" + (a.getMonth() + 1)).slice(-2);
    var day = a.getDate();
    var hour = ("0" + (a.getHours() + 1)).slice(-2);
    var min = ("0" + (a.getMinutes() + 1)).slice(-2);
    var sec =("0" + (a.getSeconds() + 1)).slice(-2);
    var mili = a.getMilliseconds();
    var time = year + '-' + month + '-' + day + 'T' + hour + ':' + min + ':' + sec + '.' + mili + '+00:00';

    return time;
}


module.exports = { convertTimestamp };