require("dotenv").config();

const connectDB = require("./config/db");
const Question = require("./models/Question");


const questions = [

    {
        question:
        "A train travels 120 km in 2 hours. What is its speed?",
        options:[
            "40 km/hr",
            "60 km/hr",
            "80 km/hr",
            "100 km/hr"
        ],
        answer:"60 km/hr",
        category:"Speed Distance",
        difficulty:"Easy",
        points:10
    },


    {
        question:
        "What is 25% of 200?",
        options:[
            "25",
            "50",
            "75",
            "100"
        ],
        answer:"50",
        category:"Percentage",
        difficulty:"Easy",
        points:10
    },


    {
        question:
        "If 5 workers complete a job in 10 days, how many days will 10 workers take?",
        options:[
            "2 days",
            "5 days",
            "10 days",
            "20 days"
        ],
        answer:"5 days",
        category:"Time and Work",
        difficulty:"Medium",
        points:20
    },


    {
        question:
        "A shopkeeper buys an item for ₹500 and sells it for ₹600. What is the profit percentage?",
        options:[
            "10%",
            "15%",
            "20%",
            "25%"
        ],
        answer:"20%",
        category:"Profit and Loss",
        difficulty:"Easy",
        points:10
    },


    {
        question:
        "What is the average of 10, 20 and 30?",
        options:[
            "15",
            "20",
            "25",
            "30"
        ],
        answer:"20",
        category:"Average",
        difficulty:"Easy",
        points:10
    },


    {
        question:
        "A car covers 300 km in 5 hours. What is its speed?",
        options:[
            "50 km/hr",
            "60 km/hr",
            "70 km/hr",
            "80 km/hr"
        ],
        answer:"60 km/hr",
        category:"Speed Distance",
        difficulty:"Easy",
        points:10
    },


    {
        question:
        "If the ratio of boys to girls is 3:2 and there are 30 boys, how many girls are there?",
        options:[
            "10",
            "15",
            "20",
            "25"
        ],
        answer:"20",
        category:"Ratio",
        difficulty:"Medium",
        points:20
    },


    {
        question:
        "Find the simple interest on ₹1000 at 10% per year for 2 years.",
        options:[
            "₹100",
            "₹150",
            "₹200",
            "₹250"
        ],
        answer:"₹200",
        category:"Simple Interest",
        difficulty:"Medium",
        points:20
    },


    {
        question:
        "What is the next number in the series: 2, 4, 8, 16, ?",
        options:[
            "20",
            "24",
            "32",
            "36"
        ],
        answer:"32",
        category:"Number Series",
        difficulty:"Easy",
        points:10
    },


    {
        question:
        "A person walks 5 km north and then 5 km south. How far is he from the starting point?",
        options:[
            "0 km",
            "5 km",
            "10 km",
            "15 km"
        ],
        answer:"0 km",
        category:"Logical Reasoning",
        difficulty:"Easy",
        points:10
    },

    {
        question:
        "A sum of money becomes ₹1200 from ₹1000 in 2 years at simple interest. What is the interest amount?",
        options:[
            "₹100",
            "₹150",
            "₹200",
            "₹250"
        ],
        answer:"₹200",
        category:"Simple Interest",
        difficulty:"Medium",
        points:20
    },

    {
        question:
        "A man completes a work in 15 days. How many days will 3 men take to complete the same work?",
        options:[
            "3 days",
            "5 days",
            "10 days",
            "15 days"
        ],
        answer:"5 days",
        category:"Time and Work",
        difficulty:"Medium",
        points:20
    },

    {
        question:
        "The average of 5 numbers is 20. What is their total sum?",
        options:[
            "50",
            "75",
            "100",
            "120"
        ],
        answer:"100",
        category:"Average",
        difficulty:"Medium",
        points:20
    },

    {
        question:
        "A shopkeeper gives 10% discount on an item marked ₹500. What is the selling price?",
        options:[
            "₹400",
            "₹450",
            "₹500",
            "₹550"
        ],
        answer:"₹450",
        category:"Profit and Loss",
        difficulty:"Medium",
        points:20
    },

    {
        question:
        "If 8 men can finish a job in 12 days, how many days will 6 men take?",
        options:[
            "12 days",
            "14 days",
            "16 days",
            "18 days"
        ],
        answer:"16 days",
        category:"Time and Work",
        difficulty:"Medium",
        points:20
    },

    {
        question:
        "A number is increased by 20% and then decreased by 20%. What is the overall change?",
        options:[
            "No change",
            "4% increase",
            "4% decrease",
            "8% decrease"
        ],
        answer:"4% decrease",
        category:"Percentage",
        difficulty:"Hard",
        points:30
    },

    {
        question:
        "A can complete a work in 20 days and B in 30 days. How many days will they take together?",
        options:[
            "10 days",
            "12 days",
            "15 days",
            "25 days"
        ],
        answer:"12 days",
        category:"Time and Work",
        difficulty:"Hard",
        points:30
    },

    {
        question:
        "Find the missing number: 3, 9, 27, 81, ?",
        options:[
            "162",
            "243",
            "324",
            "729"
        ],
        answer:"243",
        category:"Number Series",
        difficulty:"Hard",
        points:30
    },

    {
        question:
        "If the probability of an event is 0.25, what is the percentage chance?",
        options:[
            "10%",
            "20%",
            "25%",
            "50%"
        ],
        answer:"25%",
        category:"Probability",
        difficulty:"Hard",
        points:30
    },

    {
        question:
        "A person invests ₹5000 at 10% compound interest for 2 years. What type of interest is applied?",
        options:[
            "Simple Interest",
            "Compound Interest",
            "Profit",
            "Discount"
        ],
        answer:"Compound Interest",
        category:"Compound Interest",
        difficulty:"Hard",
        points:30
    }

];


const importQuestions = async()=>{

    try{

        await connectDB();

        await Question.deleteMany();

        await Question.insertMany(questions);

        console.log("Questions Added Successfully ✅");

        process.exit();

    }
    catch(error){

        console.log(error);
        process.exit(1);

    }

};


importQuestions();