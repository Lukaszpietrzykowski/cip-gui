
export function hasPermission(...roles) {
  return roles.includes(this.userRole);
}

export function toggleDropdown(item) {
  if (item) {
    item.isDropdownVisible = !item.isDropdownVisible;
  }
}

export function convertString(s) {
    if (s !== "") return s;
    return "brak danych";
}

export function convertGender(g) {
    if (g === "FEMALE") return "Kobieta";
    return "Mężczyzna";
}
  
export function convertDate(fullDate) {
    if (fullDate !== null) return fullDate.substring(0, 10);
    return "brak danych";
}
