// VALIDATION
export function checkPESEL(pesel) {
    if(pesel){
        if(!countNumbers(pesel)) return 'Wprowadź 11 cyfr';
        if(!isNumbers(pesel)) return 'Wszystkie znaki muszą być cyframi';
        if(!checkSumaKontrolna(pesel)) return 'Suma kontrolna jest nieprawidlowa';
    }
    return 'ok';
}

export function checkSumaKontrolna(pesel){
    let wagi = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3, 1];
    let array = new Array();
    let i = 0;
    for (i = 0; i < 11; i++)
        array[i] = parseInt(pesel.substring(i, i + 1));
    let sum = 0;
    for (i = 0; i < 11; i++)
            sum += wagi[i] * array[i];
    if (sum % 10 == 0) return true;
    return false;
}

export function countNumbers(pesel){
    if (pesel.length === 11) return true;
    return false;
}

export function isNumbers(pesel){
    let i = 0;
    let array = new Array();
    for (i = 0; i < 11; i++) {
      array[i] = parseInt(pesel.substring(i, i + 1));
      if (isNaN(array[i])) return false;
    }
    return true;
}

// SET VALUE IN INPUT METHODS
export function setDateBirthAndAge(pesel){
    //USTAWIANIE DATY URODZENIA
    let i = 0;
    let array = new Array();
    for (i = 0; i < 11; i++)
        array[i] = parseInt(pesel.substring(i, i + 1));
    let year = 1900 + array[0] * 10 + array[1];
    if (array[2] >= 2 && array[2] < 8) 
        year += Math.floor(array[2] / 2) * 100;
    if (array[2] >= 8) year -= 100;
        let month = (array[2] % 2) * 10 + array[3];
    if (month < 10) month = "0" + month;
        let day = array[4] * 10 + array[5];
    if (day < 10) day = "0" + day;
        let date = year + "-" + month + "-" + day;
    //USTAWIANIE WIEKU
    let today = new Date();
    const ytoday = today.getFullYear();
    const mtoday = today.getMonth() + 1;
    const dtoday = today.getDate();
    let age = ytoday - year;
    if (mtoday < month || (mtoday == month && dtoday < day)) 
        age--;
    return [date, age];
}

export function setGender(pesel){
    let array = new Array();
    let i = 0;
    for (i = 0; i < 11; i++)
        array[i] = parseInt(pesel.substring(i, i + 1));
    let plec = (array[9] % 2 == 1) ? "M" : "K";
    if (plec == "K") return 'FEMALE';
    return 'MALE';
}

export function setAge(date){
    const birthDate = new Date(date);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear() -
    ((today.getMonth() < birthDate.getMonth() || 
        (today.getMonth() === birthDate.getMonth() && 
        today.getDate() < birthDate.getDate())) ? 1 : 0);
    return age;
}