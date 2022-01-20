import { queryByTestId } from "@testing-library/react"

const HarassmentContent = {
    age: {
        id: 1,
        question: "Please select your age",
        answerOptions:
            [
                "0-18",
                "19-25",
                "26-35",
                "36-45",
                "46-55",
                "56-65",
                "66+"
            ],
        questionType: "mc"
    },
    gender: {
        id: 2,
        question: "How do you identify?",
        answerOptions:
            [
                "Woman",
                "Man",
                "Transgender",
                "Non-binary/non-conforming",
                "Prefer not to respond",
                "Prefer to self-describe below [Fill in option]",
            ],
        questionType: "mc"
    },
    race: {
        id: 3,
        question: "select your race/ethnicity",
        answerOptions:
            [
                "Black",
                "East Asian",
                "Southeast Asian",
                "South Asian",
                "Indigenous",
                "Latino",
                "Middle Eastern",
                "White",
                "Another Race Category",
                "Do not know",
                "Prefer not to answer"
            ],
        questionType: "checkboxes"
    },
    industry: {
        id: 4,
        question: "What industry do you work in?",
        answerOptions:
            [
                "Accommodation and Food Services (Street Vendors, Restaurants, Campgrounds, Hotels, etc.)",
                "Healthcare and Social Assistance (Hospitals, Day Care, Home Care etc.)",
                "Administration, Business Support & Waste Management Services (Debt Collection Agencies, Employment & Recruiting Agencies, Travel Agencies, Security Services, Recycling Facilities etc.)",
                "Information (Radio Broadcast, Music Publishing, Wireless Telecommunications Carriers etc.)",
                "Construction (Commercial & Municipal Building, Road, Highway & Bridge Construction etc.)",
                "Mining (Copper, Nickel & Zinc Mining etc.)",
                "Retail Trade (Beer, Wine & Liquor Stores, New Car Dealers, Department Stores, etc.)",
                "Manufacturing (Bread Production, Apparel Manufacturing, Dairy Product Production, etc.)",
                "Professional, Scientific and Technical Services (Accounting Services, IT Consulting, etc.)",
                "Wholesale Trade (Automobile, Grocery, Gasoline & Petroleum, etc.)",
                "Agriculture, Forestry, Fishing and Hunting (Corn Farming, Cannabis Production, Logging, etc.)",
                "Finance and Insurance (Insurance Brokers & Agencies, Real Estate Investment Trusts etc.)",
                "Utilities (Sewage Treatment Facilities, Electric Power Transmission, etc.)",
                "Transportation and Warehousing (Public Transportation, Couriers & Local Delivery Services, etc.)",
                "Real Estate and Rental and Leasing (Car Rental, Truck Rental, Real Estate Appraisal etc.)",
                "Other Services (except Public Administration) (Funeral Homes, Pet Grooming, Oil Change, etc.)",
                "Educational Services (Language Instruction, Business Coaching, College and Universities, etc.)",
                "Arts, Entertainment and Recreation (Golf Courses, Concert & Event Promotion, Gym, etc.)"
            ],
        questionType: "mc"
    },
    position: {
        id: 5,
        question: "What is your role?",
        answerOptions: [
            "Director/ Executive/ Business Owner",
            "Manager / Assistant Manager",
            "Supervisor / Superintendent",
            "Non-managerial (no overseeing function of others)",
        ],
        questionType: "mc"
    },
    nature: {
        id: 6,
        question: "Nature of the Investigation",
        answerOptions:
            [
                "Human Rights Investigation (harassment on the basis of race, ancestry, place of origin, ethnic origin, marital status, family status, same-sex partnership status, disability, sex, creed, sexual orientation, age, record of offences, citizenship)",
                "Personal Harassment (harassment is unrelated to the protections under the Human Rights Code and may include bullying, abusive or violent language, physical contact etc.)"
            ],
        questionType: "mc"
    },
    numComplainants: {
        id: 7,
        question: "How many Complainants were involved in this investigation?",
        answerOptions: [
            "1",
            "2-3",
            "4+"
        ],
        questionType: "mc",
        output: {
            condition: "If b or c selected AND internal investigation (question 23) was selected",
            status: "RedFlag",
            text: "RED FLAG: When there are multiple complainants or respondents, the more complex the issue and the more likely an external investigator is needed"
        }
    },
    numRespondents: {
        id: 8,
        question: "How many Respondents were involved in this investigation?",
        answerOptions: [
            "1",
            "2-3",
            "4+"
        ],
        questionType: "mc",
        output: {
            condition: "If b or c selected AND internal investigation (question 23) was selected",
            status: "RedFlag",
            text: "RED FLAG: When there are multiple complainants or respondents, the more complex the issue and the more likely an external investigator is needed"
        }
    },
    numAllegations: {
        id: 9,
        question: "How many separate complaints/ allegations were there in your complaint?",
        answerOptions: [
            "1",
            "2-3",
            "4+"
        ],
        questionType: "mc",
        output: {
            condition: "If b or c selected AND internal investigation (question 23) was selected",
            status: "RedFlag",
            text: "RED FLAG: When there are multiple complaints, the more complex the issue and the more likely an external investigator is needed"
        }
    },
    discussion: {
        id: 10,
        question: "Did you and any of the other complainants discuss the issues after deciding to file a complaint?",
        answerOptions: ['yes', 'no'],
        questionType: "mc",
        output: {
            condition: "yes",
            status: "RedFlag",
            text: "RED FLAG: The investigation process must maintain confidentiality and only necessary information should be disclosed (OHSA 32.0.6 (2)(d)). If complainants are able to compare notes before making the complaint to management, are allowed to hear their complaints in front of one another, and are not cautioned not to speak to each other about their respective complaints",
        },
    },
    inWorkplace: {
        id: 11,
        question: "Did the incidents under investigation occur in the workplace or during a work-related activity?",
        answerOptions: ['yes', 'no'],
        questionType: "mc",
    },
    outsideDismissed: {
        id: 12,
        question: "If incidents did not occur during work-related activity, was the investigation dismissed for this reason?",
        answerOptions: ['yes', 'no'],
        questionType: "mc",
        output: {
            condition: "no",
            status: "RedFlag",
            text: "RED FLAG: the employer may have failed to investigate the complaint properly since the incident was dismissed without reason"
        }
    },
    investigationProcess: {
        id: 13,
        question: "Does your workplace have a set of rules/ guidelines for how to properly conduct an investigation?",
        answerOptions: ['yes', 'no', 'unsure'],
        questionType: "mc",
        output: {
            condition: "No or Unsure",
            status: "RedFlag",
            text: "RED FLAG: According to the OHSA, an employer should have detailed measures and procedures for reporting incidents of workplace harassment and also explanations for how these incidents and complaints will be investigated (OHSA 32.0.6 (2)(a)(c)). If the employer has no policy, the investigation may be flawed if an internal investigator (i.e. someone from the organization) lacks the experience, knowledge, and training needed to conduct proper investigations (Schneider)."
        }
    },
    // union
    inUnion: {
        id: 14,
        question: "Were you a member of a union when the [issues] (harassment, discrimination, bullying, etc…) took place?",
        answerOptions: ['yes', 'no'],
        questionType: "mc",
    },
    inUnionInvestigation: {
        id: 15,
        question: "Were you a member of a union when the investigation took place?",
        answerOptions: ['yes', 'no'],
        questionType: "mc",
    },
    unionRepresentation: {
        id: 16,
        question: "Were you offered union representation during your investigation interviews?",
        answerOptions: ['yes', 'no'],
        questionType: "mc",
        output: {
            condition: "no",
            status: "RedFlag",
            text: "RED FLAG Union Representation: Union members have a right to support by a union representative during the investigation process. If you were not offered that, or if someone prevented you from having it, there might be an issue with the investigation."
        }
    },
    unionRepresentationBlockedEmp: {
        id: 17,
        question: "Did your employer prevent you from receiving union representation?",
        answerOptions: ['yes', 'no'],
        questionType: "mc",
        output: {
            condition: "yes",
            status: "RedFlag",
            text: "RED FLAG Union Representation: Union members have a right to support by a union representative during the investigation process. If you were not offered that, or if someone prevented you from having it, there might be an issue with the investigation."
        }
    },
    unionRepresentationBlockedInv: {
        id: 18,
        question: "Did the investigator prevent you from receiving union representation?",
        answerOptions: ['yes', 'no'],
        questionType: "mc",
        output: {
            condition: "yes",
            status: "RedFlag",
            text: "RED FLAG Union Representation: Union members have a right to support by a union representative during the investigation process. If you were not offered that, or if someone prevented you from having it, there might be an issue with the investigation.",
        }
    },
    unionRespondent: {
        id: 19,
        question: "*NON-TRIVIAL LOGIC WILL REQUIRE SOME ENGINEERING* Was the respondent (or respondents if multiple) a member of the same union as you? (this question should be repeated for each respondent that the complainant identifies)",
        answerOptions:
            [
                "Yes",
                "No, the respondent is part of a different union",
                "No, the respondent is not part of a union"
            ],
        questionType: "mc",
    },
    unionSameRep: {
        id: 20,
        question: "Did the respondent have the same union member representing them?",
        answerOptions: ['yes', 'no'],
        questionType: "mc",
    },
    unionSameRepConsent: {
        id: 21,
        question: "Did you and the respondent consent to having the same union member represent you?",
        answerOptions: ['yes', 'no'],
        questionType: "mc",
        output: {
            condition: "no",
            status: "RedFlag",
            text: "RED FLAG Conflicting Representation: There may be a potential conflict if the same union member represents the complainant and respondent. If both parties consented to this, it may be less of an issue."
        }
    },
    unionLocation: {
        id: 22,
        question: "Where did the [issues] occur?",
        answerOptions:
            [
                "At the workplace only",
                "At the workplace and outside the workplace",
                "Outside the workplace only",
                "During union activities only",
                "During union activities and at the workplace",
                "During union activities and outside the workplace",
                "At the workplace, during union activities, and outside the workplace"
            ],
        questionType: "mc",
        output: {
            condition: "If ‘During union activities only’ is selected",
            status: "RedFlag",
            text: "RED FLAG EMPLOYER INTERFERENCE - If the harassment (or other issues) took place only during union business, then the employer might not have a right to investigate as this could constitute interference with union business."
        }
    },
    invOrganizer: {
        id: 23,
        question: "Who arranged for the investigation to be conducted?",
        answerOptions:
            [
                "Manager at your workplace/ organization",
                "Supervisor at your workplace/ organization",
                "A member of the human resources department at your workplace/ organization",
                "Another person or employee from your workplace/ organization designated by the employer ",
                "Someone at a related franchise or a corporate office related to your workplace/ organization",
                "Someone who is from a business association and is not related to your workplace/ organization ",
                "A human resource professional not related to your workplace/ organization ",
                "A lawyer not related to your workplace/ organization",
                "A licensed private investigator not related to your workplace/ organization",
                "Other person related to your workplace/ organization [fill-in]",
                "Other person not related to your workplace/ organization [fill-in]",
            ],
        questionType: "mc",
    },
    invOrganizerOtherInt: {
        id: 23.1,
        question: "Specify the investigation organizer related to your workplace/ organization",
        questionType: "text",
    },
    invOrganizerOtherExt: {
        id: 23.2,
        question: "Specify the investigation organizer not related to your workplace/ organization",
        questionType: "text",
    },
    invInt: {
        question: " this is the end of the demo"
    },
    demoEnd: {
        question: " this is the end"
    }
}

