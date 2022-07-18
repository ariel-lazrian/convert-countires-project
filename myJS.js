// JavaScript source code
"use strict";

const date = new Date();

const input = document.querySelector(".input");

const submit = document.querySelector(".submit");
const MainContent = document.querySelector(".main-content");
const statusText = document.querySelectorAll(".country");
const sectionContains = document.querySelector(".main-content").childNodes;

const clear = document.querySelector(".clear");
const container = document.querySelector(".container");
const copyButton = document.getElementById("myInput");
const containerYear = document.querySelector(".container-year");
createElementForInput();

const inputType = document.querySelector(".input-year");

//Presence uncertain
let myFirstArray,
  mySecondArray,
  myThreeArray,
  myFourArray,
  myFiveArray,
  mySixArray,
  mySevenArray,
  myEightArray,
  myNineArray,
  myTenArray,
  myElevenArray;

let myTwelveArray;
let mySortArray = [];

//for array without space
let myNewFirstArray,
  myNewSecondArray,
  myNewThreeArray,
  myNewFourArray,
  myNewFiveArray,
  myNewSixArray,
  myNewSevenArray,
  myNewEightArray,
  myNewNineArray,
  myNewTenArray,
  myNewElevenArray;

let myTitle;
let trueCondition = true;

const initArray = () => {
  myFirstArray = [];
  mySecondArray = [];
  myThreeArray = [];
  myFourArray = [];
  myFiveArray = [];
  mySixArray = [];
  mySevenArray = [];
  myEightArray = [];
  myNineArray = [];
  myTenArray = [];
  myElevenArray = [];
  myTwelveArray = [];
  mySortArray = [];
};

initArray();

const uploadData = (myArray, idx, countriesData) => {
  makeDataSl(myArray, countriesData[idx].trim());
};

const replaceCharsForReturingTheValueBetweenChars = (lowercaps) => {
  const unspace = lowercaps.split("(").filter((country) => country !== "");
  let chars = { "(": "", ")": "", ",": "" };
  const newData = unspace.at(-1).replace(/[()]/g, (string) => chars[string]);
  return newData;
};

const removeCharFirstWord = (chars, lowercaps) => {
  const newSplit = lowercaps.split(" ");
  const firstWordLength = newSplit[0].length;
  const restWords = lowercaps.slice(firstWordLength);

  const firstWord = newSplit[0].replace(/[(),]/g, (string) => chars[string]);

  return firstWord + restWords;
};

const removeAllCharFromAllWords = (chars, lowercaps) => {
  const newSplit = lowercaps.split(" ");
  const newData = newSplit
    .map((countries) => {
      return countries.replace(/[(),]/g, (string) => chars[string]);
    })
    .filter((countries) => countries !== "");

  return newData.join(" ");
};

const removeCharsForClearInput = (lowercaps, newCountryData, idx) => {
  let chars = { "(": "", ")": "", ",": "" };
  if (lowercaps[0] === "(") {
    const newDataForFirstWord = removeCharFirstWord(chars, lowercaps);
    if (
      newDataForFirstWord.includes("(") &&
      newDataForFirstWord.includes(")")
    ) {
      charsSperateCountry(newDataForFirstWord, newCountryData, idx);
    } else {
      return removeAllCharFromAllWords(chars, lowercaps);
    }
  } else {
    return removeAllCharFromAllWords(chars, lowercaps);
  }
};

const functionForResident = (lowercaps) => {
  const lowcapsSplit = lowercaps.split(" ");

  if (lowcapsSplit.includes("&")) {
    const findChar = lowcapsSplit.indexOf("&") + 1;
    // return upperCaps(lowcapsSplit.slice(findChar, findChar + 1).toString());
    return upperCaps(
      lowcapsSplit.slice(findChar, lowcapsSplit.length - 1).join(" ")
    );
  } else {
    return "";
  }
};

const replaceForTitle = function (lowercaps) {
  if (lowercaps.includes("resident")) {
    return functionForResident(lowercaps);
  } else {
    if (lowercaps === undefined) return;

    if (lowercaps.includes("(")) {
      const newData = replaceCharsForReturingTheValueBetweenChars(lowercaps);
      if (newData !== "&") {
        const newDataUpp = upperCaps(newData);

        return newDataUpp;
      }
    } else {
      const newData = lowercaps.split(" ");

      if (newData.length <= 3) {
        const newDataUpp = upperCaps(newData.at(-1));

        return newDataUpp;
      } else {
        const charIdx = newData.indexOf("&") + 1;
        const array = newData.slice(charIdx, newData.length);
        const newDataUpp = upperCaps(array.join(" "));
        return newDataUpp;
      }
    }
  }
};

