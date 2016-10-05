var mongoose = require("mongoose");
var assert = require("assert");

var url = "mongodb://localhost/noj"
mongoose.connect(url);

// 定义一个别名
var Schema = mongoose.Schema;

var adminSchema = new Schema({
    id: {
        type: Number,
        index: true,
        unique: true,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: Number,
        required: true
    },
    create_time: {
        type: Date,
        default: Date.now,
        required: true
    }
});

var contestSchema = new Schema({
    id: {
        type: Number,
        index: true,
        unique: true,
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    begin_time: {
        type: Date,
        required: true
    },
    end_time: {
        type: Date,
        required: true
    },
    status: {
        type: Number,
        required: true
    },
    questions: {
        type: Number,
        required: true
    },
    teacher: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    create_time: {
        type: Date,
        default: Date.now,
        required: true
    }
});

var newsSchema = new Schema({
    id: {
        type: Number,
        index: true,
        unique: true,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    create_time: {
        type: Date,
        default: Date.now,
        required: true
    },
    author: {
        type: String,
        required: true
    }
});

var processSchema = new Schema({
    id: {
        type: Number,
        index: true,
        unique: true,
        required: true
    },
    question: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: "Processing",
        required: true
    },
    submit_time: {
        type: Date,
        default: Date.now,
        required: true
    },
    student: {
        type: Number,
        index: true,
        required: true
    },
    contest: {
        type: Number,
        required: true
    },
    lang: {
        type: String,
        required: true
    }
});

var questionSchema = new Schema({
    id: {
        type: Number,
        index: true,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    time_limit: {
        type: Number,
        required: true
    },
    memory_limit: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    submit_total: {
        type: Number,
        required: true
    },
    correct_submit: {
        type: Number,
        required: true
    },
    input_descrip: {
        type: String,
        required: true
    },
    output_descrip: {
        type: String,
        required: true
    },
    input_sample: {
        type: String,
        required: true
    },
    output_sample: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    create_time: {
        type: Date,
        default: Date.now,
        required: true
    },
    contestorpractice: {
        type: String,
        required: true
    }
});

var studentSchema = new Schema({
    number: {
        type: Number,
        index: true,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true
    },
    create_time: {
        type: Date,
        default: Date.now,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    username: {
        type: String,
        index: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

var adminModel = mongoose.model("admin", adminSchema, "admin");
var contestModel = mongoose.model("contest", contestSchema, "contest");
var newsModel = mongoose.model("news", newsSchema, "news");
var processModel = mongoose.model("process", processSchema, "process");
var questionModel = mongoose.model("question", questionSchema, "question");
var studentModel = mongoose.model("student", studentSchema, "student");

exports.admin = adminModel;
exports.contest = contestModel;
exports.news = newsModel;
exports.process = processModel;
exports.question = questionModel;
exports.student = studentModel;
