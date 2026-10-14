import { IeltsFullMockTest } from './types';

export const IELTS_ACTUAL_TESTS: IeltsFullMockTest[] = [
  {
    id: 'ielts-actual-vol-6-test-1',
    title: 'IELTS Recent Actual Test With Answers (Vol 6 - Test 1)',
    track: 'Academic',
    yearEdition: '2026 Examination Edition',
    totalQuestions: 40,
    
    // ==========================================
    // 1. LISTENING SECTION (ieltsonlinetests.com format)
    // ==========================================
    listening: [
      {
        id: 'lis-sec-1',
        sectionNumber: 1,
        title: 'Section 1: Rental Property Enquiry',
        context: 'A conversation between an agent and a client looking for a 2-bedroom rental apartment.',
        audioScenario: 'Client (Sarah) calling Prestige Property Management to arrange a viewing in Northbridge.',
        audioTranscript: 'Agent: Good morning, Prestige Property Management. How can I help you today?\nClient: Hello! I am calling regarding the two-bedroom flat advertised on High Street in Northbridge.\nAgent: Ah yes, that is available from the first of November. The monthly rent is 850 pounds, including water rates.\nClient: That sounds reasonable. Does it have allocated parking?\nAgent: Yes, one covered garage space is included at the rear of the property.\nClient: Wonderful. Could I book a viewing for this Saturday morning at 10 am?\nAgent: Certainly, Saturday at 10 am is booked for you, Sarah.',
        questions: [
          {
            id: 1,
            type: 'sentence_completion',
            questionText: 'The property on High Street is available from the 1st of ________.',
            correctAnswer: 'November',
            locateSnippet: 'Agent: Ah yes, that is available from the first of November.',
            explanation: 'The agent states clearly that the move-in availability date is the first of November.',
          },
          {
            id: 2,
            type: 'multiple_choice',
            questionText: 'The monthly rent of £850 includes which of the following utilities?',
            options: ['Electricity', 'Water rates', 'Gas heating', 'Internet'],
            correctAnswer: 'Water rates',
            locateSnippet: 'Agent: The monthly rent is 850 pounds, including water rates.',
            explanation: 'The agent clarifies that water rates are included within the £850 monthly cost.',
          },
          {
            id: 3,
            type: 'sentence_completion',
            questionText: 'Parking is provided as one covered ________ space.',
            correctAnswer: 'garage',
            locateSnippet: 'Agent: Yes, one covered garage space is included at the rear of the property.',
            explanation: 'The agent confirms that one covered garage space is provided at the rear.',
          },
          {
            id: 4,
            type: 'multiple_choice',
            questionText: 'At what time is the viewing booked for Saturday morning?',
            options: ['9:00 am', '9:30 am', '10:00 am', '11:00 am'],
            correctAnswer: '10:00 am',
            locateSnippet: 'Agent: Certainly, Saturday at 10 am is booked for you, Sarah.',
            explanation: 'The appointment is finalized for 10:00 am on Saturday.',
          },
        ],
      },
      {
        id: 'lis-sec-2',
        sectionNumber: 2,
        title: 'Section 2: City Botanical Gardens Orientation Tour',
        context: 'A guide welcoming visitors and outlining facilities and walking trails.',
        audioScenario: 'Park ranger orientation speech at the Visitor Center entrance.',
        audioTranscript: 'Welcome to the Kingswood Botanical Gardens. Established in 1892, our grounds span over 45 hectares. The Rose Pavilion is directly opposite the entrance gate, while the Tropical Glasshouse is situated behind the duck pond to your left. Please note that photography for commercial use is prohibited without a permit.',
        questions: [
          {
            id: 5,
            type: 'multiple_choice',
            questionText: 'In which year was Kingswood Botanical Gardens established?',
            options: ['1882', '1892', '1902', '1922'],
            correctAnswer: '1892',
            locateSnippet: 'Established in 1892, our grounds span over 45 hectares.',
            explanation: 'The speaker states the year of foundation as 1892.',
          },
          {
            id: 6,
            type: 'sentence_completion',
            questionText: 'The Rose Pavilion is located directly opposite the entrance ________.',
            correctAnswer: 'gate',
            locateSnippet: 'The Rose Pavilion is directly opposite the entrance gate...',
            explanation: 'The guide gives directions specifying the entrance gate.',
          },
        ],
      },
    ],

    // ==========================================
    // 2. READING PASSAGE (Computer-Delivered Split Screen with Locate & Explain)
    // ==========================================
    reading: [
      {
        id: 'read-pass-1',
        title: 'The Development of Subterranean Railway Transit in London',
        subtitle: 'A historical examination of civil engineering solutions in Victorian England',
        passageText: `In the first half of the 19th century, London experienced exponential commercial expansion, drawing hundreds of thousands of rural labourers and merchants to its urban center. By 1850, road gridlock had become an acute urban crisis. Streets were congested with horse-drawn omnibuses, delivery wagons, and pedestrians, resulting in severe delays and staggering commercial inefficiency. 

Charles Pearson, a visionary City Solicitor, was among the earliest advocates for an underground railway network. Recognizing that conventional surface widening was both prohibitively expensive and architecturally destructive, Pearson proposed constructing subterranean lines linking peripheral mainline stations directly to the economic core of the City of London. Despite initial public skepticism and warnings from naysayers who feared tunnel collapses, construction on the Metropolitan Railway commenced in 1860 using the cut-and-cover excavation method.

The cut-and-cover technique involved excavating a massive trench along existing thoroughfares, reinforcing the walls with brick retaining arches, laying the track beds, and re-paving the street above. Although this engineering methodology caused widespread above-ground disruption for commercial shopkeepers, it minimized subterranean geological risks. When the railway opened to passengers on January 10, 1863, it was an immediate sensation, transporting more than 30,000 passengers on its maiden day alone.

Early underground operations, however, faced severe atmospheric challenges. The locomotives were steam-powered, burning coke and later coal, which emitted thick plumes of sulfurous smoke and steam into poorly ventilated tunnels. Passengers often arrived at their terminals coated in fine soot. It was not until the introduction of electric traction in 1890, pioneered on the City and South London Railway, that the true deep-level "tube" system became hygienic, fast, and remarkably comfortable.`,
        questions: [
          {
            id: 7,
            type: 'true_false_not_given',
            questionText: 'By 1850, traffic congestion in London was primarily relieved by widening surface streets.',
            correctAnswer: 'False',
            locateSnippet: 'Pearson proposed constructing subterranean lines... Recognizing that conventional surface widening was both prohibitively expensive and architecturally destructive...',
            explanation: 'The passage explicitly says surface widening was NOT carried out because it was prohibitively expensive and destructive.',
          },
          {
            id: 8,
            type: 'multiple_choice',
            questionText: 'What profession did Charles Pearson hold when championing the underground railway?',
            options: ['Chief Civil Engineer', 'City Solicitor', 'Railway Architect', 'Steam Engine Manufacturer'],
            correctAnswer: 'City Solicitor',
            locateSnippet: 'Charles Pearson, a visionary City Solicitor, was among the earliest advocates...',
            explanation: 'The text directly introduces Pearson as a "visionary City Solicitor".',
          },
          {
            id: 9,
            type: 'sentence_completion',
            questionText: 'The Metropolitan Railway was originally constructed utilizing the ________ excavation method.',
            correctAnswer: 'cut-and-cover',
            locateSnippet: '...construction on the Metropolitan Railway commenced in 1860 using the cut-and-cover excavation method.',
            explanation: 'The passage describes the specific engineering technique as "cut-and-cover".',
          },
          {
            id: 10,
            type: 'true_false_not_given',
            questionText: 'Over 30,000 commuters traveled on the railway on its first day of service.',
            correctAnswer: 'True',
            locateSnippet: 'When the railway opened to passengers on January 10, 1863... transporting more than 30,000 passengers on its maiden day alone.',
            explanation: 'The text confirms that more than 30,000 passengers were transported on its maiden day.',
          },
          {
            id: 11,
            type: 'multiple_choice',
            questionText: 'What technological advance in 1890 eliminated sulfurous smoke inside London tunnels?',
            options: ['Steam condensers', 'Electric traction', 'Chemical air scrubbers', 'Pressurized cabins'],
            correctAnswer: 'Electric traction',
            locateSnippet: 'It was not until the introduction of electric traction in 1890... that the true deep-level "tube" system became hygienic...',
            explanation: 'The transition from steam to electric traction in 1890 resolved the ventilation and smoke problems.',
          },
        ],
      },
    ],

    // ==========================================
    // 3. WRITING SECTION (Task 1 & Task 2 with Word Counters)
    // ==========================================
    writing: [
      {
        id: 'w-task-1',
        taskNumber: 1,
        title: 'Academic Writing Task 1: Comparative Bar Chart Analysis',
        taskPrompt: 'The chart below shows the percentage of households in four European countries owning various electronic devices between 2010 and 2020.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
        targetWords: 150,
        recommendedMinutes: 20,
        visualChartType: 'Comparative Bar Chart',
        visualChartData: [
          { label: 'Smartphones (2010 vs 2020)', valueA: 34, valueB: 92 },
          { label: 'Laptops / PCs (2010 vs 2020)', valueA: 62, valueB: 78 },
          { label: 'Tablets (2010 vs 2020)', valueA: 12, valueB: 65 },
          { label: 'Smart TVs (2010 vs 2020)', valueA: 8, valueB: 71 },
        ],
        sampleBand9Response: 'The bar chart delineates the proportion of households possessing four categories of electronic consumer devices across four European nations over a ten-year timeframe from 2010 to 2020.\n\nOverall, ownership across all four device types underwent substantial growth, with smartphones witnessing the most dramatic proliferation. Furthermore, while personal computers maintained higher initial penetration rates in 2010, mobile-centric and smart entertainment appliances surpassed them by the end of the decade.\n\nIn 2010, personal computers and laptops represented the predominant technology, held by approximately 62% of households. Smartphones followed with 34%, whereas tablet computers and smart televisions remained niche luxury goods at 12% and 8% respectively.\n\nBy 2020, smartphone adoption surged exponentially to 92%, establishing near-ubiquitous presence. Concurrently, smart televisions and tablets experienced rapid multi-fold gains, culminating at 71% and 65% respectively. Laptop and PC ownership grew steadily to 78%, representing consistent yet comparatively moderate expansion.',
      },
      {
        id: 'w-task-2',
        taskNumber: 2,
        title: 'Academic Writing Task 2: Argumentative Essay',
        taskPrompt: 'Some people argue that technological advancements have significantly increased our quality of life, while others believe they have caused social isolation and health problems.\n\nDiscuss both views and give your own opinion. Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.',
        targetWords: 250,
        recommendedMinutes: 40,
        sampleBand9Response: 'The unprecedented acceleration of technological innovation has fundamentally restructured contemporary human civilization. While proponents assert that technology has enriched standards of living through enhanced convenience and instant connectivity, critics argue that it has eroded interpersonal intimacy and engendered detrimental lifestyle consequences. In my view, although the psychological hazards of digital dependency are tangible, the overall utilitarian dividends of modern technology overwhelmingly enhance human well-being when utilized with conscious balance.\n\nOn the one hand, technological conveniences have liberated human beings from arduous physical constraints. In healthcare, cutting-edge diagnostic algorithms and medical imaging enable the early detection of life-threatening illnesses, thereby elevating global life expectancies. Furthermore, telecommunications platforms permit seamless cross-continental collaboration, allowing professionals to execute complex international commerce without geographical displacement. Consequently, access to digital education empowers marginalized learners worldwide, democratizing specialized knowledge at unprecedented scale.\n\nConversely, excessive digital immersion exerts measurable tolls on psycho-social cohesion. The substitution of genuine face-to-face dialogue with algorithmic social media interactions frequently cultivates superficial validation cycles, contributing to documented spikes in adolescent anxiety and loneliness. Additionally, pervasive sedentary desk habits and screen-induced sleep disturbances foster chronic musculoskeletal and cardiovascular disorders.\n\nIn conclusion, while the hazards of digital alienation require individual discipline and ethical platform design, the transformative contributions of technology to medicine, communication, and knowledge accessibility remain indispensable to modern societal prosperity.',
      },
    ],

    // ==========================================
    // 4. SPEAKING INTERVIEW (Part 1, 2 Cue-Card, Part 3)
    // ==========================================
    speaking: [
      {
        partNumber: 1,
        title: 'Part 1: Introduction & Familiar Everyday Topics',
        duration: '4 – 5 minutes',
        prompt: 'Let us talk about your hometown. Where did you grow up, and what is your favorite aspect of that place?',
        audioHint: 'Keep your answers fluent, natural, and expand with 2-3 supporting sentences per question.',
        modelAnswer: 'I grew up in Kathmandu, Nepal, a valley surrounded by majestic hills and steeped in ancient pagoda architecture. What I cherish most is the vibrant community spirit—neighbors know each other intimately, and festive celebrations bring the entire neighborhood together.',
      },
      {
        partNumber: 2,
        title: 'Part 2: Individual Long Turn (The Cue Card)',
        duration: '3 – 4 minutes (1 min prep, 2 min speaking)',
        prompt: 'Describe an ambitious project or skill you successfully accomplished.',
        cueCardPoints: [
          'What the project or skill was',
          'Why you decided to undertake it',
          'What challenges or difficulties you encountered',
          'And explain how you felt once you completed it',
        ],
        prepTimeSeconds: 60,
        audioHint: 'Use your 1-minute prep time to jot down keywords for each bullet point. Maintain a steady pace without long hesitations.',
        modelAnswer: 'I would like to speak about developing an interactive web platform for my university department. Last semester, our student society needed a centralized scheduling portal to manage campus seminars. The technical hurdle was integrating real-time notifications with database synchronization. Working through debugging errors required extensive perseverance, but launching the portal to over 800 active students gave me an immense sense of professional pride and self-efficacy.',
      },
      {
        partNumber: 3,
        title: 'Part 3: Two-Way Abstract Discussion',
        duration: '4 – 5 minutes',
        prompt: 'Do you believe modern societies place too much emphasis on individual achievements rather than collective cooperation?',
        audioHint: 'Analyze broader societal implications, balance multiple perspectives, and use academic cohesive discourse markers.',
        modelAnswer: 'From an economic standpoint, capitalistic benchmarks inherently reward individual milestones and meritocratic competition. However, when we confront complex systemic challenges such as ecological transition or medical breakthroughs, collective multidisciplinary teamwork is vastly more impactful than solitary brilliance.',
      },
    ],
  },
];
