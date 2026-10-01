import type { VerdictQuestion } from "@/lib/types";

/* Final tests for the maths, space, history and geography cases. Two questions per clue, no hints. */

type Opt = [id: string, text: string, why?: string];
const q = (
  id: string,
  clueId: string,
  prompt: string,
  options: Opt[],
  correctId: string,
  evidenceId: string,
  explanation: string,
  type: "choice" | "lineup" = "choice",
): VerdictQuestion => ({
  id,
  clueId,
  type,
  prompt,
  options: options.map(([oid, text, why]) => (why ? { id: oid, text, why } : { id: oid, text })),
  correctId,
  evidenceId,
  explanation,
});

export const FRACTIONS_VERDICT: VerdictQuestion[] = [
  q("v-fw-1", "what-is", "A cake is cut into 10 equal pieces and 3 are eaten. What fraction is left?", [["a", "3/10", "That is the part that was eaten."], ["b", "7/10"], ["c", "10/7", "The bottom number is the 10 pieces in the whole cake."]], "b", "intro", "7 of the 10 pieces are left: 7/10."),
  q("v-fw-2", "what-is", "In 2/5, what does the 5 tell you?", [["a", "How many parts you have", "That is the 2."], ["b", "How many equal parts make the whole"], ["c", "How many parts are left over", "That would be 5 minus 2."]], "b", "intro", "The denominator, 5, is the number of equal parts in the whole."),
  q("v-fe-1", "equivalent", "Which fraction is equal to 3/4?", [["a", "6/8"], ["b", "3/8", "That is half of 3/4."], ["c", "4/3", "That is more than one whole."]], "a", "same-size", "Multiply the top and bottom by 2: 3/4 = 6/8."),
  q("v-fe-2", "equivalent", "Simplify 10/15.", [["a", "2/3"], ["b", "1/5", "Divide the top and the bottom by the same number, 5."], ["c", "5/10", "Divide both numbers by the same thing."]], "a", "same-size", "Divide both by 5: 10/15 = 2/3."),
  q("v-fc-1", "compare", "Which is bigger, 2/3 or 3/6?", [["a", "2/3"], ["b", "3/6", "3/6 is a half. 2/3 is 4/6."], ["c", "They are equal", "Write 2/3 as sixths: 4/6."]], "a", "compare-intro", "2/3 = 4/6, which is more than 3/6."),
  q("v-fc-2", "compare", "Pick the true idea.", [["a", "1/9 is bigger than 1/4 because 9 is bigger.", "More pieces means smaller pieces."], ["b", "1/4 is bigger than 1/9."], ["c", "Fractions with different bottoms cannot be compared.", "Make the bottoms match, then compare."]], "b", "compare-intro", "Quarters are bigger pieces than ninths, so 1/4 is bigger.", "lineup"),
  q("v-fa-1", "add", "3/10 + 4/10 = ?", [["a", "7/20", "Keep the bottom number: the pieces are still tenths."], ["b", "7/10"], ["c", "12/10", "Add the tops, do not multiply them."]], "b", "add-intro", "Add the tops and keep the bottom: 7/10."),
  q("v-fa-2", "add", "1/4 + 1/4, simplified, is:", [["a", "1/2"], ["b", "2/8", "The pieces are still quarters. 2/4 simplifies to 1/2."], ["c", "1/8", "Adding makes the amount bigger, not smaller."]], "a", "add-intro", "1/4 + 1/4 = 2/4, which simplifies to 1/2."),
];