const upperCapsWord = (word) => {
  const newCountrySplit = word.trim().split(" ");
  const firstLetter = newCountrySplit[0][0].toUpperCase();
  const fullName = firstLetter + newCountrySplit[0].slice(1);
  return fullName;
};

const separateWordsByChar = (newData, value) => {
  const findChar = newData.lastIndexOf(value);
  const newWords = newData.slice(0, findChar);
  if (newWords.includes("french southern territories"))
    return "French So. Terr";
  return newWords;
};

const uppCapTwoWords = (newCountry, value) => {
  const spaceIndex = newCountry.indexOf(value);
  const firstWord = newCountry.slice(0, spaceIndex);
  const secondWord = newCountry.slice(spaceIndex + 1);

  const firstWordCap = upperCapsWord(firstWord);
  const secondWordCap = upperCapsWord(secondWord);
  const fullWord = firstWordCap + value + secondWordCap;
  return fullWord;
};

//fine here
const upperCapsThreeWordsAndMore = (newCountry) => {
  const splitCountries = newCountry.split(" ");

  if (splitCountries.length > 1) {
    const newData = splitCountries.map((country) => {
      return upperCapsWord(country);
    });
    return newData.join(" ");
  }
};

const upperCaps = (countries) => {
  if (countries === undefined) return;
  if (countries === "") return;

  const newCountry = countries.trim();

  if (newCountry.includes(" ")) {
    if (newCountry.split(" ").length === 2) {
      const fullWord = uppCapTwoWords(newCountry, " ");
      return fullWord;
    } else if (newCountry.split(" ").length > 2) {
      return upperCapsThreeWordsAndMore(newCountry);
    }
    return newCountry;
  } else if (newCountry.includes("-")) {
    const fullName = uppCapTwoWords(newCountry, "-");
    return fullName;
  } else {
    const fullName = upperCapsWord(newCountry);
    return fullName;
  }
};

const helpFunctionForSplitCountries = (data) => {
  const newData = data
    .split("\n")
    .map((country) => country.trim())
    .filter((country) => country !== "");
  return newData;
};

const removeUnnecessaryChars = (newData) => {
  const splitNewData = newData.split(" ");

  const lastWord = splitNewData.at(-1);
  const charIndexRemove = lastWord.indexOf(",");
  const restWord = splitNewData.slice(0, splitNewData.length - 1);

  if (lastWord.indexOf(",") !== -1) {
    const newWord = lastWord.slice(0, charIndexRemove);

    const fullWord = restWord.join(" ") + " " + newWord;
    return fullWord;
  } else {
    return restWord.join(" ") + " " + lastWord;
  }
};

const removeSpaceForComma = (countries, value) => {
  const findCharIndex = countries.lastIndexOf(value);

  const restWords = countries.slice(0, findCharIndex);

  const newCountry = countries.slice(findCharIndex);
  const newSPlit = newCountry.split(",");
  const newCountryTrim = newSPlit.map((country) => country.trim());
  return restWords + newCountryTrim.join(",");
};

const findCharAndGiveHimSpaceBeforeChar = (country, value) => {
  const newId = [];
  const countrySplit = country.split("");

  if (country.includes("(")) {
    countrySplit.filter((country, idx) => {
      if (country === value) {
        newId.push(idx);
      }
    });
  }
  const newData = countrySplit.map((country, idx) => {
    for (let i = 0; i < newId.length; i++) {
      if (newId[i] - 1 === idx) {
        if (country !== " ") {
          return country + " ";
        }
      }
      return country;
    }
    return country;
  });

  return newData.join("");
};

const findCharAndGiveHimSpace = (country) => {
  const countries = findCharAndGiveHimSpaceBeforeChar(country, "(");

  const countrySplit = countries.split("\n");
  const newData = countrySplit.map((country) => {
    if (country.includes(",")) {
      if (country.includes("(")) {
        const removeSpace = removeSpaceForComma(country, "(");
        return removeSpace.split(",").join(", ");
      } else if (!country.includes("(")) {
        const removeSpace = removeSpaceForComma(country, ",");
        return removeSpace.split(",").join(", ");
      }
    }
    return country;
  });
  if (newData.includes("")) return;
  return newData.toString();
};

