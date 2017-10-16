var calculation = {
  sum: function (values) {
    return values.reduce(function (acc, val) {
      return acc + val;
    }, 0);
  },
  mean: function (values) {
    return this.sum(values) / values.length;
  },
};

function getStudents(callback) {
  var students = [
    { name: 'John', age: 21, scores: { 'Math': 90, 'Algorithm': 76, 'Data Structure': 60} },
    { name: 'Jane', age: 18, scores: { 'Math': 100, 'Algorithm': 89, 'Data Structure': 90} },
    { name: 'Mark', age: 23, scores: { 'Math': 100, 'Algorithm': 50, 'Data Structure': 78} },
  ];

  setTimeout(function () {
    callback(students);
  }, 1000);
}

function getScoreNumbers(scores) {
  return [
    scores['Math'],
    scores['Algorithm'],
    scores['Data Structure'],
  ];
}

function printStudentScores(scores) {
  var subjects = Object.keys(scores);

  for (var i = 0; i < subjects.length; i++) {
    var subject = subjects[i];

    console.log('%s: %s', subject, scores[subject]);
  }

  console.log('Nilai Rata-rata: %s', calculation.mean(getScoreNumbers(scores)));
}

function printStudentName(name) {
  console.log('Nama Siswa: %s', name);
}

function printStudentSummary(student) {
  console.group('student');
  printStudentName(student.name);
  printStudentScores(student.scores);
  console.groupEnd();
}

getStudents(function (students) {
  for (var i = 0; i < students.length; i++) {
    printStudentSummary(students[i]);
  }
});
