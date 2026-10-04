/*
  Learning goals for the lessons that were written before goals existed. Each goal is something the lesson already teaches.
  Keyed by chapter id, then lesson id.
*/
export const EXISTING_GOALS: Record<string, Record<string, string[]>> = {
  puddle: {
    evaporation: ["Say what evaporation is", "Name what makes evaporation faster", "Explain where a puddle's water goes"],
    condensation: ["Explain how water vapour turns into clouds", "Say why a cold glass gets wet on the outside", "Name the step called condensation"],
    precipitation: ["Name the four kinds of precipitation", "Explain what decides whether rain or snow falls", "Describe how a raindrop forms"],
    collection: ["Describe runoff and groundwater", "Say where fallen water ends up", "Follow a raindrop on its journey back to the sea"],
    cycle: ["Name the four steps of the water cycle", "Put the steps in order", "Explain why the water cycle keeps going"],
  },
  fractions: {
    "what-is": ["Say what the top and bottom numbers mean", "Read a fraction as parts of a whole", "Explain why the parts must be equal"],
    equivalent: ["Spot fractions that are the same size", "Make an equivalent fraction by multiplying or dividing the top and bottom", "Simplify a fraction"],
    compare: ["Decide which of two fractions is larger", "Put a set of fractions in order", "Use equal bottom numbers to compare"],
    add: ["Add fractions that have the same bottom number", "Say why the bottom number stays the same", "Simplify an answer"],
  },
  "solar-system": {
    sun: ["Explain why the Sun is the centre of our solar system", "Say what the Sun is made of", "Explain what keeps the planets in orbit"],
    rocky: ["Name the four rocky planets in order from the Sun", "Describe one thing that makes each one different", "Explain why Venus is so hot"],
    giants: ["Tell gas giants and ice giants apart", "Name the giant planets", "Describe their rings and storms"],
    small: ["Say what moons, asteroids and comets are", "Say what each one travels around", "Tell them apart"],
  },
  "ancient-egypt": {
    nile: ["Explain why the Nile mattered so much", "Describe the farming year", "Say how people used the river"],
    pharaohs: ["Say who the pharaohs were", "Describe what a pharaoh did", "Name some famous pharaohs"],
    writing: ["Explain how hieroglyphs work", "Read a few hieroglyphs", "Say why writing mattered in Egypt"],
    pyramids: ["Say why the pyramids were built", "Describe how huge stones were moved and lifted", "Explain who built them"],
  },
  "shaking-ground": {
    layers: ["Name the layers of the Earth in order", "Describe what each layer is like", "Put the layers in order from the surface to the centre"],
    plates: ["Explain what tectonic plates are", "Say what happens where plates meet", "Match a plate boundary to what it creates"],
    quakes: ["Explain what causes an earthquake", "Say what the focus and epicentre are", "Describe how to stay safe"],
    volcanoes: ["Follow magma from deep underground to an eruption", "Name the parts of a volcano", "Tell magma and lava apart"],
  },
};