const conditionForShowingTitle = (myTwelveArray, idx, myLastTitle) => {
  const conditionForTitle =
    convertTitle(myTwelveArray[idx]) === undefined
      ? convertTitle(myLastTitle)
      : convertTitle(myTwelveArray[idx]);

  if (conditionForTitle === undefined) return "";
  return conditionForTitle;
};

const charsSperateCountry = (newData, newCountryData, idx) => {
  if (newData.includes("(")) {
    if (newData.includes("russian")) {
      newCountryData.push("Russia");
      return;
    }

    const myLastCurrentTitle = myTitle.at(-1);

    const wordsWithoutChar = separateWordsByChar(newData, "(");

    const newDataRemove = replaceCharsForReturingTheValueBetweenChars(newData);

    const newWordClear = removeCharsForClearInput(wordsWithoutChar);

    const newDataUppcaps = upperCaps(newWordClear);

    const newDataUppcapsRemove = upperCaps(newDataRemove);

    const conditionTitle = conditionForShowingTitle(
      myTwelveArray,
      idx,
      myLastCurrentTitle
    );

    const condiditonForYear = forYearCondition(";;;n;;;");
    const conditionForYearForExtinct = forYearCondition(
      ";0;;y;EX;;Extinct locally"
    );

    const conditioForTitle =
      conditionForShowingTitle(myTwelveArray, idx, myLastCurrentTitle) ===
      ";0;;y;EX;;Extinct locally"
        ? `${conditionForYearForExtinct}`
        : `${condiditonForYear}` + conditionTitle;

    const conditionForChar =
      conditionForShowingTitle(myTwelveArray, idx, myLastCurrentTitle) === ""
        ? ""
        : ":";

    newCountryData.push(
      newDataUppcaps.trim() +
        conditioForTitle.trim() +
        conditionForChar +
        newDataUppcapsRemove
    );
  }
};

const SeperateText = (newData, newCountryData, unexpection, value, idx) => {
  const clearData = removeUnnecessaryChars(newData);
  const clearDataWithChars = clearData[0].includes("(")
    ? replaceCharsForReturingTheValueBetweenChars(clearData)
    : clearData;

  if (clearDataWithChars.includes("(") || clearDataWithChars.includes(")")) {
    charsSperateCountry(clearDataWithChars, newCountryData, idx);
  } else if (clearDataWithChars.includes(",")) {
    const newDataFullSplit = clearDataWithChars.split(",");

    if (newDataFullSplit[0].split(" ").length <= 2) {
      if (newDataFullSplit[0] === "congo") {
        newCountryData.push(`DR Congo`);
        return;
      }
      const countryCaps = upperCaps(newDataFullSplit[0]);
      newCountryData.push(countryCaps.replaceAll(",", ""));
    } else {
      newCountryData.push(upperCaps(newDataFullSplit).toString().split(" ")[0]);
    }
  } else if (
    clearDataWithChars.includes(` ` + "and" + ` `) &&
    !clearDataWithChars.includes(value)
  ) {
    const newDataFullSplit = clearDataWithChars.split(" and ");
    const countryCaps = upperCaps(newDataFullSplit[0]);
    newCountryData.push(countryCaps);
  } else {
    unexpection.push(clearDataWithChars);
  }
};

const covertTitleForSpecial = (lowercaps) => {
  if (lowercaps.includes("&")) {
    const newSplit = lowercaps.split(" ");
    const charIdx = newSplit.indexOf("&");
    const sliceStart = newSplit.slice(0, charIdx).join(" ");
    const sliceEnd = newSplit.slice(charIdx + 1).join(" ");
    const condition =
      sliceStart === "extinct"
        ? ";0;;y;EX;;Extinct locally"
        : upperCaps(sliceStart);
    return condition + ", " + upperCaps(sliceEnd);
  } else {
    const condition =
      lowercaps === "extinct"
        ? ";0;;y;EX;;Extinct locally"
        : upperCaps(lowercaps);

    if (condition.includes(")")) {
      const conditionSplit = condition.split(" ");
      // const findindex = conditionSplit.lastIndexOf(")");

      conditionSplit.splice(-1, 1);
      return conditionSplit.join(" ");
    }
    return condition;
  }
};

