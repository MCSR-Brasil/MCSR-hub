function getState() {
  if (selectedState == "Rio Grande do Sul") {
    if (selectedCat == "1.16rsg") {
      sliceValue1 = 17;
      sliceValue2 = 20;
      parseAndCreateElements();
    }
    if (selectedCat == "1.16ssg") {
      sliceValue1 = 22;
      sliceValue2 = 25;
      parseAndCreateElements();
    }
    if (selectedCat == "1.14rsg") {
      sliceValue1 = 26;
      sliceValue2 = 29;
      parseAndCreateElements();
    }
    if (selectedCat == "1.7rsg") {
      sliceValue1 = 30;
      sliceValue2 = 33;
      parseAndCreateElements();
    }
  }

}
