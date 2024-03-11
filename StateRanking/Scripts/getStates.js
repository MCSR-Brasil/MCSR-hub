/* 
Refazer o jeito que as states sao armazenadas, porque qualquer mudanca no arquivo que nao foi eu quebra tudo
E refazer o script de getStates.js e principalmente o getRuns.js
Tentar usar uma database real, ou so refazer o CSV

*/

//NAO MUDE NADA

function getState() {
  if (selectedState == "none") {
    if (selectedCat == "1.16rsg") {
      parseAndCreateElements(0,4);
    }
    if (selectedCat == "1.16ssg") {
      parseAndCreateElements(13,17);
    }
    if (selectedCat == "1.14rsg") {
      parseAndCreateElements(5,8);
    }
    if (selectedCat == "1.7rsg") {
      parseAndCreateElements(9,12);
    }
  }
  if (selectedState == "Rio Grande do Sul") {
    if (selectedCat == "1.16rsg") {
      parseAndCreateElements(17,20);
    }
    if (selectedCat == "1.16ssg") {
      parseAndCreateElements(22,25);
    }
    if (selectedCat == "1.14rsg") {
      parseAndCreateElements(26,29);
    }
    if (selectedCat == "1.7rsg") {
      parseAndCreateElements(30,33);
    }
  }
  if (selectedState == "Santa Catarina") {
    if (selectedCat == "1.16rsg") {
      parseAndCreateElements(34,37);
    }
    if (selectedCat == "1.16ssg") {
      parseAndCreateElements(38,41);
    }
    if (selectedCat == "1.14rsg") {
      parseAndCreateElements(42,45);
    }
    if (selectedCat == "1.7rsg") {
      parseAndCreateElements(46,49);
    }
  }
  if (selectedState == "Paraná") {
    if (selectedCat == "1.16rsg") {
      parseAndCreateElements(50,53);
    }
    if (selectedCat == "1.16ssg") {
      parseAndCreateElements(54,57);
    }
    if (selectedCat == "1.14rsg") {
      parseAndCreateElements(58,61);
    }
    if (selectedCat == "1.7rsg") {
      parseAndCreateElements(62,65);
    }
  }
  if (selectedState == "São Paulo") {
    if (selectedCat == "1.16rsg") {
      parseAndCreateElements(66,69);
    }
    if (selectedCat == "1.16ssg") {
      parseAndCreateElements(70,73);
    }
    if (selectedCat == "1.14rsg") {
      parseAndCreateElements(74,77);
    }
    if (selectedCat == "1.7rsg") {;
      parseAndCreateElements(78,81);
    }
  }
  if (selectedState == "Mato Grosso do Sul") {
    if (selectedCat == "1.16rsg") {
      parseAndCreateElements(82,85);
    }
    if (selectedCat == "1.16ssg") {
      parseAndCreateElements(86,89);
    }
    if (selectedCat == "1.14rsg") {
      parseAndCreateElements(90,93);
    }
    if (selectedCat == "1.7rsg") {
      parseAndCreateElements(94,97);
    }
  }
  if (selectedState == "Rio de Janeiro") {
    if (selectedCat == "1.16rsg") {
      parseAndCreateElements(98,101);
    }
    if (selectedCat == "1.16ssg") {
      parseAndCreateElements(102,105);
    }
    if (selectedCat == "1.14rsg") {
      parseAndCreateElements(106,109);
    }
    if (selectedCat == "1.7rsg") {
      parseAndCreateElements(110,113);
    }
  }
  if (selectedState == "Minas Gerais") {
    if (selectedCat == "1.16rsg") {
      parseAndCreateElements(114,117);
    }
    if (selectedCat == "1.16ssg") {
      parseAndCreateElements(118,121);
    }
    if (selectedCat == "1.14rsg") {
      parseAndCreateElements(122,125);
    }
    if (selectedCat == "1.7rsg") {
      parseAndCreateElements(126,129);
    }
  }
  if (selectedState == "Goiás") {
    if (selectedCat == "1.16rsg") {
      parseAndCreateElements(130,133);
    }
    if (selectedCat == "1.16ssg") {
      parseAndCreateElements(134,137);
    }
    if (selectedCat == "1.14rsg") {
      parseAndCreateElements(138,141);
    }
    if (selectedCat == "1.7rsg") {
      parseAndCreateElements(142,145);
    }
  }
  if (selectedState == "Distrito Federal") {
    if (selectedCat == "1.16rsg") {
      parseAndCreateElements(146,149);
    }
    if (selectedCat == "1.16ssg") {
      parseAndCreateElements(150,153);
    }
    if (selectedCat == "1.14rsg") {
      parseAndCreateElements(154,157);
    }
    if (selectedCat == "1.7rsg") {
      parseAndCreateElements(158,161);
    }
  }
  if (selectedState == "Mato Grosso") {
    if (selectedCat == "1.16rsg") {
      parseAndCreateElements(82,85);
    }
    if (selectedCat == "1.16ssg") {
      parseAndCreateElements(86,89);
    }
    if (selectedCat == "1.14rsg") {
      parseAndCreateElements(90,93);
    }
    if (selectedCat == "1.7rsg") {
      parseAndCreateElements(94,97);
    }
  }
  if (selectedState == "Espírito Santo") {
    if (selectedCat == "1.16rsg") {
      parseAndCreateElements(82,85);
    }
    if (selectedCat == "1.16ssg") {
      parseAndCreateElements(86,89);
    }
    if (selectedCat == "1.14rsg") {
      parseAndCreateElements(90,93);
    }
    if (selectedCat == "1.7rsg") {
      parseAndCreateElements(94,97);
    }
  }
  if (selectedState == "Bahia") {
    if (selectedCat == "1.16rsg") {
      parseAndCreateElements(162,165);
    }
    if (selectedCat == "1.16ssg") {
      parseAndCreateElements(166,169);
    }
    if (selectedCat == "1.14rsg") {
      parseAndCreateElements(170,173);
    }
    if (selectedCat == "1.7rsg") {
      parseAndCreateElements(174,177);
    }
  }
  if (selectedState == "Tocantins") {
    if (selectedCat == "1.16rsg") {
      parseAndCreateElements(82,85);
    }
    if (selectedCat == "1.16ssg") {
      parseAndCreateElements(86,89);
    }
    if (selectedCat == "1.14rsg") {
      parseAndCreateElements(90,93);
    }
    if (selectedCat == "1.7rsg") {
      parseAndCreateElements(94,97);
    }
  }
  if (selectedState == "Pará") {
    if (selectedCat == "1.16rsg") {
      parseAndCreateElements(178,181);
    }
    if (selectedCat == "1.16ssg") {
      parseAndCreateElements(182,185);
    }
    if (selectedCat == "1.14rsg") {
      parseAndCreateElements(186,189);
    }
    if (selectedCat == "1.7rsg") {
      parseAndCreateElements(190,193);
    }
  }
  if (selectedState == "Amazonas") {
    if (selectedCat == "1.16rsg") {
      parseAndCreateElements(82,85);
    }
    if (selectedCat == "1.16ssg") {
      parseAndCreateElements(86,89);
    }
    if (selectedCat == "1.14rsg") {
      parseAndCreateElements(90,93);
    }
    if (selectedCat == "1.7rsg") {
      parseAndCreateElements(94,97);
    }
  }
  if (selectedState == "Acre") {
    if (selectedCat == "1.16rsg") {
      parseAndCreateElements(82,85);
    }
    if (selectedCat == "1.16ssg") {
      parseAndCreateElements(86,89);
    }
    if (selectedCat == "1.14rsg") {
      parseAndCreateElements(90,93);
    }
    if (selectedCat == "1.7rsg") {
      parseAndCreateElements(94,97);
    }
  }
  if (selectedState == "Rondônia") {
    if (selectedCat == "1.16rsg") {
      parseAndCreateElements(82,85);
    }
    if (selectedCat == "1.16ssg") {
      parseAndCreateElements(86,89);
    }
    if (selectedCat == "1.14rsg") {
      parseAndCreateElements(90,93);
    }
    if (selectedCat == "1.7rsg") {
      parseAndCreateElements(94,97);
    }
  }
  if (selectedState == "Sergipe") {
    if (selectedCat == "1.16rsg") {
      parseAndCreateElements(82,85);
    }
    if (selectedCat == "1.16ssg") {
      parseAndCreateElements(86,89);
    }
    if (selectedCat == "1.14rsg") {
      parseAndCreateElements(90,93);
    }
    if (selectedCat == "1.7rsg") {
      parseAndCreateElements(94,97);
    }
  }
  if (selectedState == "Alagoas") {
    if (selectedCat == "1.16rsg") {
      parseAndCreateElements(194,197);
    }
    if (selectedCat == "1.16ssg") {
      parseAndCreateElements(198,201);
    }
    if (selectedCat == "1.14rsg") {
      parseAndCreateElements(202,205);
    }
    if (selectedCat == "1.7rsg") {
      parseAndCreateElements(206,209);
    }
  }
  if (selectedState == "Pernambuco") {
    if (selectedCat == "1.16rsg") {
      parseAndCreateElements(210,213);
    }
    if (selectedCat == "1.16ssg") {
      parseAndCreateElements(214,217);
    }
    if (selectedCat == "1.14rsg") {
      parseAndCreateElements(218,221);
    }
    if (selectedCat == "1.7rsg") {
      parseAndCreateElements(222,225);
    }
  }
  if (selectedState == "Paraíba") {
    if (selectedCat == "1.16rsg") {
      parseAndCreateElements(226,229);
    }
    if (selectedCat == "1.16ssg") {
      parseAndCreateElements(230,233);
    }
    if (selectedCat == "1.14rsg") {
      parseAndCreateElements(234,237);
    }
    if (selectedCat == "1.7rsg") {
      parseAndCreateElements(238,241);
    }
  }
  if (selectedState == "Rio Grande do Norte") {
    if (selectedCat == "1.16rsg") {
      parseAndCreateElements(242,245);
    }
    if (selectedCat == "1.16ssg") {
      parseAndCreateElements(246,249);
    }
    if (selectedCat == "1.14rsg") {
      parseAndCreateElements(250,253);
    }
    if (selectedCat == "1.7rsg") {
      parseAndCreateElements(254,257);
    }
  }
  if (selectedState == "Ceará") {
    if (selectedCat == "1.16rsg") {
      parseAndCreateElements(82,85);
    }
    if (selectedCat == "1.16ssg") {
      parseAndCreateElements(86,89);
    }
    if (selectedCat == "1.14rsg") {
      parseAndCreateElements(90,93);
    }
    if (selectedCat == "1.7rsg") {
      parseAndCreateElements(94,97);
    }
  }
  if (selectedState == "Piauí") {
    if (selectedCat == "1.16rsg") {
      parseAndCreateElements(82,85);
    }
    if (selectedCat == "1.16ssg") {
      parseAndCreateElements(86,89);
    }
    if (selectedCat == "1.14rsg") {
      parseAndCreateElements(90,93);
    }
    if (selectedCat == "1.7rsg") {
      parseAndCreateElements(94,97);
    }
  }
  if (selectedState == "Maranhão") {
    if (selectedCat == "1.16rsg") {
      parseAndCreateElements(82,85);
    }
    if (selectedCat == "1.16ssg") {
      parseAndCreateElements(86,89);
    }
    if (selectedCat == "1.14rsg") {
      parseAndCreateElements(90,93);
    }
    if (selectedCat == "1.7rsg") {
      parseAndCreateElements(94,97);
    }
  }
  if (selectedState == "Amapá") {
    if (selectedCat == "1.16rsg") {
      parseAndCreateElements(82,85);
    }
    if (selectedCat == "1.16ssg") {
      parseAndCreateElements(86,89);
    }
    if (selectedCat == "1.14rsg") {
      parseAndCreateElements(90,93);
    }
    if (selectedCat == "1.7rsg") {
      parseAndCreateElements(94,97);
    }
  }
  if (selectedState == "Roraima") {
    if (selectedCat == "1.16rsg") {
      parseAndCreateElements(82,85);
    }
    if (selectedCat == "1.16ssg") {
      parseAndCreateElements(86,89);
    }
    if (selectedCat == "1.14rsg") {
      parseAndCreateElements(90,93);
    }
    if (selectedCat == "1.7rsg") {
      parseAndCreateElements(94,97);
    }
  }
}