const convertTitle = function (country) {
  if (country === undefined) return;

  const lowercaps = country.toLocaleLowerCase();
  if (lowercaps.split(" ")[0] === "extinct") {
    return covertTitleForSpecial(lowercaps);
  } else if (lowercaps.includes(`possibly extinct`)) {
    return covertTitleForSpecial(lowercaps);
  } else if (lowercaps.includes(`possibly extant`)) {
    return covertTitleForSpecial(lowercaps);
  } else if (lowercaps.includes("presence uncertain")) {
    return covertTitleForSpecial(lowercaps);
  } else {
    return replaceForTitle(lowercaps);
  }
};

///going here finally
const convertCountry = (country, idx) => {
  const unexpection = [];
  const newCountryData = [];

  if (country === "") return;

  const newCountry = country.trim().toLocaleLowerCase();

  if (country.includes("palestine")) return;

  if (newCountry.split(" ").length === 3) {
    if (newCountry.includes("(") || newCountry.includes(")")) {
      charsSperateCountry(newCountry, newCountryData, idx);
    } else {
      if (
        newCountry === "plurinational states of" ||
        newCountry === "united republic of" ||
        newCountry === "federated states of"
      )
        return;
      unexpection.push(newCountry);
    }
  } else if (newCountry.split(" ").length === 4) {
    SeperateText(newCountry, newCountryData, unexpection, "turks", idx);
  } else if (newCountry.split(" ").length > 4) {
    SeperateText(newCountry, newCountryData, unexpection, "heard", idx);
  } else {
    if (newCountry.includes("(") && newCountry[0] !== "(") {
      charsSperateCountry(newCountry, newCountryData, idx);
    } else {
      if (newCountry.includes("russian federation")) {
        return "Russia";
      }
      if (newCountry.includes("brunei darussalam")) return "Brunei";

      if (newCountry.includes("cabo verde")) return "Cape Verde";

      const newData = removeCharsForClearInput(newCountry, newCountryData, idx);

      const newCountryCaps = upperCaps(newData);

      newCountryData.push(newCountryCaps);
    }
  }

  if (newCountryData.includes("Viet Nam")) return "Vietnam";
  if (newCountryData.includes("Korea")) return "North Korea";

  //defind function for all of them
  if (unexpection.includes("heard island and mcdonald islands"))
    return "Heard & McDonald";
  if (unexpection.includes("trinidad and tobago ")) return "Trinidad & Tobago";
  if (unexpection.includes("turks and caicos islands"))
    return "Turks & Caicos Is";
  if (unexpection.includes("saint kitts and navis")) return "St. Kitts & Nevis";
  if (unexpection.includes("antigua and barbuda")) return "Antigua & Barbuda";

  if (unexpection.includes("united states minor outlying islands"))
    return "US Minor Is";
  if (unexpection.includes("british indian ocean territory"))
    return "British Ind";

  if (unexpection.includes("lao people's democratic republic")) return "Laos";
  if (unexpection.includes("syrian arab republic")) return "Syria";
  if (unexpection.includes("korea, republic of")) return "Korea";

  if (unexpection.includes("united arab emirates")) return "UAE";

  if (unexpection.includes("virgin islands, british"))
    return "Virgin Islands BR";
  if (unexpection.includes("virgin islands, u.s")) return "Virgin Islands US";
  if (unexpection.includes("central african republic")) return "Central Af Rep";
  if (unexpection.includes("northern mariana islands"))
    return "Nort Mariana Is";
  if (unexpection.includes("bosnia and herzegovina")) return "Bosnia And Herz";

  newCountryData.push(upperCaps(unexpection.toString()));

  const undefindNewCountryData = newCountryData.filter(
    (countries) => countries !== undefined
  );

  return undefindNewCountryData.toString();
};

const conditionFunction = (newCountry, titles) => {
  const conditionForCountry =
    newCountry.includes(";;;n;;") || titles === ";0;;y;EX;;Extinct locally"
      ? ``
      : ";;;n;;;";

  const conditionTitle =
    titles === ";0;;y;EX;;Extinct locally" ? "" : conditionForCountry;
  return conditionTitle;
};

function forYearCondition(dataAfterCountry) {
  if (dataAfterCountry.split("").at(-1) === ";") {
    // console.log(inputType.value);
    const inputTypeValue =
      inputType.value === " " ? ";" : `${inputType.value};`;
    // console.log(inputTypeValue);
    const slice = dataAfterCountry.slice(0, -1);

    //  slice + inputTypeValue give the all i need ;;; inputType.value === '' + ;
    return slice + inputTypeValue;
  } else if (dataAfterCountry.includes(";")) {
    const inputTypeValue = `${inputType.value};`;
    const lastIndexChar = dataAfterCountry.lastIndexOf(";");
    const data = dataAfterCountry.slice(0, lastIndexChar);
    const restData = dataAfterCountry.slice(lastIndexChar + 1);

    return data + inputTypeValue + restData;
  } else {
    return dataAfterCountry;
  }
}

