import { h, list, p, tip, type LessonSpec } from "./build";

/*
  A fifth lesson for each of the four chapters that had four, so every grade and subject has at least five.
  They are added to the END of the existing chapters, so saved progress and the order of the older lessons do not change.
*/
export const TOP_UP_SPECS: Record<string, LessonSpec[]> = {
  fractions: [
    {
      id: "of-amount",
      title: "Fractions of an amount",
      teaser: "Find 3/4 of 24 students, or 2/5 of 50 minutes.",
      question: "A class has 24 students and 3/4 of them walk to school. How many walk?",
      goals: ["Explain finding a fraction of an amount as “divide, then multiply”", "Find a fraction of a whole number", "Solve simple word problems that use fractions of amounts"],
      hint: "Split the amount into equal groups first. The bottom number tells you how many groups.",
      walk: "For 3/4 of 24, the bottom number is 4, so split 24 into 4 equal groups of 6. The top number is 3, so take 3 groups: 3 × 6 = 18.",
      summary: [
        "To find a fraction of an amount, divide by the bottom number, then multiply by the top number.",
        "When the fraction is less than 1, the answer is smaller than the whole amount.",
      ],
      explain: [
        p("Sometimes you need a fraction of a number, not a fraction of a pizza: 3/4 of 24 students, or 2/5 of 50 minutes."),
        h("Divide by the bottom, multiply by the top"),
        p("The bottom number (the denominator) tells you how many equal groups to split the amount into. The top number (the numerator) tells you how many of those groups to take."),
        list("Find 3/4 of 24.", "Divide 24 by 4 to find one quarter: 24 ÷ 4 = 6.", "Multiply by 3 to find three quarters: 6 × 3 = 18."),
        tip("Key idea", "Divide by the bottom number first. Then multiply by the top number."),
        p("Here is another one. To find 2/5 of 50 minutes, divide 50 by 5 to get 10, then multiply by 2 to get 20 minutes."),
        p("Always check your answer. If the fraction is less than 1, the answer must be smaller than the whole amount."),
      ],
      tryIt: [
        h("Try these"),
        list("1/3 of 18: 18 ÷ 3 = 6.", "2/3 of 18: 6 × 2 = 12.", "3/8 of 40: 40 ÷ 8 = 5, then 5 × 3 = 15.", "4/5 of 35: 35 ÷ 5 = 7, then 7 × 4 = 28."),
        p("Challenge: a book has 120 pages and you have read 5/8 of it. How many pages have you read, and how many are left? Answer: 120 ÷ 8 = 15, then 15 × 5 = 75 pages read, so 45 left."),
      ],
      practice: [
        { p: "What is 1/4 of 20?", a: "5", w: [["4", "Divide by the bottom number, 4: 20 ÷ 4 = 5."], ["16", "That is 20 − 4. Divide, do not subtract."]], x: "20 ÷ 4 = 5." },
        { p: "What is 3/5 of 30?", a: "18", w: [["6", "6 is 1/5 of 30. Multiply by the top number, 3."], ["10", "10 is 1/3 of 30."]], x: "30 ÷ 5 = 6, then 6 × 3 = 18." },
      ],
      quiz: [
        { p: "What is 2/3 of 12?", a: "8", w: [["4", "4 is 1/3 of 12. Multiply by 2 for two thirds."], ["6", "6 is half of 12."]], x: "12 ÷ 3 = 4, then 4 × 2 = 8." },
        { p: "A shop has 40 shirts and 3/8 are blue. How many are blue?", a: "15", w: [["5", "5 is 1/8 of 40. Multiply by the top number, 3."], ["24", "24 is 3/5 of 40, not 3/8."]], x: "40 ÷ 8 = 5, then 5 × 3 = 15." },
        { p: "Which method finds 5/6 of 42?", a: "Divide 42 by 6, then multiply by 5", w: [["Divide 42 by 5, then multiply by 6", "The bottom number is the one you divide by: divide by 6."], ["Subtract 5 from 42, then divide by 6", "Subtracting does not find a fraction of an amount."]], x: "42 ÷ 6 = 7, then 7 × 5 = 35.", lineup: true },
      ],
      check: [
        { p: "What is 7/10 of 50?", a: "35", w: [["5", "5 is 1/10 of 50. Multiply by the top number, 7."], ["7", "7 is only the numerator."]], x: "50 ÷ 10 = 5, then 5 × 7 = 35." },
        { p: "Maya has £60 and spends 1/5 of it. How much does she have left?", a: "£48", w: [["£12", "£12 is what she spent. The question asks what is left."], ["£55", "That is £60 − 5. Find 1/5 of £60 first."]], x: "1/5 of 60 is 12, so she has 60 − 12 = £48 left." },
      ],
    },
  ],
  "solar-system": [
    {
      id: "seasons",
      title: "Day, night and seasons",
      teaser: "A spinning, tilted Earth makes day, night and the seasons.",
      question: "Earth is always about the same distance from the Sun. So why are some months hot and others cold?",
      goals: ["Explain day and night using Earth's spin", "Explain the seasons using the tilt of Earth's axis", "Say why the two hemispheres have opposite seasons"],
      hint: "Think about what Earth does in one day, and what it does in one year. They are different movements.",
      walk: "Earth spins once a day, which gives day and night. Earth orbits the Sun once a year, with its axis tilted by about 23.5°. When a hemisphere leans towards the Sun it gets more direct sunlight and longer days, which is summer. The other hemisphere leans away and has winter.",
      summary: [
        "Day and night come from Earth spinning on its axis. The seasons come from the tilt of that axis as Earth orbits the Sun.",
        "When it is summer in one hemisphere, it is winter in the other.",
      ],
      explain: [
        p("The Earth spins around an imaginary line through its North and South Poles, called its axis. One full spin takes about 24 hours. That is one day. The side of Earth facing the Sun has daytime. The side facing away has night."),
        p("The Sun seems to rise in the east and set in the west. In fact the Sun is not moving across the sky. The Earth is spinning towards the east."),
        h("A tilted planet"),
        p("Earth also travels around the Sun. One trip takes about 365 days, which is one year. Earth's axis is tilted by about 23.5°, and it keeps pointing the same way in space as Earth goes round."),
        h("Why that makes seasons"),
        p("When the Northern Hemisphere leans towards the Sun, sunlight hits it more directly and the days are long. That is summer. When it leans away, the Sun is lower in the sky, the days are short, and it is winter. At the same moment, the Southern Hemisphere has the opposite season."),
        tip("Key idea", "The seasons are caused by the tilt of Earth's axis. They are not caused by Earth being closer to or further from the Sun."),
        p("In fact, Earth is closest to the Sun in early January, which is winter in the Northern Hemisphere. Near the equator, the Sun's height changes very little all year, so there are hardly any seasons there."),
        list("Around 21 June: the longest day in the north, and the shortest in the south.", "Around 21 December: the shortest day in the north, and the longest in the south.", "Around 20 March and 22 September: day and night are about equal everywhere."),
      ],
      tryIt: [
        h("Model it with a lamp and a ball"),
        list(
          "Put a lamp in the middle of a table. It is the Sun.",
          "Push a pencil through a ball so it sticks out at both ends. The pencil is the axis. Tilt it slightly and mark where you live.",
          "Spin the ball slowly. Your mark moves in and out of the light: day and night.",
          "Keep the tilt pointing the same way. Walk the ball around the lamp. When does your mark get the most direct light? That is summer.",
        ),
        p("Challenge: what happens to the seasons if the pencil is not tilted at all? Answer: there would be no seasons, because every place would get the same amount of light all year."),
      ],
      practice: [
        { p: "What causes day and night?", a: "Earth spinning on its axis", w: [["Earth moving around the Sun", "That takes a year and is linked to the seasons."], ["The Sun moving around Earth", "The Sun only seems to move. Earth is the one spinning."]], x: "Earth spins once about every 24 hours, so each place faces the Sun and then faces away." },
        { p: "About how long does Earth take to orbit the Sun once?", a: "365 days (one year)", w: [["24 hours", "That is one spin on its axis, which makes a day."], ["One month", "The Moon takes about a month to orbit the Earth."]], x: "One orbit of the Sun takes about 365 days." },
      ],
      quiz: [
        { p: "What causes the seasons?", a: "The tilt of Earth's axis", w: [["Earth being closer to the Sun in summer", "Earth is actually closest to the Sun in January, in northern winter."], ["The Sun getting hotter and cooler", "The Sun's output hardly changes through the year."]], x: "The tilt changes how directly sunlight hits each hemisphere through the year." },
        { p: "Three statements. Which is true?", a: "When it is summer in Australia, it is winter in Canada.", w: [["The whole Earth has summer at the same time.", "The two hemispheres have opposite seasons."], ["Day and night happen because Earth moves around the Sun.", "Day and night come from Earth's spin."]], x: "The hemispheres lean towards the Sun at opposite times of the year.", lineup: true },
        { p: "In which month is the day longest in the Northern Hemisphere?", a: "June", w: [["December", "That is when days are shortest in the north."], ["March", "In March, day and night are about equal."]], x: "Around 21 June, the Northern Hemisphere leans most towards the Sun." },
      ],
      check: [
        { p: "Why does the Sun seem to rise in the east?", a: "Earth spins towards the east", w: [["The Sun moves around Earth", "The Sun appears to move only because Earth rotates."], ["The Moon pulls it up", "The Moon does not make the Sun rise."]], x: "Earth rotates towards the east, so the Sun appears to come up in the east." },
        { p: "What would happen to the seasons if Earth's axis had no tilt?", a: "There would be hardly any seasons", w: [["Summers would be much hotter", "Without a tilt, the sunlight would stay about the same all year."], ["Each year would be shorter", "The tilt does not change the length of a year."]], x: "The tilt is what makes the difference between summer and winter." },
      ],
    },
  ],
  "ancient-egypt": [
    {
      id: "afterlife",
      title: "Gods, mummies and the afterlife",
      teaser: "Why Egyptians preserved bodies and filled tombs with treasure.",
      question: "Why did the ancient Egyptians go to so much trouble to preserve bodies and fill tombs with goods?",
      goals: ["Name some Egyptian gods and what they stood for", "Explain why Egyptians believed in an afterlife", "Describe the main steps of mummification"],
      hint: "Think about what the Egyptians believed happened to a person after they died.",
      walk: "Egyptians believed life continued after death. A person's spirit needed their body, so the body was preserved. It also needed food, tools and treasure in the afterlife, so these were placed in the tomb.",
      summary: [
        "Egyptians believed in an afterlife. They preserved bodies as mummies and filled tombs with the things a person would need.",
        "Many gods were linked to life and death, such as Osiris, Anubis and Ra.",
      ],
      explain: [
        p("The ancient Egyptians believed that life continued after death. To live on in the afterlife, a person's spirit needed their body. That is why Egyptians who could afford it had their bodies preserved as mummies."),
        h("Gods and goddesses"),
        p("Egyptians worshipped many gods, each linked to part of life or nature."),
        list(
          "Ra: the sun god, who sailed across the sky each day.",
          "Osiris: the god of the afterlife and the dead.",
          "Isis: a goddess of magic and motherhood.",
          "Anubis: the jackal-headed god who guided the dead and was linked with mummification.",
          "Horus: the falcon-headed god of the sky, linked with kings.",
        ),
        h("Making a mummy"),
        p("Mummification took about 70 days. Priests removed the organs that rot fastest and stored them in jars. The body was covered in natron, a natural salt, which dried it out. It was then wrapped in linen bandages with lucky charms called amulets and placed in a coffin. The heart was left in the body, because Egyptians believed it held a person's thoughts and feelings."),
        tip("Key idea", "Egyptians preserved bodies and filled tombs with goods because they believed the dead person would need them in the afterlife."),
        h("The judgement of the dead"),
        p("The Book of the Dead describes how a dead person's heart was weighed against a feather, the symbol of truth and justice. If the heart was not weighed down by wrongdoing, the person could enter the afterlife. If not, the monster Ammit would eat the heart."),
      ],
      tryIt: [
        h("Plan a tomb"),
        p("Imagine you are a priest planning a tomb for a farmer. Work through these steps."),
        list(
          "List five things the farmer would need in the afterlife. Think of food, tools and clothing.",
          "Choose two gods to paint on the walls, and say why you chose them.",
          "Write three things the farmer did well in life that would help them pass the judgement of the dead.",
        ),
        p("Challenge (ask your teacher first): to see how natron works, put half an apple in a box of salt and baking soda for a week, and compare it with a plain apple left in the open."),
      ],
      practice: [
        { p: "Which god guided the dead and was linked with mummification?", a: "Anubis", w: [["Ra", "Ra was the sun god."], ["Horus", "Horus was the falcon-headed god of the sky and kings."]], x: "Anubis, the jackal-headed god, guided the dead." },
        { p: "What was used to dry out the body?", a: "Natron, a natural salt", w: [["Wax", "Wax was not used to dry bodies."], ["Honey", "Honey is sticky. It does not dry a body."]], x: "Natron is a natural salt that dried the body." },
      ],
      quiz: [
        { p: "Why were bodies preserved?", a: "So the spirit could use the body in the afterlife", w: [["So visitors could look at them", "Mummies were placed in sealed tombs, not displayed."], ["Because bodies could not be buried in the ground", "Many ordinary Egyptians were buried in simple graves in the sand."]], x: "Egyptians believed the body was needed in the afterlife." },
        { p: "Three statements. Which is true?", a: "The heart was left in the body because it was thought to hold a person's thoughts and feelings.", w: [["The heart was removed and thrown away.", "The heart was left in place."], ["Mummification took a single day.", "It took around 70 days."]], x: "The heart stayed in the body.", lineup: true },
        { p: "In the judgement of the dead, what was the heart weighed against?", a: "A feather", w: [["A golden crown", "It was weighed against a feather, the symbol of truth."], ["A stone from a pyramid", "It was a feather, not a stone."]], x: "A feather stood for truth and justice." },
      ],
      check: [
        { p: "Which god ruled the underworld and the dead?", a: "Osiris", w: [["Ra", "Ra was the sun god."], ["Horus", "Horus was the god of the sky and kings."]], x: "Osiris was the god of the afterlife and the dead." },
        { p: "Why were tombs filled with food, tools and treasure?", a: "Egyptians believed the dead would need them in the afterlife", w: [["They paid for the building of the tomb", "The goods were for the dead person to use."], ["They were a gift for the workers", "They were meant for the person in the tomb."]], x: "The goods were for the dead person to use in the afterlife." },
      ],
    },
  ],
  "shaking-ground": [
    {
      id: "safety",
      title: "Living with earthquakes and volcanoes",
      teaser: "How people prepare, stay safe and live near danger.",
      question: "We cannot stop earthquakes or volcanoes. So how do people stay safe where they happen?",
      goals: ["Say what to do during an earthquake", "Explain how buildings and warnings reduce harm", "Explain why millions of people live near volcanoes"],
      hint: "You cannot prevent an earthquake, so think about preparing for one: your actions, buildings and warnings.",
      walk: "People prepare in three ways: knowing what to do (drop, cover and hold on), building safer buildings that can flex, and monitoring for warnings. Volcanoes give warning signs, so people can be moved out. People live near volcanoes because the soil is fertile.",
      summary: [
        "You cannot stop earthquakes or volcanoes, but you can prepare: know what to do, build safely and watch for warning signs.",
        "Many people live near volcanoes because the land is fertile, and volcanoes also provide energy and minerals.",
      ],
      explain: [
        p("Earthquakes and volcanoes cannot be stopped. But people can prepare for them, so that fewer are hurt."),
        h("During an earthquake"),
        p("If you are indoors, drop onto your hands and knees, cover your head and neck (under a sturdy table if you can), and hold on until the shaking stops. This is called Drop, Cover and Hold On. If you are outside, move to an open space away from buildings, trees and power lines. If you are near the coast and the shaking is strong or lasts a long time, move to high ground afterwards in case of a tsunami."),
        tip("Key idea", "Drop, Cover and Hold On. Do not run outside while the ground is shaking."),
        h("Safer buildings"),
        p("Many deaths in earthquakes happen when buildings collapse. Buildings that are designed to flex a little, with steel-reinforced frames, can stay standing. Some stand on special bearings that absorb shaking. Many countries have building rules to make sure new buildings are safe."),
        h("Warnings and monitoring"),
        p("Scientists use instruments called seismometers to record shaking in the ground. They can say where earthquakes are most likely, but they cannot predict exactly when one will happen. Some countries have early warning systems that give a few seconds' notice before strong shaking arrives. Volcanoes give more warning: scientists watch for small earthquakes, swelling ground and changes in gas, so people can be moved out before an eruption."),
        h("Why live near danger?"),
        p("Millions of people live near volcanoes. Volcanic ash makes soil very fertile, so farming is good. Volcanoes can also provide heat for geothermal energy, useful minerals and tourism. People accept the risk and prepare for it."),
      ],
      tryIt: [
        h("Make a safety plan"),
        list(
          "At home or at school, find the safest place to drop, cover and hold on. Which tables or desks are sturdy?",
          "List what an emergency kit needs: water, a torch, a first-aid kit, a radio and any medicines.",
          "Agree a meeting place with your family in case you are apart.",
        ),
        p("Challenge: build two small towers from straws or cards, one with cross-braces and one without. Put them on a tray and shake it gently. Which stays up longer? What does that tell you about building design?"),
      ],
      practice: [
        { p: "What should you do during an earthquake if you are indoors?", a: "Drop, cover and hold on", w: [["Run outside as fast as you can", "Running during shaking is dangerous because objects can fall on you."], ["Stand in a doorway", "Doorways are not safer in modern buildings."]], x: "Drop, cover and hold on until the shaking stops." },
        { p: "Why do some people live near volcanoes?", a: "Volcanic soil is fertile and volcanoes can supply energy", w: [["Volcanoes never erupt", "Volcanoes can erupt, so living nearby involves risk."], ["Nobody lives near volcanoes", "Millions of people do."]], x: "Fertile soil, geothermal energy and minerals draw people to volcanic areas." },
      ],
      quiz: [
        { p: "What do seismometers do?", a: "Record shaking in the ground", w: [["Predict the exact time of an earthquake", "Scientists cannot predict the exact time."], ["Stop earthquakes", "Nothing can stop earthquakes."]], x: "Seismometers measure and record ground shaking." },
        { p: "Three statements. Which is true?", a: "Scientists can watch volcanoes for warning signs such as small quakes and gas changes.", w: [["Scientists can say exactly when an earthquake will happen.", "They can say where quakes are likely, but not exactly when."], ["Earthquakes only happen in summer.", "Earthquakes can happen at any time of year."]], x: "Volcano monitoring helps people leave before an eruption.", lineup: true },
        { p: "Which building feature helps in an earthquake?", a: "A flexible, reinforced frame", w: [["Thick, unreinforced brick walls", "Unreinforced brick can crack and collapse."], ["A heavy roof on weak walls", "A heavy roof on weak walls is dangerous."]], x: "Buildings that flex and are reinforced are less likely to collapse." },
      ],
      check: [
        { p: "Where is it safest to be if you are outside during an earthquake?", a: "In an open space, away from buildings, trees and power lines", w: [["Next to a tall building", "Glass and bricks can fall from tall buildings."], ["Under a tree", "Trees and power lines can fall."]], x: "An open space is safest outdoors." },
        { p: "What does “hold on” mean in Drop, Cover and Hold On?", a: "Hold on to your shelter and stay under cover until the shaking stops", w: [["Hold your breath", "Holding your breath does not keep you safe."], ["Hold a friend's hand and run", "You should stay under cover while it is shaking."]], x: "Hold on to your cover so that it stays with you." },
      ],
    },
  ],
};
