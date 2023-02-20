export function compareByAgeAsc(a, b) {
  if (a.age < b.age) {
    return -1;
  }
  if (a.age > b.age) {
    return 1;
  }
  return 0;
}

export function compareByAgeDesc(a, b) {
  if (a.age < b.age) {
    return 1;
  }
  if (a.age > b.age) {
    return -1;
  }
  return 0;
}

export function compareByDimAsc(a, b) {
  if (a.sizeAllowed < b.sizeAllowed) {
    return -1;
  }
  if (a.sizeAllowed > b.sizeAllowed) {
    return 1;
  }
  return 0;
}

export function compareByDimDesc(a, b) {
  if (a.sizeAllowed < b.sizeAllowed) {
    return 1;
  }
  if (a.sizeAllowed > b.sizeAllowed) {
    return -1;
  }
  return 0;
}

export function compareByDimAscAnimal(a, b) {
  if (a.size < b.size) {
    return -1;
  }
  if (a.size > b.size) {
    return 1;
  }
  return 0;
}

export function compareByDimDescAnimal(a, b) {
  if (a.size < b.size) {
    return 1;
  }
  if (a.size > b.size) {
    return -1;
  }
  return 0;
}

export function getAnimalImage(type) {
  switch (type.toLowerCase()) {
    case "cane":
    case "dog":
      return "https://cdn-icons-png.flaticon.com/512/194/194279.png";
    case "gatto":
    case "cat":
      return "https://icons.iconarchive.com/icons/iconsmind/outline/512/Cat-icon.png";
    case "criceto":
    case "hamster":
      return "https://cdn-icons-png.flaticon.com/512/760/760926.png";
    case "pappagallo":
    case "parrot":
      return "https://cdn-icons-png.flaticon.com/512/2622/2622068.png";
    default:
      return "";
  }
}