//fix this function
const finalOutput = (country, idx) => {
  if (country === "") return;

  const countries = findCharAndGiveHimSpace(country);
  const newCountry = convertCountry(countries, idx);

  if (newCountry === "") return "";
  if (newCountry === undefined) return "";

  if (idx === 12) {
    const myLastTitle = convertTitle(myTitle.at(-1));

    const additionForCountry = conditionFunction(newCountry, myLastTitle);

    const condition = newCountry.includes(":") === true ? "" : myLastTitle;
    const conditionTitle = condition === undefined ? "" : condition;

    const myFinalAdditionCountry = forYearCondition(additionForCountry);
    const myFinalTitleYear = forYearCondition(conditionTitle);

    return newCountry + myFinalAdditionCountry + myFinalTitleYear;
  } else {
    const conditionForCountry = conditionFunction(
      newCountry,
      convertTitle(myTwelveArray[idx])
    );
    const conditionShowingTitle = conditionForShowingTitle(myTwelveArray, idx);

    const ConditionForAddingCountry =
      newCountry.includes(":") === true ? "" : conditionForCountry;

    const conditionTitle =
      newCountry.includes(":") === true ? "" : conditionShowingTitle;

    const yearInputCondition = forYearCondition(ConditionForAddingCountry);

    const myFinalTitleYear = forYearCondition(conditionTitle);

    const displayCountryWithTitle =
      newCountry + yearInputCondition + myFinalTitleYear;

    return displayCountryWithTitle.trim();
  }
};

const combineCountriesWithCommaWay = (countries) => {
  const newArray = [];
  const newDataOut = [];
  countries.forEach((countries) => {
    if (countries.includes("(") && countries.includes(")")) {
      newDataOut.push(countries);
    } else {
      if (
        countries.includes("(") ||
        countries.includes(")") ||
        countries.includes(",")
      ) {
        const newSplitArray = countries.split("");
        if (newSplitArray.at(-1) === " ") {
          newSplitArray.splice(-1);
        }

        if (newSplitArray.at(-1) === "," || newSplitArray.at(-1) === ")") {
          newArray.push(newSplitArray.join(""));
        } else {
          newDataOut.push(countries);
        }
      } else {
        newDataOut.push(countries);
      }
    }
  });
  const newCountry = newArray
    .join("")
    .split(")")
    .map((country) => {
      const newCountry = country.replaceAll(";", "");
      if (newCountry.includes(",")) {
        return newCountry + ")";
      }
      return newCountry;
    })
    .filter((country) => country !== undefined);

  newDataOut.push(newCountry);

  return newDataOut.flat(1);
};

//clear all the code from here
const clearArraySeperately = (array, idx) => {
  const newArray = combineCountriesWithCommaWay(array);

  const countryTitle = newArray
    .map((country) => {
      return finalOutput(country, idx);
    })
    .filter((country) => country !== "");

  return countryTitle;
};

const clearSpaceArray = () => {
  myNewFirstArray = clearArraySeperately(myFirstArray, 0);
  myNewSecondArray = clearArraySeperately(mySecondArray, 1);
  myNewThreeArray = clearArraySeperately(myThreeArray, 2);
  myNewFourArray = clearArraySeperately(myFourArray, 3);
  myNewFiveArray = clearArraySeperately(myFiveArray, 4);
  myNewSixArray = clearArraySeperately(mySixArray, 5);
  myNewSevenArray = clearArraySeperately(mySevenArray, 6);
  myNewEightArray = clearArraySeperately(myEightArray, 7);
  myNewNineArray = clearArraySeperately(myNineArray, 8);
  myNewTenArray = clearArraySeperately(myTenArray, 9);
  myNewElevenArray = clearArraySeperately(myElevenArray, 12);
};

const sortFunction = () => {
  const myArray = [
    ...myNewFirstArray,
    ...myNewSecondArray,
    ...myNewThreeArray,
    ...myNewFourArray,
    ...myNewFiveArray,
    ...myNewSixArray,
    ...myNewSevenArray,
    ...myNewEightArray,
    ...myNewNineArray,
    ...myNewTenArray,
    ...myNewElevenArray,
  ];

  [myArray].forEach((country) => {
    mySortArray.push(...country.sort());
  });
};