export const SOLAR_VERDICT: VerdictQuestion[] = [
  q("v-ss-1", "sun", "What keeps the planets travelling around the Sun?", [["a", "The Sun's gravity"], ["b", "Wind in space", "Space has no air, so there is no wind."], ["c", "Magnetism", "Gravity holds the planets, not magnets."]], "a", "sun-intro", "The Sun's gravity keeps the planets in orbit."),
  q("v-ss-2", "sun", "Which statement about the Sun is true?", [["a", "The Sun is a planet.", "Planets do not make light. The Sun is a star."], ["b", "The Sun is a star made of hot gas."], ["c", "The Sun travels around the Earth.", "The Earth travels around the Sun."]], "b", "sun-intro", "The Sun is a star: a huge ball of hot gas.", "lineup"),
  q("v-sr-1", "rocky", "Why is Venus hotter than Mercury?", [["a", "Its thick atmosphere traps heat"], ["b", "It is closer to the Sun", "Mercury is closer."], ["c", "It has volcanoes erupting all the time", "The heat comes from its thick blanket of air."]], "a", "rocky-intro", "Venus's thick atmosphere traps heat like a blanket."),
  q("v-sr-2", "rocky", "Which planet is red because of rusty iron?", [["a", "Venus", "Venus is covered in pale clouds."], ["b", "Mars"], ["c", "Mercury", "Mercury is grey and cratered."]], "b", "rocky-intro", "Mars, the red planet."),
  q("v-sg-1", "giants", "Which two planets are gas giants?", [["a", "Jupiter and Saturn"], ["b", "Uranus and Neptune", "Those are ice giants."], ["c", "Earth and Mars", "Those are rocky planets."]], "a", "giants-intro", "Jupiter and Saturn are the gas giants."),
  q("v-sg-2", "giants", "Pick the true idea about the giant planets.", [["a", "You could land on Saturn's surface.", "Saturn has no solid surface."], ["b", "Only Saturn has rings.", "All four giant planets have rings, Saturn's are just the brightest."], ["c", "All four have rings and many moons."]], "c", "giants-intro", "All four giant planets have rings and many moons.", "lineup"),
  q("v-sm-1", "small", "An icy object with a tail pointing away from the Sun is a...", [["a", "Comet"], ["b", "Asteroid", "Asteroids are rocky, with no tail."], ["c", "Moon", "Moons orbit planets."]], "a", "small-intro", "A comet."),
  q("v-sm-2", "small", "What is the main difference between a moon and an asteroid?", [["a", "A moon orbits a planet, an asteroid orbits the Sun"], ["b", "Moons are always bigger", "Some asteroids are bigger than some moons."], ["c", "Asteroids make their own light", "Neither makes light."]], "a", "small-intro", "Moons orbit planets. Asteroids orbit the Sun."),
];

export const EGYPT_VERDICT: VerdictQuestion[] = [
  q("v-en-1", "nile", "What did the Nile's yearly flood leave on the fields?", [["a", "Rich black silt"], ["b", "Salt", "The flood brought fertile mud, not salt."], ["c", "Sand from the desert", "It left dark, fertile silt."]], "a", "nile-intro", "Rich black silt, perfect for crops."),
  q("v-en-2", "nile", "Pick the true idea.", [["a", "It rained a lot in Egypt.", "Egypt hardly gets rain. The flood water came from the south."], ["b", "Farming in Egypt depended on the Nile's flood."], ["c", "Egyptians lived far from the river to stay safe.", "Almost everyone lived beside it."]], "b", "nile-intro", "Farming depended on the yearly flood.", "lineup"),
  q("v-ep-1", "pharaohs", "Why did Egyptians obey the pharaoh?", [["a", "They believed the pharaoh linked people and gods"], ["b", "The pharaoh won an election", "There were no elections."], ["c", "The pharaoh was the oldest person", "Some pharaohs were children."]], "a", "pharaoh-intro", "The pharaoh was seen as the link between the gods and the people."),
  q("v-ep-2", "pharaohs", "Which pharaoh was a woman?", [["a", "Khufu", "Khufu built the Great Pyramid."], ["b", "Hatshepsut"], ["c", "Tutankhamun", "He was a boy king."]], "b", "pharaoh-intro", "Hatshepsut ruled as pharaoh."),
  q("v-ew-1", "writing", "What helped experts finally read hieroglyphs?", [["a", "The Rosetta Stone"], ["b", "A pharaoh's diary", "It was a stone with the same text in three scripts."], ["c", "Tutankhamun's tomb", "That was found 100 years after the code was cracked."]], "a", "glyph-intro", "The Rosetta Stone had the same message in Greek and hieroglyphs."),
  q("v-ew-2", "writing", "Pick the true idea about hieroglyphs.", [["a", "Some signs stand for sounds, not things."], ["b", "There were exactly 26 signs.", "There were more than 700."], ["c", "Everyone in Egypt could read them.", "Only trained scribes could."]], "a", "glyph-intro", "Hieroglyphs mix picture signs and sound signs.", "lineup"),
  q("v-ey-1", "pyramids", "What was a pyramid built for?", [["a", "A pharaoh's tomb"], ["b", "Storing grain", "That is an old myth."], ["c", "A royal palace", "Pharaohs lived in palaces. Pyramids were tombs."]], "a", "pyramid-intro", "A tomb for a pharaoh."),
  q("v-ey-2", "pyramids", "How were the huge blocks moved?", [["a", "On wooden sledges over wet sand and up ramps"], ["b", "With cranes and engines", "There were no machines like that."], ["c", "They were carried by one strong worker each", "Each block weighed more than a car."]], "a", "pyramid-intro", "Sledges, wet sand, ramps and big teams of workers."),
];

