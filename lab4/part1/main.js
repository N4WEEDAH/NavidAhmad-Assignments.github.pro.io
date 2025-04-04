// 1.  elements
const customName = document.getElementById("customname");
const randomize = document.querySelector(".randomize");
const story = document.querySelector(".story");

// 2. random value from  array
function randomValueFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// 3. Story
const storyText =
    "It was 94 fahrenheit outside, so :insertx: went for a walk. " +
    "When they got to :inserty:, they stared in horror for a few moments, " +
    "then :insertz:. Bob saw the whole thing, but was not surprised — :insertx: " +
    "weighs 300 pounds, and it was a hot day.";

const insertX = ["Willy the Goblin", "Big Daddy", "Father Christmas"];
const insertY = ["the soup kitchen", "Disneyland", "the White House"];
const insertZ = ["spontaneously combusted", "melted into a puddle on the sidewalk", "turned into a slug and crawled away"];

// 4.  listener for button
randomize.addEventListener("click", generateStory);

function generateStory() {
    let newStory = storyText;
    
    let xItem = randomValueFromArray(insertX);
    let yItem = randomValueFromArray(insertY);
    let zItem = randomValueFromArray(insertZ);

    newStory = newStory.replaceAll(":insertx:", xItem);
    newStory = newStory.replace(":inserty:", yItem);
    newStory = newStory.replace(":insertz:", zItem);

    // name dync
    if (customName.value !== "") {
        newStory = newStory.replace("Bob", customName.value);
    }

    // Convert units if "UK" is selected
    if (document.getElementById("uk").checked) {
        let weight = Math.round(300 * 0.0714286) + " stone"; // Convert pounds to stone
        let temperature = Math.round((94 - 32) * (5 / 9)) + " centigrade"; // Convert F to C

        newStory = newStory.replace("300 pounds", weight);
        newStory = newStory.replace("94 fahrenheit", temperature);
    }
    