const filterFunction = (value, valueForlength, array) =>
  array.filter((_, idx) => {
    if (idx >= value) {
      return idx < valueForlength;
    }
  });

const makeNewArray = () => {
  clearSpaceArray();
  sortFunction();
};

const makeElementsAll = () => {
  makeNewArray();

  const firstLength = myNewFirstArray.length;
  const secondLength = myNewSecondArray.length + firstLength;
  const threeLength = myNewThreeArray.length + secondLength;
  const fourLength = myNewFourArray.length + threeLength;
  const fiveLength = myNewFiveArray.length + fourLength;
  const sixLength = myNewSixArray.length + fiveLength;
  const sevenLength = myNewSevenArray.length + sixLength;
  const eightLength = myNewEightArray.length + sevenLength;
  const nineLength = myNewNineArray.length + eightLength;
  const tenLength = myNewTenArray.length + nineLength;
  const elevenLength = myNewElevenArray.length + tenLength;

  const myfirst = filterFunction(0, firstLength, mySortArray);
  const myTwo = filterFunction(firstLength, secondLength, mySortArray);
  const myThree = filterFunction(secondLength, threeLength, mySortArray);
  const myFour = filterFunction(threeLength, fourLength, mySortArray);
  const myFive = filterFunction(fourLength, fiveLength, mySortArray);
  const mySix = filterFunction(fiveLength, sixLength, mySortArray);
  const mySeven = filterFunction(sixLength, sevenLength, mySortArray);
  const myEight = filterFunction(sevenLength, eightLength, mySortArray);
  const MyNine = filterFunction(eightLength, nineLength, mySortArray);
  const myTen = filterFunction(nineLength, tenLength, mySortArray);
  const myEleven = filterFunction(tenLength, elevenLength, mySortArray);

  makeElements(myfirst, MainContent, 0, myNewFirstArray);
  makeElements(myTwo, MainContent, 1, myNewSecondArray);
  makeElements(myThree, MainContent, 2, myNewThreeArray);
  makeElements(myFour, MainContent, 3, myNewFourArray);
  makeElements(myFive, MainContent, 4, myNewFiveArray);
  makeElements(mySix, MainContent, 5, myNewSixArray);
  makeElements(mySeven, MainContent, 6, myNewSevenArray);
  makeElements(myEight, MainContent, 7, myNewEightArray);
  makeElements(MyNine, MainContent, 8, myNewNineArray);
  makeElements(myTen, MainContent, 9, myNewTenArray);
  makeElements(myEleven, MainContent, 10, myNewElevenArray);
};

const makeElements = (myArray, countriesContainer, idx, array) => {
  if (array === 0) return;
  const container = makeContainer(countriesContainer, idx);

  myArray.forEach((country) => {
    if (country === "") return "";
    if (country === undefined) return "";
    // const newCountryCaps = upperCaps(country);
    if (country !== "") {
      const countryEl = document.createElement("div");
      countryEl.classList.add("country");

      countryEl.innerHTML = `
                <div class="country-text">
                  <p>${country}</p>
                </div>
                `;
      container.appendChild(countryEl);
    }
  });
};

const makeContainer = (countriesContainer, idx) => {
  const container = document.createElement("div");
  container.classList.add(`countries-container`);
  container.classList.add(`countries-container-${idx + 1}`);
  countriesContainer.appendChild(container);
  return container;
};

const returnTitleIdx = function (countries, myTitle) {
  let newIdx = [];
  countries.find((country, idx) => {
    if (country === myTitle[0]) newIdx.push(idx);
    else if (country === myTitle[1]) newIdx.push(idx);
    else if (country === myTitle[2]) newIdx.push(idx);
    else if (country === myTitle[3]) newIdx.push(idx);
    else if (country === myTitle[4]) newIdx.push(idx);
    else if (country === myTitle[5]) newIdx.push(idx);
    else if (country === myTitle[6]) newIdx.push(idx);
    else if (country === myTitle[7]) newIdx.push(idx);
    else if (country === myTitle[8]) newIdx.push(idx);
    else if (country === myTitle[9]) newIdx.push(idx);
    else if (country === myTitle[10]) newIdx.push(idx);
  });
  return newIdx;
};

const helper = (country) => {
  const newCountryMain = country
    .split(";")
    .map((country) => {
      const newArray = country.trim();
      return newArray;
    })
    .filter((countries) => countries !== "");
  return newCountryMain;
};

