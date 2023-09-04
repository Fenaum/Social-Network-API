// Function to add leading zero to nubmers less than 0
const addZero = (num) => (num < 10 ? `0${num}` : num);

// Function to create date format
const dateFormat = (date) => {
    let formattedDate = "";

    formattedDate += date.getMonth() + 1;
    formattedDate += "/";
    formattedDate += date.getDate();
    formattedDate += "/";
    formattedDate += date.getFullYear();
    formattedDate += " ";
    formattedDate += addZero(date.getHours());
    formattedDate += ":";
    formattedDate += addZero(date.getMinutes());

    return formattedDate;
};

module.exports = dateFormat;
