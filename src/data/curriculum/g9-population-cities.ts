import { h, list, p, tip, type ChapterSpec } from "./build";

/* Grade 9 geography: population, migration and cities. Figures are rounded and from UN sources. */
export const POPULATION_CITIES: ChapterSpec = {
  id: "population-cities",
  number: "148",
  title: "The Case of the Crowded City",
  topic: "Population and cities",
  subject: "geography",
  grade: 9,
  tagline: "Why the world's population grew, why people move, and how cities can cope.",
  hook: "A small town has just been named one of the fastest-growing places in the country. Schools are full, buses are packed, and new apartment blocks appear every month. Where are all these people coming from? To find out, you need to understand population, migration and cities.",
  goal: "Explain how and why populations change, why people migrate, and how cities can grow sustainably.",
  learn: [
    "Explain why the world's population grew so fast and is now slowing",
    "Read and use population pyramids",
    "Explain why people migrate using push and pull factors",
    "Describe urbanisation and the challenges of megacities",
    "Describe ways to make cities sustainable",
  ],
  lessons: [
    {
      id: "pop-growth",
      title: "Why the population is growing",
      teaser: "From one billion to eight billion in about two centuries.",
      question: "The world had about 1 billion people around 1800 and about 8 billion today. Why did it grow so fast?",
      goals: ["Define birth rate, death rate and natural increase", "Explain the demographic transition", "Say why growth is slowing"],
      hint: "Think about which changed first: the number of babies born, or the number of people dying.",
      walk: "Death rates fell first, because of better food, medicine and clean water, while birth rates stayed high. When deaths fall faster than births, the population grows quickly. Later, birth rates also fall, so growth slows. This pattern is called the demographic transition.",
      summary: [
        "Natural increase = birth rate − death rate. Population grew fast when death rates fell and birth rates stayed high.",
        "In the demographic transition, birth rates later fall too, and growth slows. The UN expects the world population to level off at around 10 billion in the 2080s.",
      ],
      explain: [
        p("The world's population reached about 1 billion around 1800, 2 billion in 1927 and 7 billion in 2011. In November 2022, it passed 8 billion. Why did growth speed up so much?"),
        list("The birth rate is the number of live births per 1,000 people in a year.", "The death rate is the number of deaths per 1,000 people in a year.", "Natural increase is the birth rate minus the death rate.", "Life expectancy is the average number of years a person is expected to live."),
        tip("Key idea", "Population grew fast because death rates fell, thanks to better food, medicine and sanitation, while birth rates stayed high for longer."),
        h("The demographic transition"),
        p("Many countries follow a pattern in stages."),
        list(
          "Stage 1: high birth rates and high death rates. The population is small and stable.",
          "Stage 2: death rates fall, but birth rates stay high. The population grows fast.",
          "Stage 3: birth rates begin to fall, as more children survive, more women are educated and families choose to be smaller. Growth slows.",
          "Stage 4: low birth and death rates. The population is stable or grows slowly.",
        ),
        p("Different countries are at different stages. In some, such as Niger, women have many children on average and the population is growing fast. In others, such as Japan, the population is falling because there are fewer births than deaths. The UN projects that the world's population will level off at around 10 billion in the 2080s."),
      ],
      tryIt: [
        h("Work out natural increase"),
        list(
          "Country A has a birth rate of 30 per 1,000 and a death rate of 10 per 1,000. Natural increase = 20 per 1,000, or 2% per year.",
          "Country B has a birth rate of 11 per 1,000 and a death rate of 12 per 1,000. Natural increase = −1 per 1,000. The population is falling slightly.",
          "Which country is likely to be at Stage 2, and which at Stage 4? Country A is probably at Stage 2, and Country B at Stage 4.",
        ),
        p("Challenge: explain why birth rates often fall when more children survive and more girls go to school. Write three sentences."),
      ],
      practice: [
        { p: "How is natural increase worked out?", a: "Birth rate minus death rate", w: [["Birth rate plus death rate", "Add them and you get total change, not increase."], ["Death rate minus birth rate", "That is the wrong way round."]], x: "Natural increase = birth rate − death rate." },
        { p: "Around which year did the world population pass 8 billion?", a: "2022", w: [["1950", "The population was about 2.5 billion in 1950."], ["2100", "That is a projection for the future."]], x: "The UN marked 8 billion people in November 2022." },
      ],
      quiz: [
        { p: "What mainly caused rapid population growth from the 1800s?", a: "Death rates fell faster than birth rates", w: [["Birth rates doubled", "Birth rates did not suddenly double. Deaths fell."], ["People stopped moving between countries", "Migration does not explain the world's total growth."]], x: "Better food, medicine and sanitation reduced deaths." },
        { p: "Three statements. Which is true?", a: "Population growth is now slowing in most regions.", w: [["Population growth is getting faster everywhere.", "Growth has been slowing worldwide."], ["Birth rates are rising in every country.", "Birth rates are falling in most countries."]], x: "Many countries have moved to lower birth rates.", lineup: true },
        { p: "A country has a birth rate of 12 per 1,000 and a death rate of 10 per 1,000. What is its natural increase?", a: "2 per 1,000", w: [["22 per 1,000", "You added. Subtract the death rate from the birth rate."], ["−2 per 1,000", "You subtracted the wrong way round."]], x: "12 − 10 = 2." },
      ],
      check: [
        { p: "What does “life expectancy” mean?", a: "The average number of years a person is expected to live", w: [["The oldest age anyone reaches", "It is an average, not a maximum."], ["The number of babies born per woman", "That is the fertility rate."]], x: "Life expectancy is an average." },
        { p: "In the demographic transition, which stage has falling death rates but high birth rates?", a: "Stage 2", w: [["Stage 1", "Stage 1 has high birth and death rates."], ["Stage 4", "Stage 4 has low birth and death rates."]], x: "Population grows fastest in Stage 2." },
      ],
    },
    {
      id: "pyramids",
      title: "Reading population pyramids",
      teaser: "A graph that shows a country's past and hints at its future.",
      question: "What can the shape of a population pyramid tell you about a country's past, present and future?",
      goals: ["Describe how a population pyramid is drawn", "Tell apart expanding, stable and ageing pyramids", "Explain what the dependency ratio shows"],
      hint: "Look at the width of the base compared with the top. What does each age group tell you?",
      walk: "A population pyramid uses bars to show the share of people in each age group, with males on one side and females on the other. A wide base means many young people and a high birth rate. A narrow base and a wide top means few births and many older people.",
      summary: [
        "A population pyramid shows how many males and females are in each age group.",
        "Its shape shows birth rates and ageing. The dependency ratio compares dependants with people of working age.",
      ],
      explain: [
        p("A population pyramid is a graph that shows the age and sex structure of a population. Each horizontal bar shows an age group, such as 0–4, 5–9 and so on. Males are usually on the left and females on the right. The bars show the number or the percentage of people in each group."),
        h("Three typical shapes"),
        list(
          "Wide base, narrow top: a high birth rate and many young people. The population is growing fast. Niger is an example.",
          "Straight sides: similar numbers in each age group. The population is stable.",
          "Narrow base, wide top: a low birth rate and many older people. The population is ageing and may shrink. Japan is an example.",
        ),
        tip("Key idea", "The base shows how many children are being born. The top shows how many older people there are."),
        h("Dependency ratio"),
        p("People under 15 and over 64 are often called dependants, because they depend on people of working age (15 to 64). The dependency ratio is the number of dependants for every 100 people of working age. If 35% of a country are dependants and 65% are working age, the ratio is 35 ÷ 65 × 100, which is about 54 dependants per 100 workers."),
        p("Planners use pyramids to predict what a country will need. A wide base means more schools and maternity services. A wide top means more health care and pensions."),
      ],
      tryIt: [
        h("Read the pyramid"),
        list(
          "Sketch three pyramids: one wide-based, one with straight sides and one with a narrow base. Label the likely country type for each.",
          "In one country 40% of people are under 15, 57% are 15–64 and 3% are over 64. The dependants are 43%, and the ratio is 43 ÷ 57 × 100, about 75 per 100.",
        ),
        p("Challenge: a country has a narrow-based pyramid. In 30 years, what will it probably need more of, and what less of? Give two ideas of each."),
      ],
      practice: [
        { p: "A pyramid with a very wide base shows:", a: "A high birth rate and many young people", w: [["An ageing population", "An ageing population has a wide top."], ["No change in numbers", "A wide base suggests fast growth."]], x: "Many children are being born." },
        { p: "What does the dependency ratio compare?", a: "People under 15 and over 64 with people of working age", w: [["Men with women", "It compares age groups, not sexes."], ["City people with rural people", "It compares age groups."]], x: "It shows how many dependants there are per 100 workers." },
      ],
      quiz: [
        { p: "A pyramid with a narrow base and a wide top suggests what?", a: "A low birth rate and an ageing population", w: [["A very high birth rate", "A high birth rate gives a wide base."], ["Many young people", "A narrow base means fewer young people."]], x: "Few births and many older people." },
        { p: "Which age group is counted as working age in the dependency ratio?", a: "15 to 64", w: [["0 to 14", "Under 15 are counted as dependants."], ["65 and over", "Over 64 are counted as dependants."]], x: "15 to 64 is the working-age group." },
        { p: "Three statements. Which is true?", a: "Planners use population pyramids to predict the need for schools and care for older people.", w: [["Pyramids show where people live.", "They show age and sex, not location."], ["Pyramids show only women.", "They show males and females."]], x: "Pyramids help planning.", lineup: true },
      ],
      check: [
        { p: "A country has 20% aged 0–14, 65% aged 15–64 and 15% aged 65+. About how many dependants are there per 100 working-age people?", a: "About 54", w: [["35", "That is the percentage of dependants, not the number per 100 working-age people."], ["65", "That is the percentage of working-age people."]], x: "35 ÷ 65 × 100 ≈ 54." },
        { p: "Which country is known for a rapidly ageing population?", a: "Japan", w: [["Niger", "Niger has a very young population."], ["Both of them equally", "Their pyramids look very different."]], x: "Japan has a high share of older people and a falling population." },
      ],
    },
    {
      id: "migration",
      title: "Migration: why people move",
      teaser: "Push factors, pull factors and the choices behind them.",
      question: "Why do people leave a place they know to start a new life somewhere else?",
      goals: ["Say what migration is and name its types", "Explain push and pull factors", "Describe effects of migration on origin and destination"],
      hint: "Some things push people away from a place, and others pull them towards somewhere else.",
      walk: "People migrate when push factors at home, such as war, lack of jobs or natural disasters, combine with pull factors elsewhere, such as jobs, safety or education. Migrants and the places they leave and join are all affected, with both benefits and challenges.",
      summary: [
        "Push factors drive people away from a place, and pull factors attract them to another.",
        "Migration has benefits and challenges for both the place people leave and the place they go to.",
      ],
      explain: [
        p("Migration is the movement of people from one place to live in another. It can be within a country (internal migration) or between countries (international migration). Some people choose to move. Others are forced to."),
        list(
          "Push factors make people want to leave: war, persecution, famine, drought, natural disasters, unemployment and poverty.",
          "Pull factors attract people to a place: jobs, higher wages, safety, education, health care and family already there.",
        ),
        tip("Key idea", "Migration usually comes from a mix of push and pull factors."),
        h("Migrants and refugees"),
        p("A refugee is a person who has fled their country because of war, violence or persecution, and cannot safely return. An economic migrant moves mainly to find work or a better standard of living. Both are migrants, but the reasons and the legal protections can differ. Around 280 million people, about 3.6% of the world's population, live outside the country where they were born."),
        h("Effects of migration"),
        list(
          "For the place left: money sent home, called remittances, can support families. But countries can lose skilled workers, known as brain drain.",
          "For the place joined: migrants fill jobs and bring new skills and cultures. But rapid arrivals can put pressure on housing and services.",
        ),
      ],
      tryIt: [
        h("Push or pull?"),
        list("Drought has ruined the harvest: push.", "A new factory is hiring hundreds of workers: pull.", "A war has broken out in the region: push.", "A university is offering places to students from abroad: pull."),
        p("Challenge: a family is deciding whether to move from a village to a big city. Draw a table of push and pull factors, then list two obstacles that might stop them, such as cost or distance."),
      ],
      practice: [
        { p: "Which of these is a push factor?", a: "War in the home country", w: [["Good job offers elsewhere", "That is a pull factor."], ["Better schools abroad", "That is a pull factor."]], x: "A push factor drives people to leave." },
        { p: "Moving from one country to another is called:", a: "International migration", w: [["Internal migration", "Internal migration is within one country."], ["Natural increase", "That is about births and deaths."]], x: "International migration crosses a border." },
      ],
      quiz: [
        { p: "What is a refugee?", a: "A person who has fled their country because of war, violence or persecution", w: [["Anyone who moves for a better job", "That describes an economic migrant."], ["A tourist on holiday", "A tourist is not a migrant."]], x: "Refugees flee danger." },
        { p: "Which of these is a pull factor?", a: "Plenty of jobs in a city", w: [["Drought on farms", "That is a push factor."], ["Conflict at home", "That is a push factor."]], x: "A pull factor attracts people to a place." },
        { p: "Three statements. Which is true?", a: "Migration can have both benefits and challenges for the origin and the destination.", w: [["Migration only benefits the destination.", "Origin places can benefit from remittances."], ["Migration never affects the home country.", "Home countries can lose skilled workers and gain remittances."]], x: "Effects are mixed.", lineup: true },
      ],
      check: [
        { p: "What are remittances?", a: "Money that migrants send back to their families at home", w: [["Taxes paid on arrival", "Remittances are sent by migrants."], ["Travel tickets", "Remittances are money sent home."]], x: "Remittances are a major source of income in some countries." },
        { p: "What is internal migration?", a: "Moving from one place to another within the same country", w: [["Moving abroad", "That is international migration."], ["A holiday trip", "Migration involves a change of home."]], x: "Internal migration stays within one country." },
      ],
    },
    {
      id: "urbanisation",
      title: "Urbanisation and megacities",
      teaser: "More than half of us now live in towns and cities.",
      question: "Why are cities growing so fast, and what problems and opportunities does it create?",
      goals: ["Define urbanisation and megacity", "Explain why cities grow", "Describe the problems and opportunities of rapid urban growth"],
      hint: "Think about why people leave the countryside, and what a city offers.",
      walk: "Urbanisation is the increase in the share of people living in towns and cities. It is driven by migration from the countryside, where there are fewer jobs and services, to cities, where there are more. It brings opportunities, but also problems such as housing shortages, traffic and pollution.",
      summary: [
        "Urbanisation is the growing share of people living in cities. More than half the world's people now live in urban areas.",
        "Cities offer jobs and services but can have housing shortages, informal settlements, traffic and pollution.",
      ],
      explain: [
        p("Urbanisation is the growth in the share of a country's people who live in towns and cities. Since about 2007, more than half of the world's people have lived in urban areas, and the UN expects the share to reach about two thirds by 2050. Today the fastest urban growth is in Asia and Africa."),
        p("A megacity is a city with more than 10 million people. Tokyo, Delhi, Shanghai, São Paulo, Mexico City and Cairo are examples."),
        h("Why do cities grow?"),
        list("Rural-to-urban migration: push factors in the countryside, such as poverty and fewer jobs, and pull factors in cities, such as work, schools and hospitals.", "Natural increase: births exceed deaths, so the city grows from within."),
        tip("Key idea", "Cities grow when people move in from the countryside and when more people are born than die."),
        h("Opportunities and problems"),
        list(
          "Opportunities: more jobs, better access to schools and health care, new ideas and businesses, and services shared by many people.",
          "Problems: not enough affordable homes, so people build informal settlements, often crowded and without proper water or sanitation. Also traffic, air pollution, waste and pressure on services.",
        ),
        p("The UN estimates that more than a billion people live in slums or informal settlements. Cities that plan ahead, build transport and housing, and invest in services cope best."),
      ],
      tryIt: [
        h("Map and match"),
        list(
          "On a world map, mark six megacities. Which continents are they on?",
          "Make a table with three urban problems, such as housing, traffic and pollution. For each, write one possible solution.",
        ),
        p("Challenge: imagine you are a city planner for a city that doubles in size in 20 years. List your top three priorities and give a reason for each."),
      ],
      practice: [
        { p: "What is a megacity?", a: "A city with more than 10 million people", w: [["A city with a million people", "That is a million-plus city, not a megacity."], ["Any capital city", "Size, not status, defines a megacity."]], x: "Megacities have more than 10 million people." },
        { p: "What is a main reason for urban growth in developing countries?", a: "Migration from rural areas to cities", w: [["Cities ban births", "That is not a reason for growth."], ["Fewer jobs in cities", "More jobs in cities attract people."]], x: "People move to cities for jobs and services." },
      ],
      quiz: [
        { p: "About what share of the world's people live in cities today?", a: "More than half", w: [["About 10%", "That was true over a century ago."], ["Almost everyone", "Many people still live in rural areas."]], x: "More than half of people are urban." },
        { p: "What is an informal settlement?", a: "Housing built without official permission, often crowded and lacking services", w: [["A luxury apartment block", "Informal settlements are usually poor housing."], ["A planned new town", "They are not planned."]], x: "Many people in fast-growing cities live in them." },
        { p: "Three statements. Which is true?", a: "The fastest urban growth today is mostly in Asia and Africa.", w: [["Most megacities are in Europe.", "Most megacities are in Asia."], ["Cities everywhere are shrinking.", "Many cities are growing, especially in Asia and Africa."]], x: "Urbanisation is now strongest in Asia and Africa.", lineup: true },
      ],
      check: [
        { p: "Which is a pull factor drawing people to cities?", a: "More jobs and services", w: [["Lack of schools", "That is a reason to leave a place."], ["Drought on farms", "That is a push factor from the countryside."]], x: "Jobs and services attract migrants." },
        { p: "Which is a problem caused by rapid urban growth?", a: "Housing shortages and traffic", w: [["Too few people needing homes", "Rapid growth means more demand for homes."], ["Fewer people needing transport", "More people need transport."]], x: "Services struggle to keep up." },
      ],
    },
    {
      id: "sustainable-cities",
      title: "Sustainable cities",
      teaser: "Cities that work for people today and in the future.",
      question: "How can cities grow without damaging the environment or leaving people behind?",
      goals: ["Say what a sustainable city is", "Describe ways cities reduce harm and improve life", "Give examples of cities that have tried"],
      hint: "Think about transport, energy, waste and green space, and also about fairness.",
      walk: "A sustainable city meets the needs of people today without harming future generations. It uses public transport and cycling, saves energy, recycles waste, keeps green spaces, and provides affordable homes and services for everyone.",
      summary: [
        "A sustainable city meets today's needs without harming the future, and balances people, the economy and the environment.",
        "Good public transport, green space, clean energy, recycling and fair housing all help.",
      ],
      explain: [
        p("Sustainable means meeting the needs of people today without harming the ability of future generations to meet their own needs. A sustainable city tries to balance three things: the environment, the economy and the wellbeing of people."),
        list(
          "Transport: good public transport, cycle lanes and safe walking routes reduce traffic and pollution.",
          "Energy: energy-efficient buildings, and electricity from renewable sources such as solar and wind.",
          "Waste and water: recycling, composting, and treating and reusing water.",
          "Green space: parks and trees cool the city, clean the air and give people places to relax.",
          "Housing and planning: affordable homes near jobs and services, so people do not need long journeys.",
        ),
        tip("Key idea", "A sustainable city is not only about the environment. It is also about fairness and a good economy."),
        h("Real examples"),
        list(
          "Curitiba, Brazil, built a bus rapid transit system in the 1970s, with dedicated lanes and fast boarding, which moves many people at low cost.",
          "Copenhagen, Denmark, has invested heavily in cycling. About half of journeys to work or study in the city are by bicycle.",
          "Singapore recycles waste water into clean drinking water, called NEWater, and has added green space across the city.",
        ),
      ],
      tryIt: [
        h("Plan a neighbourhood"),
        list(
          "Sketch a map of a new neighbourhood for 5,000 people.",
          "Include a transport plan, a place for each type of green space, a shop and school within walking distance, and a recycling centre.",
          "Explain two choices you made, and who each one helps.",
        ),
        p("Challenge: audit your own journey to school. How do you travel? What is the lowest-pollution option that would work for you, and what stops you using it?"),
      ],
      practice: [
        { p: "What does “sustainable” mean?", a: "Meeting today's needs without harming the ability of future generations to meet theirs", w: [["Cheap to build", "Sustainability is not about cost alone."], ["Very large", "Size is not what makes something sustainable."]], x: "Sustainability looks after the future as well as the present." },
        { p: "Which way of travelling is lowest in carbon for a short trip?", a: "Walking or cycling", w: [["Driving a car", "Cars produce more carbon dioxide."], ["Taking a plane", "Planes produce a lot of carbon dioxide."]], x: "Walking and cycling produce almost no emissions." },
      ],
      quiz: [
        { p: "Which helps make a city more sustainable?", a: "Good public transport and cycle lanes", w: [["More motorways and nothing else", "More roads can lead to more traffic."], ["Removing parks", "Green space makes cities healthier."]], x: "Public transport and cycling reduce traffic and pollution." },
        { p: "What does Curitiba's bus system show?", a: "Efficient public transport can serve a big city at low cost", w: [["Cars are the best choice for every city", "Curitiba shows an alternative to cars."], ["Buses cannot be fast", "Curitiba's buses are fast and carry many people."]], x: "Dedicated bus lanes make buses quick and reliable." },
        { p: "Three statements. Which is true?", a: "A sustainable city considers people, the economy and the environment.", w: [["Sustainability is only about the environment.", "It includes fairness and the economy."], ["Only rich cities can be sustainable.", "Cities of all incomes can take steps."]], x: "Sustainability balances all three.", lineup: true },
      ],
      check: [
        { p: "What are green spaces in a city good for?", a: "Cooling the city, cleaning the air and giving people a place to relax", w: [["Only for parking", "Green spaces are for people and the environment."], ["Only for farming", "Parks have many benefits, not only farming."]], x: "Trees and parks help both people and the climate." },
        { p: "Why does recycling help cities?", a: "It reduces waste sent to landfill and saves resources", w: [["It makes more rubbish", "It reduces rubbish."], ["It uses more energy than it saves in every case", "Recycling usually saves energy and resources."]], x: "Recycling reuses materials." },
      ],
    },
  ],
};