const makeDataSl = function (myArray, countries) {
  const countrieSspearte = countries.split("\n");
  countrieSspearte.forEach((country) => {
    if (country.includes(";")) {
      const newReturn = helper(country.toLocaleLowerCase());

      myArray.push(...newReturn);
    }
  });
};

//make all the titles lowercaps later
const findCountryMiddleWithoutChars = (array) => {
  const newData = helpFunctionForSplitCountries(array);
  const countriesWithoutCharFinal = newData.map((country) => {
    const conditionForBeingCountry = country.includes(";");
    if (!conditionForBeingCountry) {
      const countryCondition =
        !country.includes("Extinct") &&
        !country.includes("Extant") &&
        !country.includes("Uncertain") &&
        !country.includes("presence ") &&
        !country.includes("extent") &&
        !country.includes("possibly") &&
        !country.includes("Possibly") &&
        !country.includes("extinct");
      if (countryCondition) {
        return ";" + country;
      } else {
        return country;
      }
    } else {
      return country;
    }
  });

  return helpFunctionForSplitCountries(countriesWithoutCharFinal.join("\n"));
};

const conditionForBeingTitle = (countries) => {
  const findTitleLast = countries
    .map((country, idx) => {
      if (
        country.includes("Extinct") ||
        country.includes("Extant") ||
        country.includes("Uncertain") ||
        country.includes("extinct") ||
        country.includes("presence ") ||
        country.includes("possibly") ||
        country.includes("Possibly") ||
        country.includes("extent")
      ) {
        return country;
      } else {
        return "";
      }
    })
    .filter((country) => country !== "");
  return findTitleLast;
};

const CombineTitlesInTheEnd = (countriesData) => {
  const findTitleLast = conditionForBeingTitle(countriesData);

  const myLastCurrentTitle = findTitleLast.at(-1);

  const idxEndTItle = [];
  countriesData.find((country, idx) => {
    if (myLastCurrentTitle === country) {
      idxEndTItle.push(idx);
    }
  });
  const restData = countriesData.slice(0, idxEndTItle[0]);

  const dataWithEndTitle = countriesData.slice(idxEndTItle[0]);

  const newData = dataWithEndTitle
    .map((country) => {
      if (country.includes(";")) {
        return country;
      } else {
        return "";
      }
    })
    .filter((country) => country !== "");

  if (myLastCurrentTitle !== undefined) {
    return helpFunctionForSplitCountries(
      restData.join("\n") +
        "\n" +
        myLastCurrentTitle +
        "\n" +
        newData.join("\n")
    );
  } else {
    return helpFunctionForSplitCountries(restData.join("\n"));
  }
};

const startPoint = (countriesData) => {
  const findTitleLast = conditionForBeingTitle(countriesData);
  const firstCountry = findTitleLast.at(0);
  const newId = [];

  countriesData.forEach((countries, idx) => {
    if (countries === firstCountry) {
      newId.push(idx);
    }
  });
  const startPointFromTheFirstTitle = countriesData.slice(newId[0]);
  return startPointFromTheFirstTitle;
};

const AddCharForCountries = (countries) => {
  const splitCountry = countries.map((countries, idx) => {
    if (countries.includes(";")) {
      const Array = countries.split(" ").filter((country) => country !== "");
      const newData = Array.map((countries) => {
        if (countries.includes(")")) {
          const splitCountries = countries.split("");
          if (splitCountries.at(-1) !== ";") {
            return splitCountries.join("") + ";";
          }
          return countries;
        }
        return countries;
      });
      return newData.join(" ");
    }
    return countries;
  });

  return splitCountry;
};

