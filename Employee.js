export default class Employee {
  constructor(employee) {
    this._name = employee.name.toUpperCase();
    this._email = employee.email;
    this._birthday = new Date(employee.birthday);
    this._months = [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic"
    ];
  }

  get name() {
    return this._name;
  }

  get email() {
    return this._email;
  }

  get birthday() {
    return this._birthday;
  }

  _fixNumber(number){
    let result = number.toString();

    
    if(result.length === 1){
      result = "0" + result;
    }
    return result;
  }

  getBirthdayAsUSString(){
    let month = this._fixNumber(this._birthday.getMonth()+1);


    let day = this._fixNumber(this._birthday.getDate());

    day = day.toString();
    if(day.length === 1){
      day = "0" + day;
    }

    let date = this._birthday.getFullYear() + "-" + month + "-" + day;

    console.log(date);
    return date;
  }

  getBirthdayAsString() {
    let date =
      this._birthday.getDate() +
      "/" +
      this._months[this._birthday.getMonth()] +
      "/" +
      this._birthday.getFullYear();

    return date;
  }

  getAge() {
    let oneDay = 24 * 60 * 60 * 1000;
    let oneYear = oneDay * 365;
    let differenceMs = new Date() - this._birthday;
    let age = Math.trunc(differenceMs / oneYear);

    return age;
  }
}