const HarassmentNext = {
    age: { default: "gender" },
    gender: { default: "race" },
    race: { default: "industry" },
    industry: { default: "position" },
    position: { default: "nature" },
    nature: { default: "numComplainants" },
    numComplainants: { 1: "outputMultipleComplainants", 2: "outputMultipleComplainants", default: "numRespondents" },
    numRespondents: { 1: "outputMultipleComplainants", 2: "outputMultipleComplainants", default: "numAllegations" },
    numAllegations: { 1: "outputMultipleComplaints", 2: "outputMultipleComplaints", default: "discussion" },
    discussion: { 0: "outputInvestigationConfidentiality", default: "inWorkplace" },
    inWorkplace: { 1: "outsideDismissed", default: "investigationProcess" },
    outsideDismissed: { 1: "outputOutsideDismissed", default: "investigationProcess" },
    investigationProcess: { 1: "outputInvestigationProcess", 2: "outputInvestigationProcess", default: "inUnion" },
    inUnion: { 0: "unionRepresentation", default: "invOrganizer" },
    inUnionInvestigation: { 0: "unionRepresentation", default: "invOrganizer" },
    unionRepresentation: { 1: "outputUnionRepresentation", default: "unionRepresentationBlockedEmp" },
    unionRepresentationBlockedEmp: { 0: "outputUnionRepresentationBlockedEmp", default: "unionRepresentationBlockedInv" },
    unionRepresentationBlockedInv: { 0: "outputUnionRepresentationBlockedInv", default: "unionRespondent" },
    unionRespondent: { 0: "unionSameRep", default: "unionLocation" },
    unionSameRep: { 0: "unionSameRepConsent", default: "unionLocation" },
    unionSameRepConsent: { 1: "outputUnionSameRepConsent", default: "unionLocation" },
    unionLocation: { 6: "outputUnionLocation", default: "invOrganizer" },
    invOrganizer: { 0: "invInt", 1: "invInt", 2: "invInt", 3: "invInt", 4: "invInt", 9: "invOrganizerOtherInt", 10: "invOrganizerOtherExt", default: "invExternal" },
    invOrganizerOtherInt: { default: "invInt" },
    invOrganizerOtherExt: { default: "demoEnd" },
}

export { HarassmentContent, HarassmentNext };