const checkIdxTitle2 = (countries) => {
  const countriesDataFirst = findCountryMiddleWithoutChars(countries);
  const countriesData = CombineTitlesInTheEnd(countriesDataFirst);
  const fixCountriesWithChars = AddCharForCountries(countriesData);
  const startData = startPoint(fixCountriesWithChars);

  myTitle = startData.filter(
    (country) =>
      (!country.includes(";") &&
        country.includes(" ") &&
        !country.includes(",")) ||
      country === "Extinct" ||
      country === "extinct"
  );

  const myIdxTitle = returnTitleIdx(startData, myTitle);
  const myLastCurrentTitle = myTitle.at(-1);

  startData.forEach((country, idx) => {
    if (myIdxTitle[0] < idx && idx < myIdxTitle[1]) {
      uploadData(myFirstArray, idx, startData);
    } else if (myIdxTitle[1] < idx && idx < myIdxTitle[2]) {
      uploadData(mySecondArray, idx, startData);
    } else if (myIdxTitle[2] < idx && idx < myIdxTitle[3]) {
      uploadData(myThreeArray, idx, startData);
    } else if (myIdxTitle[3] < idx && idx < myIdxTitle[4]) {
      uploadData(myFourArray, idx, startData);
    } else if (myIdxTitle[4] < idx && idx < myIdxTitle[5]) {
      uploadData(myFiveArray, idx, startData);
    } else if (myIdxTitle[5] < idx && idx < myIdxTitle[6]) {
      uploadData(mySixArray, idx, startData);
    } else if (myIdxTitle[6] < idx && idx < myIdxTitle[7]) {
      uploadData(mySevenArray, idx, startData);
    } else if (myIdxTitle[7] < idx && idx < myIdxTitle[8]) {
      uploadData(myEightArray, idx, startData);
    } else if (myIdxTitle[8] < idx && idx < myIdxTitle[9]) {
      uploadData(myNineArray, idx, startData);
    } else if (myIdxTitle[9] < idx && idx < myIdxTitle[10]) {
      uploadData(myTenArray, idx, startData);
    } else if (myIdxTitle[10] < idx) {
      uploadData(myElevenArray, idx, startData);
    } else {
      if (country.includes(";")) {
        uploadData(myElevenArray, idx, startData);
      } else {
        if (
          (country.includes(" ") &&
            country !== myLastCurrentTitle &&
            !country.includes(",")) ||
          country === "Extinct" ||
          country === "extinct"
        ) {
          myTwelveArray.push(startData[idx].trim());
        }
      }
    }
  });
};

submit.addEventListener("click", function () {
  trueCondition = true;

  if (input.value !== "") {
    //input.value = data13;
    container.classList.add("container-style");
    MainContent.innerHTML = "";
    checkIdxTitle2(input.value);
    makeElementsAll();

    initArray();
    // inputType.value = 2022;
  }

  copyButton.addEventListener("click", myFunction);
});

clear.addEventListener("click", () => {
  sectionContains.forEach((countriesContainer) => {
    countriesContainer.innerHTML = "";
  });
  initArray();
  input.value = "";
  container.classList.remove("container-style");
  copyButton.classList.remove("button-color-click");

  inputType.value = 2022;
});

function myFunction() {
  if (input.value !== "" && trueCondition) {
    let MainContent = document.querySelector(".main-content").textContent;
    let formContent = input.value;

    const mainContentToCopy = MainContent.split(" ")
      .filter((countries) => countries !== "")
      .filter((countries) => countries !== "\n")
      .join(" ");

    const str = mainContentToCopy.length;
    const newStringMainContentToCopy = mainContentToCopy.padStart(str + 1, " ");
    const newData = newStringMainContentToCopy
      .split("\n")
      .map((data) => {
        return data.trim();
      })
      .filter((data) => data !== "");

    input.value = newData.join("\n");
    input.select();
    document.execCommand("cut");
    input.value = formContent;

    copyButton.classList.add("button-color-click");
    validationSuccess();
    trueCondition = false;
  }
}

function validationSuccess() {
  document.querySelector(".validate-success").classList.add("show-validation");
  setTimeout(() => {
    document
      .querySelector(".validate-success")
      .classList.remove("show-validation");
  }, 800);
}

function eventChange(inputType) {
  inputType.addEventListener("change", (data) => {
    return inputType.value;
  });
}

function createElementForInput() {
  const selectinput = document.createElement("select");
  const optionInputEmpty = document.createElement("option");

  selectinput.classList.add("input-year");
  selectinput.name = "year";

  let element = [];
  for (let i = date.getFullYear(); i >= 1980; i--) {
    element.push(i);
  }
  element.forEach((year) => {
    const optionInput = document.createElement("option");
    optionInput.value = year;
    optionInput.textContent = year;

    selectinput.appendChild(optionInput);
  });

  optionInputEmpty.value = " ";
  optionInputEmpty.textContent = " ";

  selectinput.appendChild(optionInputEmpty);
  containerYear.appendChild(selectinput);
}

document.querySelector(".input-year").childNodes.forEach((type) => {
  if (type.value === "2022") {
    type.setAttribute("selected", "selected");
  }
});
