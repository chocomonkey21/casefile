import type { ClueContent } from "@/lib/types";

/*
  The Case of the Vanishing Puddle: full lesson content.
  Each clue has: one central question (hints are about this), evidence content
  (keyed by the evidence ids in data/cases.ts), a full explanation and the
  Interrogation Room questions.
*/

export const PUDDLE_LESSONS: Record<string, ClueContent> = {
  /* ------------------------------------------------------------------ */
  evaporation: {
    question: "Where did the puddle go?",
    hints: {
      nudge: "Water can't just vanish. Ask yourself: if it is not on the ground any more, where else could it be?",
      evidenceId: "sun-job",
      evidenceNote: "The answer is in the reading called “How the sun makes water evaporate”. Look for what the sun does to the water.",
      walkthrough:
        "The sun warmed the puddle. Warm water has fast-moving bits, and the ones at the surface escape into the air as a gas called water vapour. You can't see water vapour, so the puddle seems to vanish.",
    },
    explanation: [
      "The puddle didn't vanish. The sun heated the water, and the water turned into an invisible gas called water vapour. That is called evaporation.",
      "The water is still around. It just moved from the ground into the air.",
    ],
    evidence: {
      "sun-job": {
        kind: "reading",
        blocks: [
          {
            type: "p",
            text: "A puddle is just water sitting on the ground. But water is never really still. It is made of tiny bits called molecules, and they are always jiggling around.",
          },
          {
            type: "p",
            text: "When the sun warms a puddle, the molecules jiggle faster. The ones at the top get so much energy that they break free and float off into the air. You can't see them, because they have turned into a gas called water vapour.",
          },
          {
            type: "tip",
            title: "Key idea",
            text: "Evaporation is when liquid water turns into water vapour, a gas. It happens at the surface of the water.",
          },
          { type: "h", text: "What makes it faster?" },
          {
            type: "list",
            items: [
              "Heat. A sunny day dries a puddle much faster than a cold one.",
              "Wind. It carries the vapour away, so more water can escape.",
              "A big surface. A wide, flat puddle dries faster than a deep bucket.",
            ],
          },
          {
            type: "p",
            text: "Notice something? The puddle didn't really vanish. The water just changed shape and moved. Hold on to that idea, because it is the key to the whole case.",
          },
        ],
      },
      "evap-close": {
        kind: "diagram",
        diagramId: "evap-close",
        caption: "Evaporation up close. Warm water molecules near the top escape as water vapour.",
        alt: "A close-up of a puddle. Water molecules inside the puddle move around. Near the surface, a few molecules speed up and leave the water, drifting upward as water vapour.",
        notice: [
          "Molecules inside the water stay in the liquid.",
          "Only molecules at the surface can escape.",
          "The escaped molecules are water vapour, an invisible gas.",
        ],
      },
      "puddle-shrink": {
        kind: "video",
        explainer: "puddle",
        steps: [
          "9 am. The puddle is big and the sun is just coming up.",
          "12 noon. The sun is high. The water is warm and the puddle is getting smaller.",
          "3 pm. There is hardly any puddle left. The water has gone into the air as vapour.",
          "Later. The ground is dry. The water didn't vanish. It moved into the air, where we can't see it.",
        ],
      },
    },
    quiz: [
      {
        id: "evap-1",
        type: "lineup",
        prompt: "The puddle by the gate is gone. Four ideas are shown below. Only one is correct. The others are common mistakes. Which idea is correct?",
        options: [
          { id: "a", text: "The sun destroyed the water.", why: "Water can't be destroyed. It can change form or move, but it doesn't just stop existing." },
          { id: "b", text: "The ground drank it all up, like a sponge.", why: "A paved playground doesn't soak up water. Most of this puddle went somewhere else." },
          { id: "c", text: "The water turned into a gas and floated into the air.", },
          { id: "d", text: "The wind blew all the liquid water away.", why: "Wind helps, because it carries vapour away. But it doesn't blow a whole puddle off the ground." },
        ],
        correctId: "c",
        hint: "Think about what heat does to water. What does the sun do to the puddle?",
        evidenceId: "sun-job",
        walkthrough: "The sun warms the water. The water turns into a gas called water vapour, which is invisible. So the puddle seems to vanish, but the water is in the air.",
        explanation: "The puddle evaporated. The sun's heat turned the liquid water into water vapour, an invisible gas that mixes into the air.",
      },
      {
        id: "evap-2",
        type: "choice",
        prompt: "Which day would dry a puddle the fastest?",
        options: [
          { id: "a", text: "Cold, cloudy and still", why: "Cold and still air is the slowest at drying things. There is little heat and no wind." },
          { id: "b", text: "Cool and rainy", why: "Rain adds water. That's the opposite of drying." },
          { id: "c", text: "Warm, sunny and windy" },
          { id: "d", text: "Cold and foggy", why: "Fog means the air is already full of water, so there is less room for more." },
        ],
        correctId: "c",
        hint: "Heat and wind both help. Which day has both?",
        evidenceId: "sun-job",
        walkthrough: "Heat makes the water molecules move faster so they escape. Wind carries the vapour away so more can follow. Warm, sunny and windy has both.",
        explanation: "Heat speeds up evaporation and wind carries the vapour away. A warm, sunny, windy day is the best drying day.",
      },
      {
        id: "evap-3",
        type: "choice",
        prompt: "Which of these is an example of evaporation?",
        options: [
          { id: "a", text: "Ice cream melting on a hot day", why: "That's melting: solid turning into liquid. Evaporation is liquid turning into gas." },
          { id: "b", text: "A wet towel drying on a washing line" },
          { id: "c", text: "Drops forming on a cold drink can", why: "That's the opposite: gas turning back into liquid. You'll meet it in the next clue." },
          { id: "d", text: "A puddle freezing in winter", why: "That's freezing: liquid turning into solid." },
        ],
        correctId: "b",
        hint: "Evaporation turns a liquid into a gas. Look for the option where liquid water ends up in the air.",
        evidenceId: "evap-close",
        walkthrough: "A wet towel holds liquid water. As it dries, that water turns into vapour and goes into the air. That's evaporation. The other options are melting, freezing and something you haven't met yet.",
        explanation: "A drying towel is evaporation. The liquid water in the towel turns into vapour and floats away.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  condensation: {
    question: "How does invisible water vapour turn into a cloud?",
    hints: {
      nudge: "Think about what happens to a warm gas when it gets cold. The higher you go, the colder it gets.",
      evidenceId: "why-clouds",
      evidenceNote: "Check the reading “How clouds form”. Look for what happens when vapour cools down.",
      walkthrough:
        "Water vapour rises high into the sky where the air is cold. The cold makes the vapour turn back into tiny drops of liquid water. Billions of those tiny drops together make a cloud.",
    },
    explanation: [
      "High in the sky it is cold. When water vapour cools, it turns back into tiny drops of liquid water. That is called condensation.",
      "One drop is too small to see. Billions of them together make a cloud.",
    ],
    evidence: {
      "why-clouds": {
        kind: "reading",
        blocks: [
          {
            type: "p",
            text: "Water vapour floats up into the sky. High up, the air is much colder than it is on the ground. So what happens to a warm gas when it gets cold? It slows down and clumps back into tiny drops of liquid water.",
          },
          {
            type: "tip",
            title: "Key idea",
            text: "Condensation is when water vapour cools down and turns back into liquid water.",
          },
          {
            type: "p",
            text: "Each drop is tiny. The vapour needs something to cling to, like a speck of dust or a grain of salt. Billions of tiny drops gathered together make a cloud.",
          },
          {
            type: "p",
            text: "So a cloud is not made of gas. It is made of tiny floating drops of water, or tiny ice crystals if it is really cold. That's why clouds look white and fluffy.",
          },
        ],
      },
      "cold-glass": {
        kind: "diagram",
        diagramId: "cold-glass",
        caption: "Why a cold drink gets wet on the outside.",
        alt: "A glass of cold water. Tiny arrows show water vapour from the air touching the cold outside of the glass and turning into drops of liquid water.",
        notice: [
          "The water vapour comes from the air around the glass, not from inside it.",
          "The cold glass cools the vapour, so it turns into drops.",
          "This is condensation, the same thing that makes clouds.",
        ],
      },
      "cloud-spotter": {
        kind: "practice",
        intro: "Condensation is hiding all around you. Try these three. They are just for practice, so no pressure.",
        questions: [
          {
            id: "spot-1",
            type: "choice",
            prompt: "You breathe on a cold window and it fogs up. What is happening?",
            options: [
              { id: "a", text: "Condensation", },
              { id: "b", text: "Evaporation", why: "Evaporation is liquid turning into gas. Here the gas from your breath is turning into tiny drops." },
              { id: "c", text: "Melting", why: "Melting is solid turning into liquid. There's no ice here." },
            ],
            correctId: "a",
            hint: "Your breath has water vapour in it. What does the cold glass do to it?",
            walkthrough: "Your breath is warm and full of water vapour. The cold glass cools it, so it turns into tiny drops of water. That's condensation.",
            explanation: "Warm vapour from your breath touches the cold glass and condenses into tiny drops.",
          },
          {
            id: "spot-2",
            type: "choice",
            prompt: "Drops form on the outside of a cold glass of juice. Where did that water come from?",
            options: [
              { id: "a", text: "It leaked through the glass from the juice", why: "Glass is solid and doesn't let liquid through. The water came from somewhere else." },
              { id: "b", text: "It came from water vapour in the air" },
              { id: "c", text: "The glass was already wet", why: "The glass can start dry and still get covered in drops." },
            ],
            correctId: "b",
            hint: "Look at the diagram called “Why a cold glass gets wet”.",
            evidenceId: "cold-glass",
            walkthrough: "There is always some water vapour in the air. When it touches the cold glass it cools down and turns into drops.",
            explanation: "The water comes from vapour in the air, which condenses on the cold glass.",
          },
          {
            id: "spot-3",
            type: "choice",
            prompt: "A bathroom mirror goes steamy in a hot shower. The steam is on the mirror as tiny drops. Later the mirror goes clear again. What turned the drops back into gas?",
            options: [
              { id: "a", text: "Evaporation" },
              { id: "b", text: "Condensation", why: "Condensation made the drops in the first place. Turning them back into gas is the opposite." },
              { id: "c", text: "Freezing", why: "Freezing needs very low temperatures." },
            ],
            correctId: "a",
            hint: "Liquid drops turning back into gas. Which word did you learn in clue 1?",
            walkthrough: "The drops are liquid. When the mirror warms up again they turn into gas, and that's evaporation.",
            explanation: "The drops evaporate as the room warms up, and the mirror clears.",
          },
        ],
      },
    },
    quiz: [
      {
        id: "cond-1",
        type: "choice",
        prompt: "What is a cloud made of?",
        options: [
          { id: "a", text: "Water vapour, the invisible gas", why: "Water vapour is invisible. You can see clouds, so they must be made of something else." },
          { id: "b", text: "Tiny drops of liquid water or tiny ice crystals" },
          { id: "c", text: "Smoke from chimneys far away", why: "Smoke isn't water. Clouds are made of water." },
          { id: "d", text: "Fluffy white gas", why: "Clouds look like fluffy gas, but they are made of lots of tiny drops." },
        ],
        correctId: "b",
        hint: "You can see clouds. Could an invisible gas be the thing you are seeing?",
        evidenceId: "why-clouds",
        walkthrough: "Water vapour is invisible. When it cools it turns back into liquid. Those tiny drops (or ice crystals) catch the light, and that's the cloud you see.",
        explanation: "Clouds are made of billions of tiny water drops or ice crystals, not gas.",
      },
      {
        id: "cond-2",
        type: "lineup",
        prompt: "Why does water vapour turn into a cloud high in the sky? Pick the idea that is true.",
        options: [
          { id: "a", text: "The sun heats the vapour even more until it turns white.", why: "More heat would keep it as a gas. Clouds form when the vapour cools down." },
          { id: "b", text: "The vapour cools down and condenses into tiny drops." },
          { id: "c", text: "The vapour gets squashed flat by the wind.", why: "Wind moves air around, but it doesn't turn a gas into a liquid. Cooling does." },
          { id: "d", text: "The vapour mixes with smoke and gets heavy.", why: "Clouds don't need smoke. They form from water vapour cooling." },
        ],
        correctId: "b",
        hint: "It is much colder high up in the sky. What does cold do to a gas like water vapour?",
        evidenceId: "why-clouds",
        walkthrough: "High in the sky the air is cold. Cold makes water vapour turn back into liquid drops. That is condensation, and lots of tiny drops together make a cloud.",
        explanation: "Cooling is what turns vapour into a cloud. The vapour condenses into tiny drops.",
      },
      {
        id: "cond-3",
        type: "choice",
        prompt: "Which of these is condensation?",
        options: [
          { id: "a", text: "A puddle slowly shrinking", why: "That's evaporation: liquid to gas." },
          { id: "b", text: "Drops forming on the outside of a cold can" },
          { id: "c", text: "An ice cube melting in your hand", why: "That's melting: solid to liquid." },
          { id: "d", text: "Clothes drying on a line", why: "That's evaporation: liquid to gas." },
        ],
        correctId: "b",
        hint: "Condensation turns a gas into a liquid. Which option ends with new drops of water?",
        evidenceId: "cold-glass",
        walkthrough: "On a cold can, water vapour from the air touches the cold surface and turns into liquid drops. Gas to liquid is condensation.",
        explanation: "Drops on a cold can are condensation. Vapour from the air cools and turns into liquid.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  precipitation: {
    question: "What are the different ways water falls from the sky?",
    hints: {
      nudge: "Rain is only one way. What else can fall from a cloud when it gets very cold?",
      evidenceId: "rain-snow",
      evidenceNote: "Read “Rain, snow, sleet and hail”. Each one has a different temperature story.",
      walkthrough:
        "Tiny drops in a cloud join up until they are too heavy to float, and then they fall. What falls depends on the temperature: liquid rain if it is warm enough, snow if it stays frozen, sleet if rain freezes on the way down, and hail if ice gets tossed up and down in a storm cloud.",
    },
    explanation: [
      "Anything that falls from a cloud is called precipitation. The four main kinds are rain, snow, sleet and hail.",
      "Which one you get depends on the temperature in the cloud and all the way down to the ground.",
    ],
    evidence: {
      "rain-snow": {
        kind: "reading",
        blocks: [
          {
            type: "p",
            text: "Inside a cloud, tiny drops bump into each other and join up. They grow bigger and heavier. When they get too heavy to float, they fall. Anything that falls from a cloud is called precipitation.",
          },
          { type: "h", text: "Four kinds" },
          {
            type: "list",
            items: [
              "Rain: liquid drops. It falls when the air is warm enough all the way down.",
              "Snow: ice crystals that stay frozen all the way down.",
              "Sleet: rain that freezes into small ice pellets on the way down.",
              "Hail: lumps of ice that grow as strong winds toss them up and down inside a storm cloud.",
            ],
          },
          {
            type: "tip",
            title: "The temperature is the clue",
            text: "The temperature at different heights decides which kind of precipitation reaches the ground.",
          },
        ],
      },
      "inside-drop": {
        kind: "video",
        explainer: "drop",
        steps: [
          "A cloud is full of tiny drops. They are far too light to fall.",
          "The drops bump into each other and join together.",
          "Now the drop is big and heavy. Gravity starts to pull it down.",
          "It falls as rain. One raindrop holds around a million cloud droplets.",
        ],
      },
      "four-types": {
        kind: "diagram",
        diagramId: "four-types",
        caption: "Four types of precipitation, and the temperatures that make them.",
        alt: "Four panels side by side. Rain: a warm cloud with liquid drops. Snow: a cold cloud with snowflakes. Sleet: a cloud where rain passes through a cold layer and becomes small ice pellets. Hail: a storm cloud with a ball of ice.",
        notice: [
          "Rain and snow are the simple ones: warm stays liquid, cold stays frozen.",
          "Sleet needs a cold layer near the ground.",
          "Hail grows in layers inside a big storm cloud.",
        ],
      },
    },
    quiz: [
      {
        id: "prec-1",
        type: "choice",
        prompt: "What is precipitation?",
        options: [
          { id: "a", text: "Only rain", why: "Rain is one kind, but snow, sleet and hail count too." },
          { id: "b", text: "Any water that falls from clouds" },
          { id: "c", text: "Water vapour rising into the sky", why: "That's evaporation going up. Precipitation is water coming down." },
          { id: "d", text: "Water collecting in a river", why: "That's collection, the next clue." },
        ],
        correctId: "b",
        hint: "The word covers more than just rain. Think about everything that can fall from a cloud.",
        evidenceId: "rain-snow",
        walkthrough: "Precipitation means any water that falls from clouds, in any form. That includes liquid rain and frozen snow, sleet and hail.",
        explanation: "Precipitation is any water falling from clouds: rain, snow, sleet or hail.",
      },
      {
        id: "prec-2",
        type: "lineup",
        prompt: "Which idea about snow is true?",
        options: [
          { id: "a", text: "Snow is just frozen raindrops.", why: "Frozen raindrops are sleet. Snow forms as ice crystals that stay frozen." },
          { id: "b", text: "Snow is a kind of cloud that fell down.", why: "Clouds don't fall. Drops and crystals inside them do." },
          { id: "c", text: "Snow is made when rain passes through a cold layer near the ground.", why: "That makes sleet, small ice pellets." },
          { id: "d", text: "Snow forms as ice crystals inside very cold clouds." },
        ],
        correctId: "d",
        hint: "Look at how snow is different from sleet. Where does each one freeze?",
        evidenceId: "rain-snow",
        walkthrough: "Snow forms as ice crystals inside clouds that are below freezing, and the crystals stay frozen all the way down. Sleet is different: it starts as rain and freezes on the way.",
        explanation: "Snow forms high up as ice crystals and stays frozen. Frozen raindrops are sleet.",
      },
      {
        id: "prec-3",
        type: "choice",
        prompt: "It is freezing inside the cloud and freezing all the way down to the ground. What falls?",
        options: [
          { id: "a", text: "Rain", why: "Rain is liquid. With freezing air all the way down, it would freeze." },
          { id: "b", text: "Fog", why: "Fog sits near the ground, it doesn't fall from clouds." },
          { id: "c", text: "Snow" },
          { id: "d", text: "Hail", why: "Hail needs strong storm winds that toss ice up and down, not just cold air." },
        ],
        correctId: "c",
        hint: "If it stays below freezing the whole way, will the water ever melt?",
        evidenceId: "four-types",
        walkthrough: "Ice crystals form in the freezing cloud. Nothing warms them on the way down, so they stay frozen and arrive as snow.",
        explanation: "Freezing all the way down means the ice crystals never melt, so you get snow.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  collection: {
    question: "Where does rain go once it lands?",
    hints: {
      nudge: "Rain lands on all kinds of ground. Think about hills, soil and the sea. Where could the water go from each?",
      evidenceId: "rivers-lakes",
      evidenceNote: "Open “Rivers, lakes and underground water”. It lists the main routes the water takes.",
      walkthrough:
        "Some rain runs over the ground downhill into streams and rivers (runoff). Some soaks into the soil and becomes groundwater. A lot of it ends up in lakes and the sea. All of this gathering together is called collection.",
    },
    explanation: [
      "When precipitation lands, the water keeps moving. Some of it runs downhill into rivers, some soaks into the ground, and a lot ends up in the ocean.",
      "That gathering of water is called collection. From there, the sun can start evaporating it again.",
    ],
    evidence: {
      "rivers-lakes": {
        kind: "reading",
        blocks: [
          {
            type: "p",
            text: "When precipitation reaches the ground, the water doesn't stop. It keeps moving. This part of the journey is called collection.",
          },
          {
            type: "list",
            items: [
              "Runoff: water that flows over the ground, downhill, into streams and rivers.",
              "Infiltration: water that soaks down into the soil. Some of it becomes groundwater, stored in tiny gaps and cracks in rock.",
              "Lakes, rivers and oceans: where a lot of the water ends up. Most of Earth's water is in the oceans.",
            ],
          },
          {
            type: "p",
            text: "Rivers nearly always flow downhill towards the sea. On the way, the sun keeps evaporating water from the surface. Plants also release water vapour from their leaves, which adds even more to the air.",
          },
          {
            type: "tip",
            title: "Nothing gets used up",
            text: "Water isn't lost. It just gets collected somewhere new, ready to start the journey again.",
          },
        ],
      },
      "where-rain-goes": {
        kind: "diagram",
        diagramId: "where-rain-goes",
        caption: "Follow one raindrop down a hillside.",
        alt: "A hillside seen from the side. Rain falls on the hill. Some water runs down the surface into a river, which flows into the sea. Some water soaks into the ground and becomes groundwater, which slowly moves toward the river.",
        notice: [
          "Runoff flows on top of the ground.",
          "Groundwater moves slowly underground.",
          "Both end up in rivers, lakes or the sea.",
        ],
      },
      "follow-drop": {
        kind: "practice",
        intro: "Where does each raindrop go? Try these three. They are just for practice.",
        questions: [
          {
            id: "drop-1",
            type: "choice",
            prompt: "A raindrop lands on a steep hillside of bare rock. Where does it most likely go?",
            options: [
              { id: "a", text: "It runs downhill into a stream" },
              { id: "b", text: "It soaks deep into the rock", why: "Bare rock doesn't soak up much water, so most of it runs off." },
              { id: "c", text: "It rises straight back into the sky", why: "Some could evaporate later, but first the drop runs downhill." },
            ],
            correctId: "a",
            hint: "Bare rock doesn't soak up water. What does gravity do to water on a slope?",
            walkthrough: "Water can't soak into bare rock very well, and gravity pulls it downhill. So it runs off into a stream.",
            explanation: "It runs off downhill, which is called runoff.",
          },
          {
            id: "drop-2",
            type: "choice",
            prompt: "A raindrop lands on a flat, grassy field with soft soil. What will probably happen?",
            options: [
              { id: "a", text: "It soaks into the ground" },
              { id: "b", text: "It races off over the top of the grass", why: "Flat ground and soft soil mean most of the water soaks in." },
              { id: "c", text: "It stays as a drop forever", why: "Drops don't last forever. They soak in or evaporate." },
            ],
            correctId: "a",
            hint: "Soft soil has lots of tiny gaps. What can water do with gaps?",
            walkthrough: "Soil is full of tiny gaps. On flat ground, the water has time to sink down into them. That's infiltration.",
            explanation: "Soft soil soaks the water up. This is called infiltration.",
          },
          {
            id: "drop-3",
            type: "choice",
            prompt: "A raindrop lands right in the ocean. What happens to it next?",
            options: [
              { id: "a", text: "It joins the sea until the sun evaporates it again" },
              { id: "b", text: "It vanishes", why: "Water never vanishes. It becomes part of the sea." },
              { id: "c", text: "It turns into salt", why: "The sea is salty, but the water itself doesn't turn into salt." },
            ],
            correctId: "a",
            hint: "It is already where lots of water ends up. What could start it moving again?",
            walkthrough: "The raindrop joins the ocean. Later the sun warms the surface, and some water evaporates. The loop starts again.",
            explanation: "It joins the ocean and may evaporate again later.",
          },
        ],
      },
    },
    quiz: [
      {
        id: "coll-1",
        type: "choice",
        prompt: "What is runoff?",
        options: [
          { id: "a", text: "Water soaking down into soil", why: "That's infiltration." },
          { id: "b", text: "Water flowing over the ground and downhill" },
          { id: "c", text: "Water vapour rising into the air", why: "That's evaporation." },
          { id: "d", text: "Ice melting inside a cloud", why: "Runoff happens on the ground, not in clouds." },
        ],
        correctId: "b",
        hint: "The word gives it away. Water that 'runs off' from where it landed.",
        evidenceId: "rivers-lakes",
        walkthrough: "Runoff is rain that doesn't soak in. It runs over the surface, downhill, into streams and rivers.",
        explanation: "Runoff is water flowing over the ground, downhill, towards streams and rivers.",
      },
      {
        id: "coll-2",
        type: "choice",
        prompt: "Where is most of Earth's water found?",
        options: [
          { id: "a", text: "In rivers", why: "Rivers carry a lot of water, but far less than the oceans." },
          { id: "b", text: "In lakes", why: "Lakes hold a small share of Earth's water." },
          { id: "c", text: "In the oceans" },
          { id: "d", text: "In clouds", why: "Clouds hold only a tiny amount at any moment." },
        ],
        correctId: "c",
        hint: "Think about how much of the Earth's surface is covered by sea.",
        evidenceId: "rivers-lakes",
        walkthrough: "Oceans cover most of the planet, and they hold most of Earth's water.",
        explanation: "Most of Earth's water is in the oceans.",
      },
      {
        id: "coll-3",
        type: "lineup",
        prompt: "Which idea about water is true?",
        options: [
          { id: "a", text: "Water gets used up, so there is a bit less on Earth every year.", why: "Water isn't used up. It moves around and changes form." },
          { id: "b", text: "All rain runs straight into the sea.", why: "A lot of rain soaks into the ground, gets stuck in lakes, or evaporates on the way." },
          { id: "c", text: "Water that goes underground is gone forever.", why: "Groundwater slowly moves, feeds rivers and can come back to the surface." },
          { id: "d", text: "Water keeps moving around and around, so it is never used up." },
        ],
        correctId: "d",
        hint: "Remember the tip: 'Nothing gets used up.' Which idea matches it?",
        evidenceId: "rivers-lakes",
        walkthrough: "Water changes form and place, but it doesn't disappear. It evaporates, condenses, falls and gathers again and again.",
        explanation: "Water just keeps moving round and round. It is never used up.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  cycle: {
    question: "How does all of this fit into one big loop?",
    hints: {
      nudge: "You have met four steps so far. Try saying them in order, starting with what happens to the puddle.",
      evidenceId: "cycle-map",
      evidenceNote: "Open the diagram called “The water cycle map”. It has all four steps on one page.",
      walkthrough:
        "The sun evaporates water into vapour. The vapour rises, cools and condenses into clouds. Clouds release precipitation. The water collects in rivers, lakes, oceans and the ground. Then the sun evaporates it again, so it is a loop.",
    },
    explanation: [
      "Water goes round in a loop: evaporation, condensation, precipitation and collection. Then it starts again.",
      "The sun powers it all. The puddle by the gate is one small part of the loop, and its water will be back as rain one day.",
    ],
    evidence: {
      "all-together": {
        kind: "reading",
        blocks: [
          {
            type: "p",
            text: "Here is the whole case. Water goes on a journey, and it never really stops.",
          },
          {
            type: "list",
            items: [
              "Evaporation: the sun heats water, and it turns into vapour and rises.",
              "Condensation: high up, the vapour cools and turns into tiny drops. They make clouds.",
              "Precipitation: the drops join up, get heavy and fall as rain, snow, sleet or hail.",
              "Collection: the water gathers in rivers, lakes, oceans and the ground. Then the sun starts it off again.",
            ],
          },
          {
            type: "p",
            text: "The sun powers the whole thing. Without its heat, the loop would stop.",
          },
          {
            type: "tip",
            title: "Fun fact",
            text: "The water cycle has been going for billions of years. So the water in your glass is very, very old.",
          },
        ],
      },
      "cycle-map": {
        kind: "diagram",
        diagramId: "cycle-map",
        caption: "The water cycle on one page.",
        alt: "A landscape with the sea on the left, a hill on the right, the sun at the top and a cloud above. Arrows go up from the sea (evaporation), into the cloud (condensation), down as rain onto the hill (precipitation), and back along a river to the sea (collection).",
        notice: [
          "The arrows make a full loop. There is no end point.",
          "The sun's heat is what drives evaporation.",
          "You can start reading the loop at any step.",
        ],
      },
      "order-cycle": {
        kind: "practice",
        intro: "Put the four steps in the right order, starting with evaporation. Use the arrow buttons to move a step up or down.",
        order: {
          prompt: "Put the water cycle in order.",
          items: [
            "Evaporation: liquid water turns into vapour",
            "Condensation: vapour cools into cloud drops",
            "Precipitation: drops fall as rain, snow, sleet or hail",
            "Collection: water gathers in rivers, lakes and the sea",
          ],
        },
      },
    },
    quiz: [
      {
        id: "cycle-1",
        type: "choice",
        prompt: "What powers the water cycle?",
        options: [
          { id: "a", text: "The wind", why: "Wind helps move things around, but it isn't what drives the cycle." },
          { id: "b", text: "The Sun" },
          { id: "c", text: "The Moon", why: "The Moon pulls on the tides, but doesn't power the water cycle." },
          { id: "d", text: "Volcanoes", why: "Volcanoes don't drive the cycle. The sun does." },
        ],
        correctId: "b",
        hint: "What gave the puddle the energy to evaporate in the first place?",
        evidenceId: "all-together",
        walkthrough: "The sun's heat makes water evaporate. That's the first step of the loop, so the sun is what keeps it all going.",
        explanation: "The sun's heat powers the water cycle.",
      },
      {
        id: "cycle-2",
        type: "choice",
        prompt: "Water vapour has just risen high into the cold sky. What happens next?",
        options: [
          { id: "a", text: "Precipitation", why: "That comes after clouds have formed." },
          { id: "b", text: "Condensation" },
          { id: "c", text: "Collection", why: "Collection happens down on the ground." },
          { id: "d", text: "Evaporation", why: "It has already evaporated. That's how it got up there." },
        ],
        correctId: "b",
        hint: "What does cold air do to water vapour?",
        evidenceId: "cycle-map",
        walkthrough: "The vapour cools in the cold air and turns back into tiny drops. That's condensation, and it makes clouds.",
        explanation: "After evaporation comes condensation: the vapour cools and forms cloud drops.",
      },
      {
        id: "cycle-3",
        type: "lineup",
        prompt: "The puddle is gone. Which story is right?",
        options: [
          { id: "a", text: "The water was destroyed, so it is gone for good.", why: "Water is never destroyed. It changes form and moves." },
          { id: "b", text: "The water went into the sun.", why: "The sun heats the water, but the water doesn't go into the sun." },
          { id: "c", text: "The water went underground and stayed there forever.", why: "This puddle was on pavement, and even groundwater keeps moving." },
          { id: "d", text: "The water moved into the air and will come back as rain some day." },
        ],
        correctId: "d",
        hint: "Put together everything you learned. Where did the puddle water go first, and where does it go next?",
        evidenceId: "all-together",
        walkthrough: "The puddle evaporated into the air. Up high it cools into clouds. Later it falls again as precipitation. So the water is moving round the loop.",
        explanation: "The puddle's water is on its way round the water cycle. It will be back as rain one day.",
      },
    ],
  },
};