export const EARTH_VERDICT: VerdictQuestion[] = [
  q("v-gl-1", "layers", "Which is the correct order from the surface to the centre?", [["a", "Crust, mantle, outer core, inner core"], ["b", "Mantle, crust, core", "The crust is on the outside."], ["c", "Core, mantle, crust", "That is from the centre outwards."]], "a", "layers-intro", "Crust, mantle, outer core, inner core."),
  q("v-gl-2", "layers", "Why is the inner core solid even though it is so hot?", [["a", "It is squeezed by huge pressure"], ["b", "It is actually cold", "It is around 5,500°C."], ["c", "It is made of ice", "It is iron and nickel."]], "a", "layers-intro", "The pressure is so great the metal cannot melt."),
  q("v-gp-1", "plates", "What carries the tectonic plates along?", [["a", "The slowly flowing mantle"], ["b", "Ocean waves", "Waves cannot move solid crust."], ["c", "Wind", "Wind has no effect on the plates."]], "a", "plates-intro", "The mantle beneath slowly carries the plates."),
  q("v-gp-2", "plates", "Pick the true idea.", [["a", "Plates pushing together can build mountains."], ["b", "Plates move several metres a day.", "Only a few centimetres a year."], ["c", "The crust is one solid piece.", "It is broken into about 15 plates."]], "a", "plates-intro", "The Himalayas formed where two plates push together.", "lineup"),
  q("v-gq-1", "quakes", "What happens just before an earthquake?", [["a", "Stuck plates suddenly slip"], ["b", "The core cools down", "Earthquakes start near the surface, where plates meet."], ["c", "Heavy rain soaks the ground", "Weather does not cause earthquakes."]], "a", "quake-intro", "Strain builds, then the rock slips."),
  q("v-gq-2", "quakes", "The point on the surface above where the rock slipped is the...", [["a", "Epicentre"], ["b", "Focus", "The focus is underground."], ["c", "Crater", "That is the top of a volcano."]], "a", "quake-intro", "The epicentre."),
  q("v-gv-1", "volcanoes", "Melted rock underground is called...", [["a", "Magma"], ["b", "Lava", "It is called lava once it reaches the surface."], ["c", "Ash", "Ash is tiny bits of rock blown into the air."]], "a", "volcano-intro", "Magma."),
  q("v-gv-2", "volcanoes", "Pick the true idea about volcanoes.", [["a", "Magma rises because it is lighter than solid rock."], ["b", "Volcanoes only happen in hot countries.", "Iceland has many active volcanoes."], ["c", "Volcanic soil is useless for farming.", "Volcanic soil is very rich."]], "a", "volcano-intro", "Lighter magma floats upwards.", "lineup"),
];
